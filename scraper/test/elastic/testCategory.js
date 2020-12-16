const chai        = require('chai')
const cat       = require('../../src/data/elastic/categories')
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

var expect = chai.expect;

describe('#ElasticCategory',function(){
    var category_data
    beforeEach(function(){
        category_data = {
            id:12321321,
            "name":'Credito Simple',
        }
    })
    describe('#save', function(){
        it('Should save a a category ', function(){
            return cat.save(category_data)
            .then(function(result){
                return cat.get(category_data.id)
            })
            .then(function(data){
                expect(data._source).to.deep.equal(category_data)
                return true
            })
            .then(function(){
                // cleanup
                return cat.delete(category_data.id)
            })
            
        })
        it('should throw an  validation error if category is empty object', function(){            
            return expect(cat.save({})).to.be.rejected                        
        })
        it('should throw an  validation error if category is missing id', function(){            
            return expect(cat.save({hello:'world'})).to.be.rejected                        
        })
        it('should throw an  validation error if category null', function(){            
            return expect(cat.save(null)).to.be.rejected                        
        })    
    })
    describe('#saveAll', function(){
        it('should save all categories from an array of categories', function(){
            let cat_array = []
            let cat_a = {name:'Credito Simple',id:18}
            let cat_b = {name:'Tarjeta de Credito', id:22}
            cat_array.push(cat_a)
            cat_array.push(cat_b)
            return cat.saveAll(cat_array)
            .then(function(result){
                let promises = []
                expect(result.length).to.equal(2)
                expect(result[0].result).to.equal('created')
                expect(result[1].result).to.equal('created')

                promises.push(cat.get(cat_a.id))
                promises.push(cat.get(cat_b.id))
                return Promise.all(promises)
            })
            .then(function(saved_cats){
                // console.log(saved_cas)
                expect(saved_cats[0]._source).to.deep.equal(cat_a)
                expect(saved_cats[1]._source).to.deep.equal(cat_b)

                // clean up
                let promises = []
                promises.push(cat.delete(cat_a.id))
                promises.push(cat.delete(cat_b.id))
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
            return cat.get('this-is-a-fake-id').then(function(result){
                expect(result).to.be.null
            })
            
        })
        it('Should return address when the address exists', function(){
            return cat.save(category_data)
            .then(function(result){
                return cat.get(category_data.id)
            })
            .then(function(result){
                expect(result._source).to.deep.equal(category_data)
            })
            .then(function(){
                // cleanup
                cat.delete(category_data.id)
            })
        })
     
    })
})