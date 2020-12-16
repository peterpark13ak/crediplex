const cheerio       = require('cheerio')
const Entities      = require('html-entities').XmlEntities;

const entities = new Entities();

const product_details = {   
    isTargetContent : function(body){
        let self = this
        let result = self.scrape(body)
        return result.updated_at != undefined && result.lender  != {}  
        && result.description.status != undefined 
        && result.details.term != ''
    },
    is302Redirect : function(body){
        const $ = cheerio.load(body)
        let script = $('script').filter(function(){
            return $(this).html().includes('window.location =\'http')
        })
        return script.html() != null        
    },
    get302RedirectLink: function(body){
        const $ = cheerio.load(body)
        let scr = $('script').filter(function(){
            return $(this).html().includes('window.location =\'http://ifit')
        })
        let link = $(scr).html().trim()
        link = link.replace('window.location =\'http:','https:').replace("\';","")
        return  link
    },
    calculateCommissionFee: function(product, loan) {
        var totalcost = loan
        product.commissions && product.commissions.map((cursor)=>{
          if (cursor.cost) {
            if (cursor.cost.fixed_amount !== '') {
              totalcost += parseInt(cursor.cost.fixed_amount)
            }
            else if (cursor.cost.factor_amount !== '') {
              totalcost += loan * parseFloat(cursor.cost.factor_amount) / 100
            }
          }
          return null;
        })
        product.contract_costs && product.contract_costs.map((cursor)=>{
          if (cursor.cost) {
            if (cursor.cost.fixed_amount !== '') {
              totalcost += parseInt(cursor.cost.fixed_amount)
            }
            else if (cursor.cost.factor_amount !== '') {
              totalcost += loan * parseFloat(cursor.cost.factor_amount) / 100
            }        
          }
          return null;
        })
        return totalcost
    },
    calculateCAT: function(product, principal, months) {
        const number_of_payment = months
        const interest_rate = product.details.max_annual_interest / 1200
        const CAT = number_of_payment * interest_rate * principal / (1 - Math.pow(1 + interest_rate, -number_of_payment))
        return CAT
    },
    scrape: function(body){
        body = entities.decode(body)
        const $ = cheerio.load(body)   
        var product = {}
        let principal = 2000
        let months = 12

        product.updated_at = this._getUpdatedAt($)
        product.lender = this._getLenderData($)
        product.description = this._getDescription($)
        product.details = this._getDetails($)
        product.requirements = this._getRequirements($)
        product.commissions = this._getCommissions($)
        product.contract_costs = this._getContractCosts($)
        product.free_services = this._getFreeServices($)
        product.scope_or_benefits = this._getListInTable($,'Alcance o')
        product.restrictions = this._getListInTable($,'Restricciones o')
        
        product.annual_interest = {
            loan: principal,
            terms_in_months: months,
            pay_period: 'monthly',
            fees: calculateCommissionFee(product, principal),
            interest_cost: calculateCAT(product, principal, months) - principal
        }

        return product
    },
    _getUpdatedAt:function($){
        var updated_text = $('b').filter(function(){
            return $(this).text().startsWith('Fecha de Actualizaci')
        }).parent().text()
       return this._extractValue(updated_text)
    },
    _getLenderData:function($){
        var self = this
        var lender = {}
        var data_table = $('table tr').filter(function(i, element){
            return $(this).find('legend').text() == 'Datos de la Entidad Financiera'
        }).find('table')
        $(data_table).find('tr').each(function(i,el){
            if (i == 0){
                lender.logo = $(this).find('td').find('img').attr('src')
                lender.name = $(this).children().eq(1).text().replace("Nombre: ","").trim()
            }
            if(i == 1){
                lender.address = $(this).text().replace('Domicilio del Corporativo:', "").trim()
            }
            if(i = 2){
                lender.sector   = self._extractValue($(this).children().eq(0).text())
                lender.website  = self._extractValue($(this).children().eq(1).text())
                lender.phone    = self._extractValue($(this).children().eq(2).text())
            }
        })
        return lender
    },

    _extractValue: function(str){
        var str_ar = str.split(":")
        if(str_ar.length > 1)
            return str_ar[1].trim()
    },
    _getDescription: function($){
        var self = this;
        var product = {}
        var data_table = $('table tr').filter(function(i, element){
            return $(this).find('legend').text().startsWith('Descripci')
        }).find('table').find('tbody')

        product.status              = self._extractValue($(data_table).children().eq(0).children().eq(0).text())
        product.category            = self._extractValue($(data_table).children().eq(0).children().eq(1).text())
        product.subproduct          = self._extractValue($(data_table).children().eq(0).children().eq(2).text())
        product.name                = self._extractValue($(data_table).children().eq(0).children().eq(3).text())
        product.contrato_adhesion   = $(data_table).children().eq(1).children().eq(0).children().eq(0).attr('src') =='imagenes/chksel.png'
        product.RECA                = self._extractValue($(data_table).children().eq(1).children().eq(1).text()) || 'error-missing'
        product.contrato_multiple   = $(data_table).children().eq(1).children().eq(2).children().eq(0).attr('src') =='imagenes/chksel.png'

        return product
    },
    _getDetails: function($){
        var self = this;
        var field_name, temp_val;
        // set defaults
        var details = {
            min_amount:0,            
        }
        var data_table = $('table tr').filter(function(i, element){
            return $(this).find('legend').text().startsWith('Caracter')
            }).find('table').find('tbody')
        // Note that children().each() returns entries from other tables as well not only characteristicas table but ones that follow.
        // Therefore if specific field is not found, the function returns and does not set any value.
        $(data_table).children().each(function(i, item){   
            let values
            
            switch ($(item).children().eq(0).text().trim() ){
                case 'Plazo:':
                    field_name = 'term'
                    temp_val = $(item).children().eq(1).text().trim()
                    // Parse out values from term
                    template = /De\s*(\d*)\s*Hasta\s*(\d*)\s*(.*)/
                    var matches = temp_val.match(template)
                    if(!matches){
                        console.warn (`Could not parse field '${field_name}' with value '${temp_val}'` )
                    }
                    let from = self.parseInt(matches[1]) 
                    let to = self.parseInt(matches[2])
                    let units = matches[3].trim()
                    
                    details[field_name] = { 
                        from: from ,
                        to: to,
                        units: units,
                        from_days: self.convertToDays(from, units),
                        to_days : self.convertToDays(to, units)
                    }
                    break;
            
                case 'Monto mínimo del crédito ($):':
                    field_name = 'min_amount'
                    details[field_name] = self.parseInt($(item).children().eq(1).text().replace("$","").replace(/,/gi,'').trim())
                    break;
                
                case 'Periodicidad de pago del crédito:':
                    field_name = 'pay_period'
                    values = $(item).children().eq(1).text().trim()
                    values = values.split(",")
                    details[field_name] = self._removeEmptyItems(values)

                    break;
                    
                case 'Medios y canales de disposición del crédito:':
                    field_name = 'dispersal_method'
                    values = $(item).children().eq(1).text().trim()
                    values = values.split(",")
                    details[field_name] = self._removeEmptyItems(values)
                    break;
                
                case 'Tasa de interés máxima anual (%):':
                    field_name = 'max_annual_interest'
                    details[field_name] = self.parseFloat($(item).children().eq(1).text().replace("%","").trim())
                    break;
                    
                case 'Cobertura:':
                    field_name = 'coverage_area'
                    values = $(item).children().eq(1).text().trim()
                    values = values.split(",")
                    details[field_name] = self._removeEmptyItems(values)
                    break;
                
                case 'Comportamiento del pago del crédito:':
                    field_name = 'payment_plan_type'
                    values = $(item).children().eq(1).text().trim()
                    values = values.split(",")
                    details[field_name] = self._removeEmptyItems(values)
                    break;
                
                case 'Tipo tasa de interés:':
                    field_name = 'interest_type'
                    values = $(item).children().eq(1).text().trim()
                    values = values.split(",")
                    details[field_name] = self._removeEmptyItems(values)
                    break;
                
                case 'Destino del crédito:':
                    field_name = 'credit_use'
                    values = $(item).children().eq(1).text().trim()
                    values = values.split(",")
                    details[field_name] = self._removeEmptyItems(values)
                    break;
            
                case 'Pago mínimo (%):':
                    field_name = 'min_payment'
                    details[field_name] = self.parseInt($(item).children().eq(1).text().replace("%","").trim())
                    break;
        
                default:
                    return; 
                    break;                    
            }
            if(!details.hasOwnProperty(field_name)){
                details[field_name] = $(item).children().eq(1).text().trim()
            }
            
    })

        return details
    },
    _getRequirements: function($){
        var self = this;
        var field_name, category
            // set defaults
            var reqs = {
                applicant:{
                    min_monthly_income:0 
                }, 
                documents:{}
            }
        var data_table = $('table tr td').filter(function(i, element){
            return $(this).find('legend').text().startsWith('Requisit')
        }).find('table tbody')
        // Note that children().each() returns entries from other tables as well not only characteristicas table but ones that follow.
        // Therefore if specific field is not found, the function returns and does not set any value.
        $(data_table).children().each(function(i, item){   
            let values
            switch ($(item).children().eq(0).text().trim() ){
                case 'Edad:':
                    field_name = 'age'
                    category = 'applicant'
                    temp_val = $(item).children().eq(1).text().trim()
                    // Parse out values from term
                    template = /(?:De)?\s*(\d*)?\s*(\d*)?\s*Hasta\s*(\d*)\s*años\s*(\d*)/
                    var matches = temp_val.match(template)
                    if(matches){
                        reqs[category][field_name] = { 
                            from_year: self.parseInt(matches[1]),
                            from_month: self.parseInt(matches[2]),
                            to_year: self.parseInt(matches[3].trim()),
                            to_month: self.parseInt(matches[4].trim())
                        }                    
                    }
                    else{
                        console.warn (`Could not parse field '${field_name}' with value '${temp_val}'` )
                    }
                    break;
                case 'Tipo de persona:':
                    field_name = 'type'
                    category = 'applicant'
                    values = $(item).children().eq(1).text().trim()
                    values = values.split(',')                    
                    reqs[category][field_name] = self._removeEmptyItems(values) 
                    break;
                case 'Antigüedad laboral:':
                    field_name = 'time_in_job'
                    category = 'applicant'
                    temp_val =  $(item).children().eq(1).text().trim()
                    template = /(\d*)?\s*(Años|Meses)\s*/
                    var matches = temp_val.match(template)
                    if(matches){
                        reqs[category][field_name] = {                             
                            value: self.parseInt(matches[1]),
                            units: matches[2],
                        }                    
                    }
                    break;
                case 'Ingreso mínimo mensual ($):':
                    field_name = 'min_monthly_income'
                    reqs[category][field_name] = parseInt($(item).children().eq(1).text().replace("$","").replace(/,/gi,'').trim()) || 0
                    category = 'applicant'
                    break;
                case 'Identificación Oficial Vigente:':
                    field_name = 'id'
                    category = 'documents'
                    values = $(item).children().eq(1).text().trim()
                    values = values.split(",")
                    reqs[category][field_name] = self._removeEmptyItems(values)                    
                    break;
                case 'Comprobante de Domicilio:':
                    field_name = 'proof_of_address'
                    values = $(item).children().eq(1).text().trim()
                    values = values.split(",")
                    reqs[category][field_name] = self._removeEmptyItems(values)                    
                    category = 'documents'
                    break;
                case 'Comprobante de Ingresos:':
                    field_name = 'proof_of_income'
                    category = 'documents'
                    values = $(item).children().eq(1).text().trim()
                    values = values.split(",")
                    reqs[category][field_name] = self._removeEmptyItems(values)                    
                    break;
                case 'Solicitud de crédito:':                    
                    reqs['applicant']['credit_check'] =    $(item).eq(1).children().eq(0).attr('checked') === undefined                 
                default:
                    return; 
            }
            if(category != undefined && !reqs.hasOwnProperty(category)  || !reqs[category].hasOwnProperty(field_name)){
                reqs[category][field_name] = $(item).children().eq(1).text().trim()
            }
        })
        
       return reqs
    },
    _getCommissions: function($){
        var self = this;
        var commissions = []
        var data_table = $('table tr td').filter(function(i, element){
            return $(this).find('legend').text().startsWith('Comisiones')
        }).find('table tbody')
        
        $(data_table).children().each(function(i, tr){
            if(i >1){                
                var commission = self._getCommissionsDetails($, this)                
                commissions.push(commission)   

            }
        })
        return commissions
    }, 
    _getFreeServices: function($){
        var self = this;
        var commissions = []
        var data_table = $('table tr td').filter(function(i, element){
            return $(this).find('legend').text().startsWith('Servicios Complementarios')
        }).find('table tbody')
        
        $(data_table).children().each(function(i, tr){
            if(i >1){                
                var commission = self._getCommissionsDetails($, this)                
                commissions.push(commission)   

            }
        })
        return commissions
    }, 
    _getContractCosts:function($){
        var self = this;
        var commissions = []
        var data_table = $('table tr td').filter(function(i, element){
            return $(this).find('legend').text().startsWith('Costos de Contrataci')
        }).find('table tbody')
        
        $(data_table).children().each(function(i, tr){
            if(i >2){                
                var commission = self._getCommissionsDetails($, this)                
                commissions.push(commission)   

            }
        })
        return commissions
    },
    _getCommissionsDetails: function($, tr){
        var commission = {}

        commission.concept = $(tr).children().eq(0).text()
        commission.is_free = $(tr).children().eq(1).find('img').attr('src') == 'imagenes/si.png'
        commission.free_ops = {
            number: $(tr).children().eq(2).text(),
            period: $(tr).children().eq(3).text(),
        }
        commission.cost = {
            currency:           $(tr).children().eq(4).text(),
            fixed_amount:       $(tr).children().eq(5).text(),
            factor:             $(tr).children().eq(7).text(),
            factor_amount:      $(tr).children().eq(8).text(),
            factor_reference:   $(tr).children().eq(9).text(),
            period:             $(tr).children().eq(10).text(),
        }

        commission.cond = $(tr).children().eq(6).text()
        return commission
    },
    _getListInTable: function($,legendStr){
        var self = this;
        var benefits = []
        var data_table = $('table tr td').filter(function(i, element){
            return $(this).find('legend').text().startsWith(legendStr)
        }).find('table')
        
        $(data_table).find('li').each(function(i,li){
            benefits.push($(li).text().trim())
        })
        
        return benefits
    },
    _removeEmptyItems: function(arr){
        let newArray = []
        arr.forEach(function(element){
            if (element.trim()){
                newArray.push(element.trim())
            }
        })
        return newArray
    },
    parseInt: function(x){
        let ix = parseInt(x)
        if (!Number.isInteger(ix) ){
            return 0
        }
        return ix
    },
    parseFloat: function(x){
        let ix = parseFloat(x)
        if (Number.isNaN(ix) ){
            return 0
        }
        return ix
    },
    getId: function(url){
        let urlParts = url.split('?')

        if (urlParts.length < 2){
            return null
        }        

        let params = urlParts[1].split('&')
        for(param of params){
            param = param.split('=')
            if(param.length == 2 && param[0] == 'idnc'){
                return parseInt(param[1])
            }
        }
        return null
    },
    convertToDays: function(value, units){
        if(units == 'Años')
            return value * 365
        else if(units == 'Meses')
            return value * 30
        else if(units == 'Semanas')
            return value * 7
        return value
    }

}

module.exports = product_details
