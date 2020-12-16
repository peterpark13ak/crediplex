const es_client         = require('../../data/elastic/client')
const index = 'products'
const type = index

const product = {
    getAll: function (req,res){
        
        let desired_loan_amount = req.query.desired_loan_amount || 0
        // let max_interest = req.query.max_interest | 0
        let monthly_income = req.query.monthly_income | 0
        let coverage_area = req.query.coverage_area
        let term_length_in_months = req.query.term_length
        return es_client.search({
            index:index,
            body:{ 
                "size":1000,      
                "query" : {
                    "dis_max":{
                        "tie_breaker" : 0.7,
                        "boost" : 1.2,                    
                        "queries":[{
                                "bool":{
                                        "must":[                                        
                                            {
                                            
                                                "range":{
                                                    "details.min_amount":{
                                                        "lte":desired_loan_amount
                                                    },
                                                    
                                                }
                                            },
                                            {
                                                "range":{
                                                    "requirements.applicant.min_monthly_income":{
                                                        "lte":monthly_income
                                                    }
                                                }
                                            },                                                          
                                        ],
                                        "filter":[
                                            {"bool":{
                                                "should":[
                                                    {
                                                        "match_phrase":{
                                                            "details.coverage_area":{
                                                                "query":coverage_area,
                                                                "analyzer":"standard"
                                                            }
                                                        }
                                                    },
                                                    {
                                                        "match_phrase":{
                                                            "details.coverage_area":{
                                                                "query":"Todos los Estados",
                                                                "analyzer":"standard"
                                                            }
                                                        }
                                                    }
                                                ]
                                            }},
                                            {"bool":{
                                                "must":[
                                                    {
                                                        "range":{
                                                            "details.term.from":{
                                                                "lte":term_length_in_months
                                                            }
                                                        }
                                                    },                     
                                                    {
                                                        "range":{
                                                            "details.term.to":{
                                                                "gte":term_length_in_months
                                                            }
                                                        }
                                                    },                     
            
                                                ]
                                            }}
                                            
                                            
                                        ]
                                    },
                            },
                                            
                        ],
                    }

                }
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
            return products
        })
    },
    sumCoverageAreas: function(req, res){
        return es_client.search({
            index:index,
            body:{
                "aggs":{
                    "area_count":{
                        "value_count":{
                            "field":"description.category"
                        }
                        
                    }
                }
            }
        })
        .then(function(result){
            return result
        })            
    },
    getById: function(id){
        return es_client.get({
            index:index,
            type:index,
            id:id
            })
        .then(function(result){
            return result._source
        })
    },
    getByAreaId: function(id){
        return es_client.search({
            index:index,
            "size":1000, 
            body:{
                query:{
                    bool:{
                     must:[
                        {match_phrase:{"details.coverage_area": id}},
                        {bool:{
                            should:[
                                {match_phrase:{"description.category": "Crédito personal"}},
                                {match_phrase:{"description.category": "Crédito simple"}}
                             ],
                        } }
                     ]
                    }
                }
            }
        }).then(function(result){
            let products = []
            result.hits.hits.map(item=>{
                products.push(item._source)
            })
            return products
        })
    },
    getByCategoryId: function(id){
        return es_client.search({
            index:index,
            "size":1000, 
            body:{
                query:{
                    bool:{
                     must:[
                        {match_phrase:{"category_id": id }}
                     ]   
                    }
                }
            }
        }).then(function(result){

            let products = []
            result.hits.hits.map(item=>{
                products.push(item._source)
            })
            return products
        })
    },
    getMoreLike(product_id){
        console.log('SEARCHIN')        
        return this.getById(product_id)
        .then(function(product){
            let area = ""
            if (product.details.coverage_area && product.details.coverage_area.length > 0 ){
                 area = product.details.coverage_area[0]
            }
            console.log(area)
            return es_client.search({
                index:index,
                type: index,
                "size":3, 
                body:{
                    query:{
                        bool:{
                         must:[
                            
                            {match_phrase:{"details.coverage_area": area}},
                            {match_phrase:{"category_id": product.category_id}},
                            {match_phrase:{"sub_product_id": product.sub_product_id}},
                            {match_phrase:{"details.credit_use": product.details.credit_use[0]}}

                            ],
                        } 
                    }
                }
            })})
        .then(function(result){
            let products = []
            result.hits.hits.map(item=>{
                products.push(item._source)
            })
            return products
        })
        .catch(function(err){
            console.log(err)
            console.log('There has been an error')
            return {message:err.message}
        })
    }
}

module.exports = product