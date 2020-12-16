

module.exports = {
    getAddresses: function(lender_object){

        var result = []
        for ( addr of lender_object.addresses){
            //skip empty objects
            if(Object.keys(addr).length === 0 && addr.constructor === Object){
                continue
            }
            result.push(addr)
        }
        return result
    },
    getLenderDetails:function(lender){
        let clone = this.clone(lender)
        delete clone.addresses
        delete clone.categories
        return clone
    },
    getCategories: function (lender){
        var results = []
        for (cat of lender.categories){
            let mycat = {
                id:cat.id,
                name:cat.name
            }
            results.push(mycat)
        }
        return results
    },
    getSubCategories:function(lender){
        var results = []
        for (cat of lender.categories){
            for (prod of cat.products){
                let sub_cat = {
                    name: prod.sub_product_name,
                    id: prod.sub_product_id,
                    cagetory_id:cat.id
                }
                if(!results.some(sub=>sub.id==sub_cat.id)){
                    results.push(sub_cat)
                }
            }
        }
        return results
    },
    getProducts: function(lender){
        var results = [],  product
        for(cat of lender.categories){
            for (item of cat.products){
                product = item.product
                results.push({
                    lender_id: lender.external_id,
                    category_id: cat.id,
                    subcategory_id: item.sub_product_id,
                    id: item.id,
                    name: item.name,
                    updated_at: item.product.updated_at,
                    lender: item.lender,         
                    status: product.description.status,
                    category: product.description.category,           
                    subcategory: product.description.subproduct,           
                    contrato_adhesion: product.description.contrato_adhesion,           
                    RECA: product.description.RECA,           
                    contrato_multiple: product.description.contrato_multiple,           
                    contrato_adhesion: product.description.contrato_adhesion,           
                    contrato_adhesion: product.description.contrato_adhesion,   
                    details:product.details,
                    requirements: product.requirements,
                    commissions:product.commissions,
                    contract_costs: product.contract_costs,
                    free_services: product.free_services,
                    scope_or_benefits: product.scope_or_benefits,
                    restrictions: product.restrictions
                })

            }
        }
        return results
    },
    clone:function(lender){
        return JSON.parse(JSON.stringify(lender))
    }


}