const chai        = require('chai')
const dispersal_method_service     = require('../../src/data/elastic/dispersal_methods')
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

var expect = chai.expect;

describe('#ElasticPayPeriods',function(){
    var dispersal_method_data
    beforeEach(function(){
        dispersal_method_data = {
            "name":'Quincenal',
        }
    })
    describe('#createID', function(){
        it('should create same id with same pay period and same id value',function() {
            var id = dispersal_method_service.createId({key:'value', key2:'value2'})
            var id2 = dispersal_method_service.createId({key:'value', key2:'value2'})
            expect(id).to.equal(id2)
        })
        it('should create different id if pay period data differs',function() {
            var id = dispersal_method_service.createId({key:'valueA', key2:'valueB'})
            var id2 = dispersal_method_service.createId( {key:'value', key2:'value2'})
            expect(id).to.not.equal(id2)
        })
    })
    describe('#save', function(){
        it('Should save a a pay period ', function(){
           return dispersal_method_service.save( dispersal_method_data)
            .then(function(result){
                return dispersal_method_service.get(dispersal_method_service.createId(dispersal_method_data))
            })
            .then(function(data){
                expect(data._source).to.deep.equal(dispersal_method_data)
                return true
            })
            .then(function(){
                // cleanup
                return dispersal_method_service.delete(dispersal_method_service.createId(dispersal_method_data))
            })
            
            
        })
        it('should throw an  validation error if pay period is empty object', function(){            
            return expect(dispersal_method_service.save({})).to.be.rejected                        
        })
        it('should throw an  validation error if pay period is missing id', function(){            
            return expect(dispersal_method_service.save({hello:'world'})).to.be.rejected                        
        })
        it('should throw an  validation error if pay period null', function(){            
            return expect(dispersal_method_service.save(null)).to.be.rejected                        
        })
    })
    describe('#saveAll', function(){
        it('should save all Pay periods from an array of pay periods', function(){
            let dispersal_method_service_array = []
            let dispersal_method_service_a = {name:'checkes'}
            let dispersal_method_service_b = {name:'SPEI'}
            let dispersal_method_service_c = {name:'Cash'}
            dispersal_method_service_array.push(dispersal_method_service_a)
            dispersal_method_service_array.push(dispersal_method_service_b)
            dispersal_method_service_array.push(dispersal_method_service_c)
            return dispersal_method_service.saveAll(dispersal_method_service_array)
            .then(function(result){
                let promises = []
                expect(result.length).to.equal(3)
                expect(result[0].result).to.equal('created')
                expect(result[1].result).to.equal('created')
                expect(result[2].result).to.equal('created')

                promises.push(dispersal_method_service.get(dispersal_method_service.createId(dispersal_method_service_a)))
                promises.push(dispersal_method_service.get(dispersal_method_service.createId(dispersal_method_service_b)))
                promises.push(dispersal_method_service.get(dispersal_method_service.createId(dispersal_method_service_c)))
                return Promise.all(promises)
            })
            .then(function(saved_cas){
                // console.log(saved_cas)
                expect(saved_cas[0]._source).to.deep.equal(dispersal_method_service_a)
                expect(saved_cas[1]._source).to.deep.equal(dispersal_method_service_b)
                expect(saved_cas[2]._source).to.deep.equal(dispersal_method_service_c)

                // clean up
                let promises = []
                promises.push(dispersal_method_service.delete(dispersal_method_service.createId(dispersal_method_service_a)))
                promises.push(dispersal_method_service.delete(dispersal_method_service.createId(dispersal_method_service_b)))
                promises.push(dispersal_method_service.delete(dispersal_method_service.createId(dispersal_method_service_c)))
                return Promise.all(promises)
            })
            
        })
    })
    describe('#GET',  function(){       
        it('should return empty if nothing exits',function() {
            return dispersal_method_service.get('this-is-a-fake-id').then(function(result){
                expect(result).to.be.null
            })
            
        })
        it('Should return address when the address exists', function(){
            return dispersal_method_service.save(dispersal_method_data)
            .then(function(result){
                let id = dispersal_method_service.createId(dispersal_method_data)
                return dispersal_method_service.get(id)
            })
            .then(function(result){
                expect(result._source).to.deep.equal(dispersal_method_data)
            })
            .then(function(){
                // cleanup
                dispersal_method_service.delete(dispersal_method_service.createId(dispersal_method_data))
            })
        })
     
    })
})