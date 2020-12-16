

const cheerio       = require('cheerio')

module.exports =  {
    isTargetContent: function(body){

        const $ = cheerio.load(body)
        let subproduct = $('p').filter( function(i, element){
            return $(this).text().startsWith('Subproducto')
        }) 
        let commercial_name = $('p').filter( function(i, element){
            return $(this).text().startsWith('Nombre Comercial')
        })
        
        return $('#table').html() != null && $(subproduct).html() != null && $(commercial_name).html() != null 
    },

    scrape: function(body){
        const $ = cheerio.load(body)   
        var products = []
        $('#table tbody tr').each(function(i, tr){
            var product = {}
            $(this).find('td').each(function(i,td){
                // console.log($(this).html())
                if(i==0){
                    product.sub_product_name = $(this).find('p').text()
                    product.sub_product_id   = $(this).find('input').val()
                }
                if(i==1){
                    product.name = $(this).find('a p').text()
                    product.id   = $(this).find('input').val()
                    product.details_url = "https://ifit.condusef.gob.mx/ifit/" + $(this).find('a').attr('href')
                }
            })
            products.push(product)            
        })
        return products
    },
}