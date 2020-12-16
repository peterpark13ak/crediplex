const chai        = require('chai')
const applicant_type_service     = require('../../src/data/elastic/applicant_types')
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

var expect = chai.expect;

describe('#ElasticCreditUses',function(){
    var applicant_type_data
    beforeEach(function(){
        applicant_type_data = {
            "name":'fija',
        }
    })
    describe('#createID', function(){
        it('should create same id with same Applicant Type and same id value',function() {
            var id = applicant_type_service.createId({key:'value', key2:'value2'})
            var id2 = applicant_type_service.createId({key:'value', key2:'value2'})
            expect(id).to.equal(id2)
        })
        it('should create different id if Applicant Type data differs',function() {
            var id = applicant_type_service.createId({key:'valueA', key2:'valueB'})
            var id2 = applicant_type_service.createId( {key:'value', key2:'value2'})
            expect(id).to.not.equal(id2)
        })
    })
    describe('#save', function(){
        it('Should save a a Applicant Type ', function(){
           return applicant_type_service.save( applicant_type_data)
            .then(function(result){
                return applicant_type_service.get(applicant_type_service.createId(applicant_type_data))
            })
            .then(function(data){
                expect(data._source).to.deep.equal(applicant_type_data)
                return true
            })
            .then(function(){
                // cleanup
                return applicant_type_service.delete(applicant_type_service.createId(applicant_type_data))
            })
            
            
        })
        it('should throw an  validation error if Applicant Type is empty object', function(){            
            return expect(applicant_type_service.save({})).to.be.rejected                        
        })
        it('should throw an  validation error if Applicant Type is missing id', function(){            
            return expect(applicant_type_service.save({hello:'world'})).to.be.rejected                        
        })
        it('should throw an  validation error if Applicant Type null', function(){            
            return expect(applicant_type_service.save(null)).to.be.rejected                        
        })
    })
    describe('#saveAll', function(){
        it('should save all Applicant Types from an array of Applicant Types', function(){
            let applicant_type_service_array = []
            let applicant_type_service_a = {name:'fixed'}
            let applicant_type_service_b = {name:'variable'}
            let applicant_type_service_c = {name:'other'}
            applicant_type_service_array.push(applicant_type_service_a)
            applicant_type_service_array.push(applicant_type_service_b)
            applicant_type_service_array.push(applicant_type_service_c)
            return applicant_type_service.saveAll(applicant_type_service_array)
            .then(function(result){
                let promises = []
                expect(result.length).to.equal(3)
                expect(result[0].result).to.equal('created')
                expect(result[1].result).to.equal('created')
                expect(result[2].result).to.equal('created')

                promises.push(applicant_type_service.get(applicant_type_service.createId(applicant_type_service_a)))
                promises.push(applicant_type_service.get(applicant_type_service.createId(applicant_type_service_b)))
                promises.push(applicant_type_service.get(applicant_type_service.createId(applicant_type_service_c)))
                return Promise.all(promises)
            })
            .then(function(saved_applicant_type){
                // console.log(saved_cas)
                expect(saved_applicant_type[0]._source).to.deep.equal(applicant_type_service_a)
                expect(saved_applicant_type[1]._source).to.deep.equal(applicant_type_service_b)
                expect(saved_applicant_type[2]._source).to.deep.equal(applicant_type_service_c)

                // clean up
                let promises = []
                promises.push(applicant_type_service.delete(applicant_type_service.createId(applicant_type_service_a)))
                promises.push(applicant_type_service.delete(applicant_type_service.createId(applicant_type_service_b)))
                promises.push(applicant_type_service.delete(applicant_type_service.createId(applicant_type_service_c)))
                return Promise.all(promises)
            })
            
        })
    })
    describe('#GET',  function(){       
        it('should return empty if nothing exits',function() {
            return applicant_type_service.get('this-is-a-fake-id').then(function(result){
                expect(result).to.be.null
            })
            
        })
        it('Should return Applicant Type when the Applicant Type exists', function(){
            return applicant_type_service.save(applicant_type_data)
            .then(function(result){
                let id = applicant_type_service.createId(applicant_type_data)
                return applicant_type_service.get(id)
            })
            .then(function(result){
                expect(result._source).to.deep.equal(applicant_type_data)
            })
            .then(function(){
                // cleanup
                applicant_type_service.delete(applicant_type_service.createId(applicant_type_data))
            })
        })
     
    })
})