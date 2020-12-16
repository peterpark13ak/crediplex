const express           = require('express')
const router            = express.Router()
const pm                = require('./productMethods')
const lenders          = require('./lenderMethods')

const cors              = require('cors')

router.all('*', cors());
router.get('/', (req,res)=>{
    return pm.getAll(req,res)  
    .then(function(results){
        return res.json(results)    
    })
    .catch(function(err){
        res.send(err)
    }) 

})

router.get('/sum/coverage_areas', function(req,res){
   return pm.sumCoverageAreas(req,res)
   .then(function(results){
        return res.json(results)    
    })
    .catch(function(err){
        res.send(err)
    })     
})

router.get('/:product_id',async (req,res)=>{
    try{

        let product     = await pm.getById(req.params.product_id)
        let lender_id   = parseInt(product.lender_id)
        let lender      = await lenders.getLenderDetails(lender_id)             

        let products    = lenders.getLenderProducts(lender_id)

        product.lender.detail = await lender
        // product.lender.addresses = lender.addresses
        product.lender.products = await products
   
        return res.json(product)
   
    }
    catch(err){
        console.log(err)
        res.send(err)
    }
})

router.get('/area/:area_id', function(req, res){
    return pm.getByAreaId(req.params.area_id)
    .then(function(results){
        return res.json(results)    
    })
    .catch(function(err){
        res.send(err)
    })     
})

router.get('/more-like/:product_id', function(req, res){
    return pm.getMoreLike(req.params.product_id)
    .then(function(results){
        return res.json(results)
    })
})

router.get('/category/:category_id', function(req, res){
    return pm.getByCategoryId(req.params.category_id)
    .then(function(results){
        return res.json(results)    
    })
    .catch(function(err){
        console.log("ERROR FOUND")
        return res.send(err)
    })     
})

module.exports = router