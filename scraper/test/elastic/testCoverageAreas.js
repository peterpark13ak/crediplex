const chai        = require('chai')
const cas     = require('../../src/data/elastic/coverage_areas')
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

var expect = chai.expect;

describe('#ElasticCoverageAreas',function(){
    var coverage_area_data
    beforeEach(function(){
        coverage_area_data = {
            "name":'Estado de Mexico',
        }
    })
    describe('#createID', function(){
        it('should create same id with same coverage data and same id value',function() {
            var id = cas.createId({key:'value', key2:'value2'})
            var id2 = cas.createId({key:'value', key2:'value2'})
            expect(id).to.equal(id2)
        })
        it('should create different id if coverage area data differs',function() {
            var id = cas.createId({key:'valueA', key2:'valueB'})
            var id2 = cas.createId( {key:'value', key2:'value2'})
            expect(id).to.not.equal(id2)
        })
    })
    describe('#save', function(){
        it('Should save a a coverage area ', function(){
           return cas.save( coverage_area_data)
            .then(function(result){
                return cas.get(cas.createId(coverage_area_data))
            })
            .then(function(data){
                expect(data._source).to.deep.equal(coverage_area_data)
                return true
            })
            .then(function(){
                // cleanup
                return cas.delete(cas.createId(coverage_area_data))
            })
            
            
        })
        it('should throw an  validation error if category is empty object', function(){            
            return expect(cas.save({})).to.be.rejected                        
        })
        it('should throw an  validation error if category is missing id', function(){            
            return expect(cas.save({hello:'world'})).to.be.rejected                        
        })
        it('should throw an  validation error if category null', function(){            
            return expect(cas.save(null)).to.be.rejected                        
        })
    })
    describe('#saveAll', function(){
        it('should save all coverage areas from an array of coverage areas', function(){
            let ca_array = []
            let ca_a = {name:'Estado de Mexico'}
            let ca_b = {name:'Chiapas'}
            let ca_c = {name:'Jalisco'}
            ca_array.push(ca_a)
            ca_array.push(ca_b)
            ca_array.push(ca_c)
            return cas.saveAll(ca_array)
            .then(function(result){
                let promises = []
                expect(result.length).to.equal(3)
                expect(result[0].result).to.equal('created')
                expect(result[1].result).to.equal('created')
                expect(result[2].result).to.equal('created')

                promises.push(cas.get(cas.createId(ca_a)))
                promises.push(cas.get(cas.createId(ca_b)))
                promises.push(cas.get(cas.createId(ca_c)))
                return Promise.all(promises)
            })
            .then(function(saved_cas){
                // console.log(saved_cas)
                expect(saved_cas[0]._source).to.deep.equal(ca_a)
                expect(saved_cas[1]._source).to.deep.equal(ca_b)
                expect(saved_cas[2]._source).to.deep.equal(ca_c)

                // clean up
                let promises = []
                promises.push(cas.delete(cas.createId(ca_a)))
                promises.push(cas.delete(cas.createId(ca_b)))
                promises.push(cas.delete(cas.createId(ca_c)))
                return Promise.all(promises)
            })
            
        })
    })
    describe('#GET',  function(){       
        it('should return empty if nothing exits',function() {
            return cas.get('this-is-a-fake-id').then(function(result){
                expect(result).to.be.null
            })
            
        })
        it('Should return address when the address exists', function(){
            return cas.save(coverage_area_data)
            .then(function(result){
                let id = cas.createId(coverage_area_data)
                return cas.get(id)
            })
            .then(function(result){
                expect(result._source).to.deep.equal(coverage_area_data)
            })
            .then(function(){
                // cleanup
                cas.delete(cas.createId(coverage_area_data))
            })
        })
     
    })
})