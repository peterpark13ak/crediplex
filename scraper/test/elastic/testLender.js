const chai        = require('chai')
const lenderService       = require('../../src/data/elastic/lender')
const fs            = require('fs')
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

var expect = chai.expect;

describe('#ElasticLenders',function(){
    var lenders
    beforeEach(function(){
        let str = fs.readFileSync('./test/output/lender_products.json', "utf8")
        lenders = JSON.parse(str)        
    })
    
    describe('#saveAll', function(){
        it('should save all Lenders from an array of Lenders', function(){
            return lenderService.saveAll(lenders)
            .then(function(result){
                console.log('##########################################')
                console.log('##########################################')
                console.log('##########################################')
                console.log('##########################################')
                console.log('##########################################')
                console.log('##########################################')
                console.log('##########################################')
                console.log('##########################################')
                console.log('##########################################')
                console.log(result)
                return Promise.all(promises)
            })
        })
    })    
    
})