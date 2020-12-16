const cheerio       = require('cheerio')

const FIELD_DEFS = {
    COMPLETED: {
        NAME_FIELD: 0,
        TRADE_ASSOCIATION_FIELD: 1,
        MAIN_ACTIVITY_FIELD: 2,
        PRODUCT_FILE_FIELD: 3
    },
    NOT_COMPLETED: {
        NAME_FIELD: 0,
        TRADE_ASSOCIATION_FIELD: undefined,
        MAIN_ACTIVITY_FIELD: undefined,
        PRODUCT_FILE_FIELD: 1
    }

}

const lender_list =  {
   
    parse: function(body, type){        
        let self = this
        const $ = cheerio.load(body)        
        let table =[]
        $('#table tr').each(function(i, tr){
            var item = self._getItem($, this, type)
            if(item.external_id){
                table.push(item)
            }
        })
        return table
    },
    _getItem : function($, row, type){        
        let item = {}, self = this    
        let fields = FIELD_DEFS[type]
        $(row).children().each(function(field,td){
            // Set fields that may be missing
            if (fields['TRADE_ASSOCIATION_FIELD'] == undefined){
                item.trade_association = ''
            }            
            if (fields['MAIN_ACTIVITY_FIELD'] == undefined){
                item.main_activity = ''
            }            

            // For Fields that are found, Set the value
            if(field == fields['NAME_FIELD']){
                item.name                   = self._getName($, td)
                item.external_id            = self._getExternalId(self._getUrl($, td)) 
                item.id                     = parseInt(item.external_id)
                item.lender_details_url     = self._getUrl($, td)
            }
            if (field == fields['TRADE_ASSOCIATION_FIELD']){
                item.trade_association = $(this).text()
            }
            if(field == fields['MAIN_ACTIVITY_FIELD'] ){
                item.main_activity = $(this).text()
            }
            if(field == fields['PRODUCT_FILE_FIELD'] ){
                item.lender_product_link = $(this).find('a').attr('href')
            }            
        })
        item.address_link = `https://webapps.condusef.gob.mx/SIPRES/jsp/domicilios_pub.jsp?idins=${item.external_id}`
        return item
    },    
    _getName: function($, td){
        let self = this
        return $(td).find('a').text()
                    
    },     

    _getUrl: function($, td){
        var onclick = $(td).find('a').attr('onclick')
        if(onclick){
            var expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
            var url_matches =  onclick.match(expression)
           return url_matches[0]            
        }
        return ''        
    },
    _getExternalId: function(url){
        if(url){
            var id_matches = url.match(/idins=(\d+)$/)            
            // console.log(id_matches)
            return id_matches[1]
        }
        return ''
            
    },
}

module.exports = lender_list