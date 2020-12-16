const parse         = require('./parse/parse')
const rq            = require('./crawl/rq')
const validate      = require('./parse/validate')

const sectors = {
    'SOFOM_ENR':69,
    'SOFOM_ER':68,
    'BANCOS':40,    
}
const periods = {
    'CURRENT':20,
    'LAST_YEAR':19
}
const Buro ={
    getSectorEntityUrl:  function(sector_name, period_name){
        let sector_id = sectors[sector_name]
        let period = periods[period_name]
        return {COMPLETED:`https://www.buro.gob.mx/tbl_general_comportamiento.php?id_sector=${sector_id}&id_periodo=${period}`, NOT_COMPLETED:`https://www.buro.gob.mx/tbl_general_sofomConInformacion.php?id_sector=${sector_id}&id_periodo=${period}`}
    },
    getSectorTableContents: async function(url){        
        table_html = rq.getCached(url,{encoding:'latin1'})
        return table_html
    },
    getLendersFromSectorTable: function(contents, type){
        return parse.lender_list(contents, type)
    },
    getLenderDetails: async function(lender_details_url){    
        let lender_content = await rq.getCached(lender_details_url, {encoding:'UTF-8'})
        return parse.lender_details(lender_content)
    },  
    getLenderAddresses: async function(address_url){
        let address_content = await rq.getCached(address_url,{encoding:'UTF-8'})
        try{
            return parse.addresses(address_content)
        }
        catch(e){
            console.log('####### buro.getLenderAddresses Error ###########')
            console.log('URL: ' + address_url)
            console.log('CONTENT:' )
            console.log(address_content)
            console.log(e) 
            console.log('##################')
        }

    },
    getProductDetails: async function(url){
        let content                 = await rq.getCached(url, {encoding: 'latin1'})
        let product                 = parse.product(content)

        try{
            const result = validate.product(product)
            if(result.error !== null){
                // throw result.error
            }
        }
        catch(err){
        }
        return product
    }, 
    getProductLinks: async function (link, category, count, encoding = 'UTF-8'){
        if(link === undefined){   
            return []
        }  
        let content = await rq.getCached(link, {encoding: encoding})
        if(content === undefined) return []
        let product_content_type = await parse.get_content_type(content)   

        if(product_content_type == 'aviso'){
            let aviso = parse.aviso(content) 
            return []
        }                
        else if(product_content_type == 'redirect'){
            let redirect_link =  parse.get_redirect_link(content)
            return this.getProductLinks(redirect_link, category, count)                
        }
        else if(product_content_type == '302_redirect'){
            let redirect_link =  parse.get_302_redirect_link(content)
            return this.getProductLinks(redirect_link, category, count)                
        }
        else if(product_content_type == 'product_category'){
            let categories = parse.categories(content)
            let promises = []
            for(cat of categories){
                let promise = this.getProductLinks(cat.products_link, cat, count)
                promises.push(promise)
            }
            return Promise.all(promises)            
        }
        else if(product_content_type == 'product_list'){
            delete category.fields
            delete category.form_action
            let data = {
                links: parse.product_list(content),
                category:category
            }
            return data
        }
        else if(product_content_type == 'product_details'){                      
            throw new Error(" Should not get to product details ")
        }
        console.log(`Product Content Type not handled ${product_content_type}`)
        return []  // no links found
    },
}
module.exports = Buro