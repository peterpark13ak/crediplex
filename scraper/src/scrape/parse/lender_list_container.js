const cheerio       = require('cheerio')

const lender_list_container =  {
   
    parse: function(body){
        let self = this
        const $ = cheerio.load(body)
        return $('#idIframe').attr('src')
    },
}

module.exports = lender_list_container