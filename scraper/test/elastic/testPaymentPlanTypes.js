const chai        = require('chai')
const payment_plan_type_service     = require('../../src/data/elastic/payment_plan_types')
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

var expect = chai.expect;

describe('#ElasticPayPeriods',function(){
    var payment_plan_type_data
    beforeEach(function(){
        payment_plan_type_data = {
            "name":'Quincenal',
        }
    })
    describe('#createID', function(){
        it('should create same id with same Payment Plan Type and same id value',function() {
            var id = payment_plan_type_service.createId({key:'value', key2:'value2'})
            var id2 = payment_plan_type_service.createId({key:'value', key2:'value2'})
            expect(id).to.equal(id2)
        })
        it('should create different id if Payment Plan Type data differs',function() {
            var id = payment_plan_type_service.createId({key:'valueA', key2:'valueB'})
            var id2 = payment_plan_type_service.createId( {key:'value', key2:'value2'})
            expect(id).to.not.equal(id2)
        })
    })
    describe('#save', function(){
        it('Should save a a Payment Plan Type ', function(){
           return payment_plan_type_service.save( payment_plan_type_data)
            .then(function(result){
                return payment_plan_type_service.get(payment_plan_type_service.createId(payment_plan_type_data))
            })
            .then(function(data){
                expect(data._source).to.deep.equal(payment_plan_type_data)
                return true
            })
            .then(function(){
                // cleanup
                return payment_plan_type_service.delete(payment_plan_type_service.createId(payment_plan_type_data))
            })
            
            
        })
        it('should throw an  validation error if Payment Plan Type is empty object', function(){            
            return expect(payment_plan_type_service.save({})).to.be.rejected                        
        })
        it('should throw an  validation error if Payment Plan type is missing id', function(){            
            return expect(payment_plan_type_service.save({hello:'world'})).to.be.rejected                        
        })
        it('should throw an  validation error if Payment Plan type null', function(){            
            return expect(payment_plan_type_service.save(null)).to.be.rejected                        
        })
    })
    describe('#saveAll', function(){
        it('should save all Payment Plan types from an array of Payment Plan types', function(){
            let payment_plan_type_service_array = []
            let payment_plan_type_service_a = {name:'checkes'}
            let payment_plan_type_service_b = {name:'SPEI'}
            let payment_plan_type_service_c = {name:'Cash'}
            payment_plan_type_service_array.push(payment_plan_type_service_a)
            payment_plan_type_service_array.push(payment_plan_type_service_b)
            payment_plan_type_service_array.push(payment_plan_type_service_c)
            return payment_plan_type_service.saveAll(payment_plan_type_service_array)
            .then(function(result){
                let promises = []
                expect(result.length).to.equal(3)
                expect(result[0].result).to.equal('created')
                expect(result[1].result).to.equal('created')
                expect(result[2].result).to.equal('created')

                promises.push(payment_plan_type_service.get(payment_plan_type_service.createId(payment_plan_type_service_a)))
                promises.push(payment_plan_type_service.get(payment_plan_type_service.createId(payment_plan_type_service_b)))
                promises.push(payment_plan_type_service.get(payment_plan_type_service.createId(payment_plan_type_service_c)))
                return Promise.all(promises)
            })
            .then(function(saved_cas){
                // console.log(saved_cas)
                expect(saved_cas[0]._source).to.deep.equal(payment_plan_type_service_a)
                expect(saved_cas[1]._source).to.deep.equal(payment_plan_type_service_b)
                expect(saved_cas[2]._source).to.deep.equal(payment_plan_type_service_c)

                // clean up
                let promises = []
                promises.push(payment_plan_type_service.delete(payment_plan_type_service.createId(payment_plan_type_service_a)))
                promises.push(payment_plan_type_service.delete(payment_plan_type_service.createId(payment_plan_type_service_b)))
                promises.push(payment_plan_type_service.delete(payment_plan_type_service.createId(payment_plan_type_service_c)))
                return Promise.all(promises)
            })
            
        })
    })
    describe('#GET',  function(){       
        it('should return empty if nothing exits',function() {
            return payment_plan_type_service.get('this-is-a-fake-id').then(function(result){
                expect(result).to.be.null
            })
            
        })
        it('Should return Payment Plan Type when the Payment Plan Type exists', function(){
            return payment_plan_type_service.save(payment_plan_type_data)
            .then(function(result){
                let id = payment_plan_type_service.createId(payment_plan_type_data)
                return payment_plan_type_service.get(id)
            })
            .then(function(result){
                expect(result._source).to.deep.equal(payment_plan_type_data)
            })
            .then(function(){
                // cleanup
                payment_plan_type_service.delete(payment_plan_type_service.createId(payment_plan_type_data))
            })
        })
     
    })
})