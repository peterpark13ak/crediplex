const chai        = require('chai')
const credit_use_service     = require('../../src/data/elastic/credit_uses')
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

var expect = chai.expect;

describe('#ElasticCreditUses',function(){
    var credit_use_data
    beforeEach(function(){
        credit_use_data = {
            "name":'fija',
        }
    })
    describe('#createID', function(){
        it('should create same id with same Credit Use and same id value',function() {
            var id = credit_use_service.createId({key:'value', key2:'value2'})
            var id2 = credit_use_service.createId({key:'value', key2:'value2'})
            expect(id).to.equal(id2)
        })
        it('should create different id if Credit Use data differs',function() {
            var id = credit_use_service.createId({key:'valueA', key2:'valueB'})
            var id2 = credit_use_service.createId( {key:'value', key2:'value2'})
            expect(id).to.not.equal(id2)
        })
    })
    describe('#save', function(){
        it('Should save a a Credit Use ', function(){
           return credit_use_service.save( credit_use_data)
            .then(function(result){
                return credit_use_service.get(credit_use_service.createId(credit_use_data))
            })
            .then(function(data){
                expect(data._source).to.deep.equal(credit_use_data)
                return true
            })
            .then(function(){
                // cleanup
                return credit_use_service.delete(credit_use_service.createId(credit_use_data))
            })
            
            
        })
        it('should throw an  validation error if Credit Use is empty object', function(){            
            return expect(credit_use_service.save({})).to.be.rejected                        
        })
        it('should throw an  validation error if Credit Use is missing id', function(){            
            return expect(credit_use_service.save({hello:'world'})).to.be.rejected                        
        })
        it('should throw an  validation error if Credit Use null', function(){            
            return expect(credit_use_service.save(null)).to.be.rejected                        
        })
    })
    describe('#saveAll', function(){
        it('should save all Credit Uses from an array of Credit Uses', function(){
            let credit_use_service_array = []
            let credit_use_service_a = {name:'fixed'}
            let credit_use_service_b = {name:'variable'}
            let credit_use_service_c = {name:'other'}
            credit_use_service_array.push(credit_use_service_a)
            credit_use_service_array.push(credit_use_service_b)
            credit_use_service_array.push(credit_use_service_c)
            return credit_use_service.saveAll(credit_use_service_array)
            .then(function(result){
                let promises = []
                expect(result.length).to.equal(3)
                expect(result[0].result).to.equal('created')
                expect(result[1].result).to.equal('created')
                expect(result[2].result).to.equal('created')

                promises.push(credit_use_service.get(credit_use_service.createId(credit_use_service_a)))
                promises.push(credit_use_service.get(credit_use_service.createId(credit_use_service_b)))
                promises.push(credit_use_service.get(credit_use_service.createId(credit_use_service_c)))
                return Promise.all(promises)
            })
            .then(function(saved_credit_use){
                // console.log(saved_cas)
                expect(saved_credit_use[0]._source).to.deep.equal(credit_use_service_a)
                expect(saved_credit_use[1]._source).to.deep.equal(credit_use_service_b)
                expect(saved_credit_use[2]._source).to.deep.equal(credit_use_service_c)

                // clean up
                let promises = []
                promises.push(credit_use_service.delete(credit_use_service.createId(credit_use_service_a)))
                promises.push(credit_use_service.delete(credit_use_service.createId(credit_use_service_b)))
                promises.push(credit_use_service.delete(credit_use_service.createId(credit_use_service_c)))
                return Promise.all(promises)
            })
            
        })
    })
    describe('#GET',  function(){       
        it('should return empty if nothing exits',function() {
            return credit_use_service.get('this-is-a-fake-id').then(function(result){
                expect(result).to.be.null
            })
            
        })
        it('Should return Credit Use when the Credit Use exists', function(){
            return credit_use_service.save(credit_use_data)
            .then(function(result){
                let id = credit_use_service.createId(credit_use_data)
                return credit_use_service.get(id)
            })
            .then(function(result){
                expect(result._source).to.deep.equal(credit_use_data)
            })
            .then(function(){
                // cleanup
                credit_use_service.delete(credit_use_service.createId(credit_use_data))
            })
        })
     
    })
})