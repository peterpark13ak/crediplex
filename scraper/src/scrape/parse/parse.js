const lender_details = require('./lender_details')
const lender_list = require('./lender_list')
const aviso = require('./ficha_aviso')
const category = require('./product_categories')
const details = require('./product_details')
const product_list = require('./product_list')
const addresses = require('./lender_addresses')
const lender_list_container = require('./lender_list_container')
const parse = {
    get_url_from_iframe(body){
        return lender_list_container.parse(body)
    },
    lender_list: function(body, type){
        return lender_list.parse(body,type)
    },
    lender_details: function(body){
        let details = lender_details.parse(body)
         
        return details
    },
    aviso: function(body){
        return aviso.scrape(body)
    },
    product_list:function(body){
        return product_list.scrape(body)
    },
    categories:function(body){
        return category.scrape(body)
    },
    product:function(body){
        return details.scrape(body)
    },
    product_id:function(url){
        return details.getId(url)
    },
    
    get_content_type:function(body){
        if (category.isRedirect(body)){
            return 'redirect'
        }
        if (aviso.isTargetContent(body)){
            return "aviso"
        }
        if (category.isTargetContent(body)){            
            return 'product_category'
        }
        if(product_list.isTargetContent(body)){
            return 'product_list'
        }
        if(details.is302Redirect(body)){
            return '302_redirect'
        }
        if(details.isTargetContent(body)){
            return 'product_details'
        }
        if(lender_details.isNoDataMessage(body)){
            return "no_lender_data"
        }
        return 'unknown'
    },
    isNoDataMessage: function(body){

    },
    is_redirect:function(body){
        return 'redirect' == this.get_content_type(body)
    },
    get_302_redirect_link: function(body){
        return  details.get302RedirectLink(body)
    },
    get_redirect_link: function(body){
        return category.getRedirectLink(body)
    },
    addresses: function(body){
        return addresses.parse(body)
    },

}

module.exports = parse