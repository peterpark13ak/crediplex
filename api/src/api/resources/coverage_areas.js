const express   = require('express')
// const models   = require('../data/models/index')
const router    = express.Router()
const es_client         = require('../../data/elastic/client')
const index = 'coverage_areas'
const type = index
router.get('/', (req,res)=>{

    let desired_loan_amount = req.query.desired_loan_amount || 0
    // let max_interest = req.query.max_interest | 0
    let monthly_income = req.query.monthly_income | 0
    let coverage_area = req.query.coverage_area
    let term_length_in_months = req.query.term_length

    return es_client.search({
        index:index,
        body:{ 
            "size":1000,      
            "query": {
                    "match_all": {}
            },
            "sort":[{"name":{"order":"asc"}}]
         }
    })
    .then(function(result){
        let response = {}
        response.total = result.hits.total

        products = []
        result.hits.hits.forEach(function(item){
            item._source.id = item._id
            products.push(item._source)
        })
        response.products= products 
        return res.json(response)    
    })
    .catch(function(err){
        res.send(err)
    })   
})

module.exports = router