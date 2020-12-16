const chai        = require('chai')
const subcat     = require('../../src/data/elastic/subcategories')
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

var expect = chai.expect;

describe('#ElasticSubcategories',function(){
    var subcat_data
    beforeEach(function(){
        subcat_data = {
            "name":'Directo',
            id:2
        }
    })
    describe('#save', function(){
        var addr_id = 123
        it('Should save a a coverage area ', function(){
           return subcat.save( subcat_data)
            .then(function(result){
                return subcat.get(subcat_data.id)
            })
            .then(function(data){
                expect(data._source).to.deep.equal(subcat_data)
                return true
            })
            .then(function(){
                // cleanup
                return subcat.delete(addr_id)
            })
            
            
        })
        it('should throw an  validation error if subcategory is empty object', function(){            
            return expect(subcat.save({})).to.be.rejected                        
        })
        it('should throw an  validation error if subcategory is missing id', function(){            
            return expect(subcat.save({hello:'world'})).to.be.rejected                        
        })
        it('should throw an  validation error if subcategory null', function(){            
            return expect(subcat.save(null)).to.be.rejected                        
        })
    })
    describe('#saveAll', function(){
        it('should save all subcategories from an array of subcategories', function(){
            let cat_array = []
            let cat_a = {name:'Nomina',id:11}
            let cat_b = {name:'Director',id:22}
            cat_array.push(cat_a)
            cat_array.push(cat_b)
            return subcat.saveAll(cat_array)
            .then(function(result){
                let promises = []
                expect(result.length).to.equal(2)
                expect(result[0].result).to.equal('created')
                expect(result[1].result).to.equal('created')

                promises.push(subcat.get(cat_a.id))
                promises.push(subcat.get(cat_b.id))

                return Promise.all(promises)
            })
            .then(function(saved_cats){
                // console.log(saved_cas)
                expect(saved_cats[0]._source).to.deep.equal(cat_a)
                expect(saved_cats[1]._source).to.deep.equal(cat_b)

                // clean up
                let promises = []
                promises.push(subcat.delete(cat_a.id))
                promises.push(subcat.delete(cat_b.id))
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
            return subcat.get('this-is-a-fake-id').then(function(result){
                expect(result).to.be.null
            })
            
        })
        it('Should return address when the address exists', function(){
            return subcat.save(subcat_data)
            .then(function(result){
                
                return subcat.get(subcat_data.id)
            })
            .then(function(result){
                expect(result._source).to.deep.equal(subcat_data)
            })
            .then(function(){
                // cleanup
                subcat.delete(subcat_data.id)
            })
        })
     
    })
})