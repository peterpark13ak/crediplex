const es_client         = require('../../data/elastic/client')
const index = 'lenders'
const type = 'lenders'

let lender = {
 
    getLenderAddresses: function(id){
        return es_client.search({
            index:'addresses',
            type:'address',
            body:{ 
                size:1000, 
                query: {
                    match_phrase : {
                        lender_id :  id
                    }
                }
            }
        })
        .then(function(response){
            
            let results = []
            response.hits.hits.forEach(function(metaData){
                let address = metaData._source
                
                address._id = metaData._id
                if(address.street){                
                    results.push(address)
                }
            })
            s
            return results
            
            
        })
    },
    getLenderProducts: function(id){
        return es_client.search({
            index:'products',
            type:'products',
            body:{ 
                size:1000, 
                query: {
                    match_phrase : {
                        lender_id : id
                    }
                }
            }
        })
        .then(function(response){
            let results = []
            response.hits.hits.forEach(function(metaData){
                let product = metaData._source            
                product._id = metaData._id
                results.push(product)
            })
            return results
            
        })
    },
    getLenderDetails: function(id){
        return es_client.get({
            index:index,
            type:type,
            id: id
            })
        .then(function(result){
            return result._source
        })
        .catch(function(err){
            console.log(err)
            if(err.status === 404){
                return {}
            }
            else {
                throw err
            }
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
                        {match_phrase:{"addresses.federal_entity": id}}
                     ]
                    }
                }
            }
        }).then(function(result){
            let lenders = []
            result.hits.hits.map(item=>{
                lenders.push(item._source)
            })
            return lenders
        })  
    },
    getMoreLike(lender_id){
        return this.getLenderDetails(lender_id)
        .then(function(lender){
            let shouldCriteria = []
            shouldCriteria.push({match_phrase:{"addresses.federal_entity": lender.addresses[0].federal_entity}})
            if(lender.main_activity){
                shouldCriteria.push({match_phrase:{"main_activity": lender.main_activity}})
            }
            if(lender.trade_association){
                shouldCriteria.push({match_phrase:{"trade_association": lender.trade_association}})                
            }
            return es_client.search({
                index:index,
                type: index,
                "size":3, 
                body:{
                    query:{
                        bool:{
                         should: shouldCriteria,
                         must_not: {
                            "term":{"_id":lender_id}
                         }
                        } 
                    }
                }
            })})
        .then(function(result){
            let lenders = []
            result.hits.hits.map(item=>{
                lenders.push(item._source)
            })
            return lenders
        })
        .catch(function(err){
            console.log(err)
            console.log('There has been an error')
            return {message:err.message}
        })
    }
}

module.exports = lender
