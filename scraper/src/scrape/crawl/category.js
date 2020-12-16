const rp                 = require('request-promise')
const parse_product_list    = require('../parse/product_list')
const product_list          = require('./product_list')

module.exports = {
    crawl:function(category){
        return rp.get(category.products_link, {encoding:'utf8'})
            
            .then(function(body){
                let pl = parse_product_list.scrape(body)
                return product_list.crawl(pl)
            })
        
    } 
}

