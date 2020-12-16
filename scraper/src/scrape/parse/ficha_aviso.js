
const cheerio       = require('cheerio')
    
const ficha_aviso =  {
    
    scrape: function (body){
        const $ = cheerio.load(body)  
        result = {}
        let url_path = $('script').eq(1).html().match(/ft_general_final.php\?idnc=\d*[^\"]*/)[0]
        result.product_id = $('script').eq(1).html().match(/ft_general_final.php\?idnc=(\d*)/)[1]
        
        result.product_link = 'https://ifit.condusef.gob.mx/ifit/'+url_path

        return result

    },
    
    isTargetContent: function(body){
        try{
            const $ = cheerio.load(body)  
            let aviso_el = $('b').filter( function(i, element){
                return $(this).text().startsWith('Aviso Importante')
            })
            return $(aviso_el).html() != null    
        }
        catch(err){
            console.log(err)
            return false
        }
    }
}

module.exports = ficha_aviso