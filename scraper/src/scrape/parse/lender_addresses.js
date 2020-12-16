const cheerio       = require('cheerio')

const addresses = {

    parse: function(body){
        const $ = cheerio.load(body)        
        let addresses = []  

        let addressA = this.getOneAddress($, 'Domicilio Fiscal')
        if(addressA){
            addresses.push(addressA)
        }
            

        let addressB = this.getOneAddress($, 'Domicilio Para')
        if(addressB){
            addresses.push(addressB)
        }                           
        return addresses
    },
    getOneAddress: function($, label){
        let tr_a = $('b').filter(function(){
            return $(this).text().startsWith(label)            
        }).parent().parent().parent().parent().parent().parent().parent().parent().siblings().eq(0).children().eq(0).find('tr')
        let tr_b = $('b').filter(function(){
            return $(this).text().startsWith(label)
        }).parent().parent().parent().parent().parent().parent().parent().parent().siblings().eq(0).children().eq(1).find('tr')
        let tr_c = $('b').filter(function(){
            return $(this).text().startsWith(label)
        }).parent().parent().parent().parent().parent().parent().parent().parent().siblings().eq(0).children().eq(2).find('tr')
        let address = {}

        address.street          = $(tr_a).children().eq(0).children().eq(2).val()
        address.street_number   = $(tr_a).children().eq(1).children().eq(2).val()
        address.suite           = $(tr_a).children().eq(2).children().eq(2).val()
        address.cross_street_a  = $(tr_a).children().eq(3).children().eq(2).val()
        address.cross_street_b  = $(tr_a).children().eq(4).children().eq(2).val()

        address.landmark        = $(tr_b).children().eq(0).children().eq(2).val()
        address.area_code       = $(tr_b).children().eq(2).children().eq(2).val()
        address.phone_number    = $(tr_b).children().eq(3).children().eq(2).val()

        address.zipcode         = $(tr_c).children().eq(0).children().eq(2).val()
        address.colonia         = $(tr_c).children().eq(1).children().eq(2).val()
        address.municipio       = $(tr_c).children().eq(2).children().eq(2).val()
        address.federal_entity  = $(tr_c).children().eq(3).children().eq(2).val()
        if (address.federal_entity === undefined && address.municipio === undefined  && address.zipcode === undefined  && address.colonia === undefined){
            return false
        }

        return address        
    },
}

module.exports = addresses