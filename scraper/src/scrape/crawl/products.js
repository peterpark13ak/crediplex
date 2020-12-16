const rq                    = require('./rq')
const qs                    = require('query-string');
const parse_ficha_aviso     = require('../parse/ficha_aviso')
const parse_categories      = require('../parse/product_categories')
const parse_details         = require('../parse/product_details')
const cats                  = require('./categories')


module.exports = {
    crawl:function(lender){
        let self = this
        return rq.get(lender.lender_product_link)
        .then(function(body){
                    let type = {
                    isAviso         : parse_ficha_aviso.isTargetContent(body),
                    isCategory      : parse_categories.isTargetContent(body),
                    isRedirect      : parse_categories.isRedirect(body),
                    isDetails       : parse_details.isTargetContent(body),
                    is302Redirect   : parse_details.is302Redirect(body)

                }
                let object = {}
                if(type.isAviso){
                    let aviso = parse_ficha_aviso.scrape(body)
                    lender.lender_product_link = aviso.product_link
                    return self.crawl(lender)
                }
                else if(type.isCategory){
                    let promises = []
                    if(parse_categories.isRedirect(body)){
                        lender.lender_product_link = parse_categories.getRedirectLink(body)
                        return self.crawl(lender)
                    }                        
                    let categories = parse_categories.scrape(body)
                    
                    return cats.crawl(categories)                    
                        .then(function(results){                            
                            return results
                        })
                                        
                }
                else if(type.isDetails){
                    let product = parse_details.scrape(body)
                    return product
                } 

                return null
            })
            .then(function(result){
                return result
            })
           
        
    } 
}

