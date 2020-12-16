const rq = require('../crawl/rq')
const details = require('../parse/product_details')
const encoding = require('encoding')

module.exports = {
    crawl:function(pl){
        let promises = []

        pl.forEach(function(prod){
            let updated_prod = rq.get(prod.details_url,{encoding:'latin1'})
                .then(function(body){                   
                   return details.scrape(body)
                })
                .then(function(product){
                    product.external_id = prod.id
                    return product
                })
            promises.push(updated_prod)
        })
        return Promise.all(promises)                           
    } 
}

