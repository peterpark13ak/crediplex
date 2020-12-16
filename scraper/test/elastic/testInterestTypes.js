const chai        = require('chai')
const interest_type_service     = require('../../src/data/elastic/interest_types')
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

var expect = chai.expect;

describe('#ElasticInterestType',function(){
    var interest_type_data
    beforeEach(function(){
        interest_type_data = {
            "name":'Quincenal',
        }
    })
    describe('#createID', function(){
        it('should create same id with same Interest Type and same id value',function() {
            var id = interest_type_service.createId({key:'value', key2:'value2'})
            var id2 = interest_type_service.createId({key:'value', key2:'value2'})
            expect(id).to.equal(id2)
        })
        it('should create different id if Interest Type data differs',function() {
            var id = interest_type_service.createId({key:'valueA', key2:'valueB'})
            var id2 = interest_type_service.createId( {key:'value', key2:'value2'})
            expect(id).to.not.equal(id2)
        })
    })
    describe('#save', function(){
        it('Should save a a Interest Type ', function(){
           return interest_type_service.save( interest_type_data)
            .then(function(result){
                return interest_type_service.get(interest_type_service.createId(interest_type_data))
            })
            .then(function(data){
                expect(data._source).to.deep.equal(interest_type_data)
                return true
            })
            .then(function(){
                // cleanup
                return interest_type_service.delete(interest_type_service.createId(interest_type_data))
            })
            
            
        })
        it('should throw an  validation error if Interest Type is empty object', function(){            
            return expect(interest_type_service.save({})).to.be.rejected                        
        })
        it('should throw an  validation error if Interest type is missing id', function(){            
            return expect(interest_type_service.save({hello:'world'})).to.be.rejected                        
        })
        it('should throw an  validation error if Interest type null', function(){            
            return expect(interest_type_service.save(null)).to.be.rejected                        
        })
    })
    describe('#saveAll', function(){
        it('should save all Interest types from an array of Interest types', function(){
            let interest_type_service_array = []
            let interest_type_service_a = {name:'fixed'}
            let interest_type_service_b = {name:'variable'}
            let interest_type_service_c = {name:'other'}
            interest_type_service_array.push(interest_type_service_a)
            interest_type_service_array.push(interest_type_service_b)
            interest_type_service_array.push(interest_type_service_c)
            return interest_type_service.saveAll(interest_type_service_array)
            .then(function(result){
                let promises = []
                expect(result.length).to.equal(3)
                expect(result[0].result).to.equal('created')
                expect(result[1].result).to.equal('created')
                expect(result[2].result).to.equal('created')

                promises.push(interest_type_service.get(interest_type_service.createId(interest_type_service_a)))
                promises.push(interest_type_service.get(interest_type_service.createId(interest_type_service_b)))
                promises.push(interest_type_service.get(interest_type_service.createId(interest_type_service_c)))
                return Promise.all(promises)
            })
            .then(function(saved_interest_type){
                // console.log(saved_cas)
                expect(saved_interest_type[0]._source).to.deep.equal(interest_type_service_a)
                expect(saved_interest_type[1]._source).to.deep.equal(interest_type_service_b)
                expect(saved_interest_type[2]._source).to.deep.equal(interest_type_service_c)

                // clean up
                let promises = []
                promises.push(interest_type_service.delete(interest_type_service.createId(interest_type_service_a)))
                promises.push(interest_type_service.delete(interest_type_service.createId(interest_type_service_b)))
                promises.push(interest_type_service.delete(interest_type_service.createId(interest_type_service_c)))
                return Promise.all(promises)
            })
            
        })
    })
    describe('#GET',  function(){       
        it('should return empty if nothing exits',function() {
            return interest_type_service.get('this-is-a-fake-id').then(function(result){
                expect(result).to.be.null
            })
            
        })
        it('Should return Interest Type when the Interest Type exists', function(){
            return interest_type_service.save(interest_type_data)
            .then(function(result){
                let id = interest_type_service.createId(interest_type_data)
                return interest_type_service.get(id)
            })
            .then(function(result){
                expect(result._source).to.deep.equal(interest_type_data)
            })
            .then(function(){
                // cleanup
                interest_type_service.delete(interest_type_service.createId(interest_type_data))
            })
        })
     
    })
})