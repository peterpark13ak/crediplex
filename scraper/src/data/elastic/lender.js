var crypto = require('crypto');
const _ = require('lodash')
const addresses = require('./addresses')
const coverage_areas = require('./coverage_areas')
const categories = require('./categories')
const subcategories = require('./subcategories')
const products = require('./products')
const pay_periods = require('./pay_periods')
const dispersal_methods = require('./dispersal_methods')
const payment_plan_types = require('./payment_plan_types')
const interest_types = require('./interest_types')
const credit_uses = require('./credit_uses')
const applicant_types = require('./applicant_types')
const id_docs = require('./id_docs')
const proof_of_address_docs = require('./proof_of_address_docs')
const proof_of_income_docs = require('./proof_of_income_docs')


const es_client = require('./client')
const index_name = 'lenders'
const type = index_name

module.exports = {
    validate: function(lender){
        // console.log(lender)
        if (lender == undefined || lender == null) {
            throw new Error('Cannot save null or undefined lender')
            return
        }
        if (Object.keys(lender).length == 0 ) {
            throw new Error('Cannot save empty lender object')
            return
        }
        if (lender.external_id == undefined || lender.external_id == null) {
            throw new Error('Cannot save lender without external id')
            return
        }
    },
    save: async function(lender){
        var results = []
        this.validate(lender)       
        
        results.push(await addresses.saveAll(this.getAddresses(lender)))
        results.push(await coverage_areas.saveAll(this.getCoverageAreas(lender)))
        results.push(await categories.saveAll(this.getCategories(lender)))
        results.push(await subcategories.saveAll(this.getSubCategories(lender)))
        results.push(await products.saveAll(this.getProducts(lender)))
        results.push(await pay_periods.saveAll(this.getPayPeriods(lender)))
        results.push(await dispersal_methods.saveAll(this.getDispersalMethods(lender)))
        results.push(await payment_plan_types.saveAll(this.getPaymentPlanTypes(lender)))        
        results.push(await interest_types.saveAll(this.getInterestTypes(lender)))
        results.push(await credit_uses.saveAll(this.getCreditUses(lender)))        
        results.push(await applicant_types.saveAll(this.getApplicantTypes(lender)))
        results.push(await id_docs.saveAll(this.getIdDocs(lender)))        
        results.push(await proof_of_address_docs.saveAll(this.getProofOfAddressDocs(lender)))
        results.push(await proof_of_income_docs.saveAll(this.getProofOfIncomeDocs(lender)))
        
        let lender_data = Object.assign({},lender)
        lender_data.id = lender.external_id
        delete lender_data.products

        // console.log(lender_data)
        let put_command = {
            index: index_name,
            type: type,
            id: lender_data.external_id,
            body: lender_data
        }   
        results.push(await es_client.index(put_command))

        return results
    },
    saveAll: async function(lender_array){
        var self = this, response, responses =[]
        var count = 1;
        for (lender_data of lender_array){
            console.log(count)
            results = await self.save(lender_data)
            responses.push(results)
            // console.log(results)
            count++
        }
        return responses  
    },
    getCategories: function(lender){
        var results = []
        // for (cat of lender.categories){
        //     results.push({
        //         id: cat.id,
        //         name: cat.name
        //     })
        // }
        return results
    },
    getSubCategories:function(lender){
        var results = []
        for (product of lender.products){
                results.push({
                    id: product.sub_product_id,
                    name: product.sub_product_name
                })
        }
        return _.uniq(results)
    },
    getProducts: function(lender){
        var results =[]
        for (product of lender.products){
                product.id = product.id
                product.name = product.name
                product.category_id = cat.id
                product.subcategory_id = product.sub_product_id
                product.details_url = product.details_url
                product.lender.short_name = lender.short_name
                product.lender.display_name = lender.short_name
                if(product.details && product.details.term){
                    var from = this.getInDays(product.details.term.from, product.details.term.units) 
                    var to = this.getInDays(product.details.term.to, product.details.term.units) 
                    // console.log(from, to)
                    product.details.term.from_days =  from                     
                    product.details.term.to_days = to
                }                
                results.push(product)
        }
        return results
    },
    getInDays: function(value, units){
        if(units == 'Días'){
            return value
        }
        else if(units == 'Semanas'){
            return value * 7
        }
        else if(units == 'Meses'){
            return value * 30
        }
        else if (units == 'Años'){
            return value * 365
        }
        return 0
    },
    getPayPeriods: function(lender){
        var results =[]
        for (product of lender.products){
                // console.log(product.details.pay_period)
                if( !(product.details.pay_period instanceof Array)){
                    product.details.pay_period = []
                }
                for(period of product.details.pay_period){
                    results.push({name:period})
                }
            }
        return _.uniq(results)
    },
    getDispersalMethods: function(lender){
        var results =[]
            for (product of lender.products){
                if(!(product.details.dispersal_method instanceof Array)){
                    product.details.dispersal_method  = []
                }
                for(method of product.details.dispersal_method){
                    results.push({name:method})
                }
            }
        return _.uniq(results)
    },
    getCoverageAreas: function(lender){
        var results =[]
        for (product of lender.products){
                // productt.coverage_areas = product.coverage_areas || []
                // console.log(product.details)
                if (product.details.coverage_area === undefined || !(product.details.coverage_area instanceof Array )){
                    // console.log( 'cov area is not an array')
                    product.details.coverage_area = []
                }
                    
                // console.log(product.details.coverage_area)
                for(ca of product.details.coverage_area){
                    results.push({name:ca})
                }
        }
        return _.uniq(results)
    },

    getPaymentPlanTypes: function(lender){
        var results =[]
            for (product of lender.products){
                product.details.payment_plan_type  =  product.details.payment_plan_type  || []
                for(pt of product.details.payment_plan_type){
                    results.push({name:pt})
                }
            }
        return _.uniq(results)
    },

    getInterestTypes: function(lender){
        var results =[]
            for (product of lender.products){
                product.details.interest_type = product.details.interest_type || []
                for(it of product.details.interest_type){
                    results.push({name:it})
                }
            }
        return _.uniq(results)
    },
    getCreditUses: function(lender){
        var results =[]
            for (product of lender.products){
                product.details.credit_use = product.details.credit_use || []
                for(cu of product.details.credit_use){
                    results.push({name:cu})
                }
            }
        return _.uniq(results)
    },
    getApplicantTypes: function(lender){
        var results =[]
            for (product of lender.products){
                product.requirements.applicant.type = product.requirements.applicant.type || []
                for(app_type of product.requirements.applicant.type){
                    results.push({name:app_type})
                }
            }
        return _.uniq(results)
    },
    getIdDocs: function(lender){
        var results =[]
            for (product of lender.products){
                product.requirements.documents.id =  product.requirements.documents.id || []
                for(doc of product.requirements.documents.id){
                    results.push({name:doc})
                }
            }
        return _.uniq(results)
    },
    getProofOfAddressDocs: function(lender){
        var results =[]
            for (product of lender.products){
                // console.log(product.requirements.documents)
                product.requirements.documents.proof_of_address = product.requirements.documents.proof_of_address || []
                for(doc of product.requirements.documents.proof_of_address){
                    results.push({name:doc})
                }
            }
        return _.uniq(results)
    },
    getProofOfIncomeDocs: function(lender){
        var results =[]
        for (product of lender.products){
            product.requirements.documents.proof_of_income = product.requirements.documents.proof_of_income || []
            for(doc of product.requirements.documents.proof_of_income){
                results.push({name:doc})
            }
        }
        return _.uniq(results)
    },

    getAddresses: function(lender){
        var results = []
        // console.log(lender.addresses)
        lender.addresses = lender.addresses || []
        for(address of lender.addresses){
            if(!Object.keys(lender).length === 0){
                address.lender_id = lender.external_id
                results.push(address)
            }
        }
        return results
    },

    saveDetails:async function(lender){
        this.validate(lender)

        let put_command = {
            index:'lenders',
            type:'lender',
            id: lender.external_id,
            body: lender
        }          
        var result = await es_client.index(put_command);      
        return result
    },
    get: async function(id){
        let get_command = {
            index:'lenders',
            type:'lender',
            id:id
        }
        
        try{
            let result = await es_client.get(get_command)

            return result
        }
        catch(err){
            if(err.status == 404)            
                return null
            throw err
        }
        
    },
    delete: async function(id){
        let delete_command = {
            index:'lenders',
            type:'lender',
            id:id
        }
        try{
            let result = await es_client.delete(delete_command)

            return result
        }
        catch(err){
            if(err.status == 404)            
                return false
            throw err
        }
        
    }

}

