const express           = require('express')
const bodyParser        = require('body-parser')
const lenders           = require('./resources/lenders')
const products          = require('./resources/products')
const coverage_areas    = require('./resources/coverage_areas')
const contact           = require('./resources/contact')
const es                = require('elasticsearch')
const es_client         = require('../data/elastic/client')
const cors              = require('cors')
var app = express()
app.set('json spaces', 4);
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

var whitelist = [
    'http://localhost:3000',
    'https://ladr.io',
    'https://www.ladr.io',
    'https://d2ynjvlznysxra.cloudfront.net',
    'http://website',
    'http://www.crediplex.io',
    'https://crediplex.io'
    
];
var corsOptions = {
    origin: function(origin, callback){
        var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
        callback(null, originIsWhitelisted);
    },
    credentials: true
};
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
// app.use(cors(corsOptions));

app.use('/lenders',lenders)
app.use('/products',products)
// app.use('/coverage-areas',coverage_areas)
app.post('/contact-us', contact)

app.get('/coverage_areas', function(req,res){
    return es_client.search({
        index:'coverage_areas',
        body:{ 
            "size":1000,      
            "query" : {
                "match_all" : {}
            }            
        }
    })
    .then(function(result){    
        let response = {}
        
        response.total = result.hits.total
        cas = []
        result.hits.hits.forEach(function(ca){
            cas.push({
                name:ca._source.name,
                _id: ca._id
            })
        })
        response.coverage_areas= cas 
        return res.json(response)    
    })
    .catch(function(err){
        res.send(err)
    })
    
})


module.exports = app

