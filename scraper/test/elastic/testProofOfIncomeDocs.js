const chai        = require('chai')
const proof_of_income_doc_service     = require('../../src/data/elastic/proof_of_income_docs')
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

var expect = chai.expect;

describe('#ElasticProofOfIncomeDocs',function(){
    var proof_of_income_doc_data
    beforeEach(function(){
        proof_of_income_doc_data = {
            "name":'Credencial IFE',
        }
    })
    describe('#createID', function(){
        it('should create same id with same Proof of Income Docs and same id value',function() {
            var id = proof_of_income_doc_service.createId({key:'value', key2:'value2'})
            var id2 = proof_of_income_doc_service.createId({key:'value', key2:'value2'})
            expect(id).to.equal(id2)
        })
        it('should create different id if Proof of Income Doc data differs',function() {
            var id = proof_of_income_doc_service.createId({key:'valueA', key2:'valueB'})
            var id2 = proof_of_income_doc_service.createId( {key:'value', key2:'value2'})
            expect(id).to.not.equal(id2)
        })
    })
    describe('#save', function(){
        it('Should save a a Proof of Income Doc ', function(){
           return proof_of_income_doc_service.save( proof_of_income_doc_data)
            .then(function(result){
                return proof_of_income_doc_service.get(proof_of_income_doc_service.createId(proof_of_income_doc_data))
            })
            .then(function(data){
                expect(data._source).to.deep.equal(proof_of_income_doc_data)
                return true
            })
            .then(function(){
                // cleanup
                return proof_of_income_doc_service.delete(proof_of_income_doc_service.createId(proof_of_income_doc_data))
            })
            
            
        })
        it('should throw an  validation error if Proof of Income Doc is empty object', function(){            
            return expect(proof_of_income_doc_service.save({})).to.be.rejected                        
        })
        it('should throw an  validation error if Proof of Income Doc is missing id', function(){            
            return expect(proof_of_income_doc_service.save({hello:'world'})).to.be.rejected                        
        })
        it('should throw an  validation error if Proof of Income Doc null', function(){            
            return expect(proof_of_income_doc_service.save(null)).to.be.rejected                        
        })
    })
    describe('#saveAll', function(){
        it('should save all Proof of Income Docs from an array of Proof of Income Docs', function(){
            let proof_of_income_doc_service_array = []
            let proof_of_income_doc_service_a = {name:'fixed'}
            let proof_of_income_doc_service_b = {name:'variable'}
            let proof_of_income_doc_service_c = {name:'other'}
            proof_of_income_doc_service_array.push(proof_of_income_doc_service_a)
            proof_of_income_doc_service_array.push(proof_of_income_doc_service_b)
            proof_of_income_doc_service_array.push(proof_of_income_doc_service_c)
            return proof_of_income_doc_service.saveAll(proof_of_income_doc_service_array)
            .then(function(result){
                let promises = []
                expect(result.length).to.equal(3)
                expect(result[0].result).to.equal('created')
                expect(result[1].result).to.equal('created')
                expect(result[2].result).to.equal('created')

                promises.push(proof_of_income_doc_service.get(proof_of_income_doc_service.createId(proof_of_income_doc_service_a)))
                promises.push(proof_of_income_doc_service.get(proof_of_income_doc_service.createId(proof_of_income_doc_service_b)))
                promises.push(proof_of_income_doc_service.get(proof_of_income_doc_service.createId(proof_of_income_doc_service_c)))
                return Promise.all(promises)
            })
            .then(function(saved_proof_of_income_doc){
                // console.log(saved_cas)
                expect(saved_proof_of_income_doc[0]._source).to.deep.equal(proof_of_income_doc_service_a)
                expect(saved_proof_of_income_doc[1]._source).to.deep.equal(proof_of_income_doc_service_b)
                expect(saved_proof_of_income_doc[2]._source).to.deep.equal(proof_of_income_doc_service_c)

                // clean up
                let promises = []
                promises.push(proof_of_income_doc_service.delete(proof_of_income_doc_service.createId(proof_of_income_doc_service_a)))
                promises.push(proof_of_income_doc_service.delete(proof_of_income_doc_service.createId(proof_of_income_doc_service_b)))
                promises.push(proof_of_income_doc_service.delete(proof_of_income_doc_service.createId(proof_of_income_doc_service_c)))
                return Promise.all(promises)
            })
            
        })
    })
    describe('#GET',  function(){       
        it('should return empty if nothing exits',function() {
            return proof_of_income_doc_service.get('this-is-a-fake-id').then(function(result){
                expect(result).to.be.null
            })
            
        })
        it('Should return Proof of Income Doc when the Proof of Income Doc exists', function(){
            return proof_of_income_doc_service.save(proof_of_income_doc_data)
            .then(function(result){
                let id = proof_of_income_doc_service.createId(proof_of_income_doc_data)
                return proof_of_income_doc_service.get(id)
            })
            .then(function(result){
                expect(result._source).to.deep.equal(proof_of_income_doc_data)
            })
            .then(function(){
                // cleanup
                proof_of_income_doc_service.delete(proof_of_income_doc_service.createId(proof_of_income_doc_data))
            })
        })
     
    })
})