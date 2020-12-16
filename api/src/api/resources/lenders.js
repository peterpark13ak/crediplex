const express   = require('express')
const router    = express.Router()
const lender    = require('./lenderMethods')
const es_client         = require('../../data/elastic/client')
const index = 'lenders'
const type = 'lender'



router.get('/:lender_id', async (req,res)=>{
    let id = req.params.lender_id    
    let details = await lender.getLenderDetails(id)
    // details.addresses = await lender.getLenderAddresses(id)
    details.products = await lender.getLenderProducts(id)
    
    return res.json(details)

})

router.get('/:lender_id/morelike', (req,res)=>{    
    lender.getMoreLike(req.params.lender_id)
    .then(function(results){
        return res.json(results)
    })
    .catch(function(err){
        res.send(err)
    })
})

router.get('/:lender_id/addresses', (req,res)=>{    
    lender.getLenderAddresses(req.params.lender_id)
    .then(function(results){
        return res.json(results)    
    })
    .catch(function(err){
        res.send(err)
    })
})

router.get('/:lender_id/products', (req,res)=>{    
    lender.getLenderProducts(req.params.lender_id)
    .then(function(results){
        return res.json(results)    
    })
    .catch(function(err){
        res.send(err)
    })
})


router.get('/area/:area_id', function(req, res){
    return lender.getByAreaId(req.params.area_id)
    .then(function(results){
        return res.json(results)    
    })
    .catch(function(err){
        res.send(err)
    })     
})

module.exports = router