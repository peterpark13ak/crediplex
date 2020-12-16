const chai        = require('chai')
const pp     = require('../../src/data/elastic/pay_periods')
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

var expect = chai.expect;

describe('#ElasticPayPeriods',function(){
    var pay_period_data
    beforeEach(function(){
        pay_period_data = {
            "name":'Quincenal',
        }
    })
    describe('#createID', function(){
        it('should create same id with same pay period and same id value',function() {
            var id = pp.createId({key:'value', key2:'value2'})
            var id2 = pp.createId({key:'value', key2:'value2'})
            expect(id).to.equal(id2)
        })
        it('should create different id if pay period data differs',function() {
            var id = pp.createId({key:'valueA', key2:'valueB'})
            var id2 = pp.createId( {key:'value', key2:'value2'})
            expect(id).to.not.equal(id2)
        })
    })
    describe('#save', function(){
        it('Should save a a pay period ', function(){
           return pp.save( pay_period_data)
            .then(function(result){
                return pp.get(pp.createId(pay_period_data))
            })
            .then(function(data){
                expect(data._source).to.deep.equal(pay_period_data)
                return true
            })
            .then(function(){
                // cleanup
                return pp.delete(pp.createId(pay_period_data))
            })
            
            
        })
        it('should throw an  validation error if pay period is empty object', function(){            
            return expect(pp.save({})).to.be.rejected                        
        })
        it('should throw an  validation error if pay period is missing id', function(){            
            return expect(pp.save({hello:'world'})).to.be.rejected                        
        })
        it('should throw an  validation error if pay period null', function(){            
            return expect(pp.save(null)).to.be.rejected                        
        })
    })
    describe('#saveAll', function(){
        it('should save all Pay periods from an array of pay periods', function(){
            let pp_array = []
            let pp_a = {name:'Estado de Mexico'}
            let pp_b = {name:'Chiapas'}
            let pp_c = {name:'Jalisco'}
            pp_array.push(pp_a)
            pp_array.push(pp_b)
            pp_array.push(pp_c)
            return pp.saveAll(pp_array)
            .then(function(result){
                let promises = []
                expect(result.length).to.equal(3)
                expect(result[0].result).to.equal('created')
                expect(result[1].result).to.equal('created')
                expect(result[2].result).to.equal('created')

                promises.push(pp.get(pp.createId(pp_a)))
                promises.push(pp.get(pp.createId(pp_b)))
                promises.push(pp.get(pp.createId(pp_c)))
                return Promise.all(promises)
            })
            .then(function(saved_cas){
                // console.log(saved_cas)
                expect(saved_cas[0]._source).to.deep.equal(pp_a)
                expect(saved_cas[1]._source).to.deep.equal(pp_b)
                expect(saved_cas[2]._source).to.deep.equal(pp_c)

                // clean up
                let promises = []
                promises.push(pp.delete(pp.createId(pp_a)))
                promises.push(pp.delete(pp.createId(pp_b)))
                promises.push(pp.delete(pp.createId(pp_c)))
                return Promise.all(promises)
            })
            
        })
    })
    describe('#GET',  function(){       
        it('should return empty if nothing exits',function() {
            return pp.get('this-is-a-fake-id').then(function(result){
                expect(result).to.be.null
            })
            
        })
        it('Should return address when the address exists', function(){
            return pp.save(pay_period_data)
            .then(function(result){
                let id = pp.createId(pay_period_data)
                return pp.get(id)
            })
            .then(function(result){
                expect(result._source).to.deep.equal(pay_period_data)
            })
            .then(function(){
                // cleanup
                pp.delete(pp.createId(pay_period_data))
            })
        })
     
    })
})