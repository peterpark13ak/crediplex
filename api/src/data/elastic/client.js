const elasticsearch = require('elasticsearch')

let host = 'https://vpc-mexloans-i7extfu5wtds5atl4mv6v2fk2q.us-east-1.es.amazonaws.com'
if(process.env['environment'] && process.env['environment'] =='development' ){
     host = 'elasticsearch:9200'
}
console.log(host)
const es_client = new elasticsearch.Client({
    host: host
})


module.exports = es_client