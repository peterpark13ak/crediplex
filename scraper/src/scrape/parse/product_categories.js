const cheerio       = require('cheerio')
const product_list  = require('./product_list')
const product_categories =  {
    isTargetContent: function(body){
        const $ = cheerio.load(body)    
        let has_select =  $('form').find('select[id="producto"]').length > 0
        return has_select &&  !product_list.isTargetContent(body)
    },  
    
    isRedirect: function(body){
        const $ = cheerio.load(body)
        let script = $('script').filter(function(){
            return $(this).html().includes('location.href = "ftb_vista_institucion.php?')
        })
        return script.html() != null
    },
    getRedirectLink: function(body){
        const $ = cheerio.load(body)
        let scr = $('script').filter(function(){
            return $(this).html().includes('location.href = "ftb_vista_institucion.php?')
        })
        return "https://ifit.condusef.gob.mx/ifit/" + $(scr).html().trim().replace('location.href = "',"").replace('";',"")
    },
    scrape: function(body){
        const $ = cheerio.load(body) 
        // console.log('SCRAPING PRODUCT CATEGORIES PAGE')
        // console.log(body)
        let self = this, product_fields = []
        let categories = []        
        $('form').find('select').children().each(function(i,element){
            // console.log('FOUND SELECT ELEMENT')
            let category = {}
            category.id = $(element).attr('value')          
            category.name = $(element).text()
            category.form_action = "https://ifit.condusef.gob.mx/ifit/ftb_vista_institucion.php?idp="+category.id            
    
            let data_field = {}     
            data_field.id = 'producto'
            data_field.name = 'producto'
            data_field.value = $(element).attr('value')
            
            category['fields'] = [data_field]
            // console.log(category)
            if(category.id == 0)
                return
            categories.push(category)            
        })
        
        $('form').find('input').each(function(i, input){
            if($(input).attr('type') == 'hidden'){
                let data_field = {}
                data_field.id = $(input).attr('id')
                data_field.value = $(input).val()
                data_field.name = $(input).attr('name')
                categories.forEach(function(category, i){                    
                    category['fields'].push(data_field)
                })
            }
        })
        
        categories.map(function(category){
            category.products_link = category.form_action + "&" + self._getProductCategoryDetailParams(category['fields'])    
        })
        return categories
    },
    _getProductCategoryDetailParams: function(fields){
        // return array of name value pairs 
        fields = fields.map(function(field){
            return `${field['name']}=${field['value']}`
        })
        return fields.join("&")
    },
}

module.exports = product_categories