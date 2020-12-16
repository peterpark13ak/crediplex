const fs            = require('fs')
const {promisify} = require('util');
const readFileAsync = promisify(fs.readFile);
const lender  = require('./lender')
const rq            = require('./rq')
const parse = require('../parse/parse')
const crawl ={
    request: function(params){
        if (params.method == 'STATIC' && params.file_path){
            return readFileAsync(params.file_path, "utf8")
        }
    },
    category: function(url){
        return rq.get(url, {encoding:'latin1'})
    },
    product: function(url){
        return rq.getCached(url,{encoding:'latin1'})
    },
    get: async function(url, count){
        count = count || 0
        if (count > 5 ) return 'aborted redirect loop'
        var content = await rq.getCached(url, {encoding:'latin1'})
        if (parse.is_redirect(content)){
            url = parse.get_redirect_link(content)            
            content = await this.get(url, count++)
        }
        return content
    },
    addresses: async function(lender_external_id){
        return rq.post(  {
            uri : 'https://webapps.condusef.gob.mx/SIPRES/jsp/domicilios_pub.jsp',
            qs: {idins: lender_external_id },
            headers:{
                'Content-Type':'application/x-www-form-urlencoded'
            }
        })   
    },
}
module.exports = crawl