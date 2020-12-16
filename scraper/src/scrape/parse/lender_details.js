const cheerio       = require('cheerio')

const lender_details = {
    parse: function(body){
        const $ = cheerio.load(body)        
        let lender_details = this._getLenderBasicInfo($)
        return lender_details
    },
    isNoDataMessage:function(body){
        const $ = cheerio.load(body)
        let alert_script = $('script').filter( function(i, element){
            return $(this).html().includes('alert("La instituci')
        })

        return alert_script.html() != null
    },
    _getLenderBasicInfo: function($){
        let basic_info = {}
        basic_info.short_name = $('#nomcorto').val()
        basic_info.status = $('#status').val()
        basic_info.rfc = $('#rfc').val()
        basic_info.shcp_key = $('#cveshcp').val()
        basic_info.sector = $('#sector').val()
        basic_info.supervisor = $('#autsup').val()
        basic_info.entity = $('#tenti').val()
        basic_info.launch_date = $('#finiop').val()
        basic_info.website = $('#url').val()
        basic_info.email = $('#mail').val()
        basic_info.sic_data = $('.boxsics').text()
        basic_info.generales_modificados = $('.textoculto').text()
        basic_info.sipres_start_date = $('#insfreg').val()
        basic_info.sipres_end_date = $('#insfact').val()
        
        return basic_info
    },
}

module.exports = lender_details