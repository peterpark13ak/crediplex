const chai        = require('chai')
const product       = require('../../src/data/elastic/products')
const lenderService       = require('../../src/data/elastic/lender')
const fs            = require('fs')
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

var expect = chai.expect;

describe('#ElasticProducts',function(){
    var products
    var productA
    var count_products
    beforeEach(function(){
        let str = fs.readFileSync('./test/output/lender_products.json', "utf8")
        let lenders = JSON.parse(str)
        lender = lenders[0]
        products = lenderService.getProducts(lender)
        // console.log(products)
        productA = products[0]
        count_products = products.length
    })
    describe('#save', function(){
        it('Should save a Product ', function(){
            return product.save(productA)
            .then(function(result){
                return product.get(productA.id)
            })
            .then(function(data){
                expect(data._source).to.deep.equal(productA)
                return true
            })
            .then(function(){
                // cleanup
                return product.delete(productA.id)
            })
            
        })
        it('should throw an  validation error if Product is empty object', function(){            
            return expect(product.save({})).to.be.rejected                        
        })
        it('should throw an  validation error if Product is missing id', function(){            
            return expect(product.save({hello:'world'})).to.be.rejected                        
        })
        it('should throw an  validation error if Product null', function(){            
            return expect(product.save(null)).to.be.rejected                        
        })    
    })
    describe('#saveAll', function(){
        it('should save all Products from an array of Products', function(){
            return product.saveAll(products)
            .then(function(result){
                let promises = []
                expect(result.length).to.equal(count_products)
                expect(result[0].result).to.equal('created')
                expect(result[1].result).to.equal('created')

                promises.push(product.get(products[0].id))
                promises.push(product.get(products[1].id))
                return Promise.all(promises)
            })
            .then(function(saved_products){
                // console.log(saved_cas)
                expect(saved_products[0]._source).to.deep.equal(products[0])
                expect(saved_products[1]._source).to.deep.equal(products[1])

                // clean up
                let promises = []
                promises.push(product.delete(products[0].id))
                promises.push(product.delete(products[1].id))
                return Promise.all(promises)
            })
            .then(function(results){
                expect(results[0].result).to.equal('deleted')
                expect(results[1].result).to.equal('deleted')
            })
            
        })
    })    
    describe('#GET',  function(){       
        it('should return empty if nothing exits',function() {
            return product.get('this-is-a-fake-id').then(function(result){
                expect(result).to.be.null
            })
            
        })
        it('Should return product when the address exists', function(){
            return product.save(productA)
            .then(function(result){
                return product.get(productA.id)
            })
            .then(function(result){
                expect(result._source).to.deep.equal(productA)
            })
            .then(function(){
                // cleanup
                product.delete(productA.id)
            })
        })
     
    })
})