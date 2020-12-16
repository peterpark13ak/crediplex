const chai        = require('chai')
const id_doc_service     = require('../../src/data/elastic/id_docs')
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

var expect = chai.expect;

describe('#ElasticIdDocs',function(){
    var id_doc_data
    beforeEach(function(){
        id_doc_data = {
            "name":'Credencial IFE',
        }
    })
    describe('#createID', function(){
        it('should create same id with same Id Docs and same id value',function() {
            var id = id_doc_service.createId({key:'value', key2:'value2'})
            var id2 = id_doc_service.createId({key:'value', key2:'value2'})
            expect(id).to.equal(id2)
        })
        it('should create different id if ID Doc data differs',function() {
            var id = id_doc_service.createId({key:'valueA', key2:'valueB'})
            var id2 = id_doc_service.createId( {key:'value', key2:'value2'})
            expect(id).to.not.equal(id2)
        })
    })
    describe('#save', function(){
        it('Should save a a ID Doc ', function(){
           return id_doc_service.save( id_doc_data)
            .then(function(result){
                return id_doc_service.get(id_doc_service.createId(id_doc_data))
            })
            .then(function(data){
                expect(data._source).to.deep.equal(id_doc_data)
                return true
            })
            .then(function(){
                // cleanup
                return id_doc_service.delete(id_doc_service.createId(id_doc_data))
            })
            
            
        })
        it('should throw an  validation error if ID Doc is empty object', function(){            
            return expect(id_doc_service.save({})).to.be.rejected                        
        })
        it('should throw an  validation error if ID Doc is missing id', function(){            
            return expect(id_doc_service.save({hello:'world'})).to.be.rejected                        
        })
        it('should throw an  validation error if ID Doc null', function(){            
            return expect(id_doc_service.save(null)).to.be.rejected                        
        })
    })
    describe('#saveAll', function(){
        it('should save all ID Docs from an array of ID Docs', function(){
            let id_doc_service_array = []
            let id_doc_service_a = {name:'fixed'}
            let id_doc_service_b = {name:'variable'}
            let id_doc_service_c = {name:'other'}
            id_doc_service_array.push(id_doc_service_a)
            id_doc_service_array.push(id_doc_service_b)
            id_doc_service_array.push(id_doc_service_c)
            return id_doc_service.saveAll(id_doc_service_array)
            .then(function(result){
                let promises = []
                expect(result.length).to.equal(3)
                expect(result[0].result).to.equal('created')
                expect(result[1].result).to.equal('created')
                expect(result[2].result).to.equal('created')

                promises.push(id_doc_service.get(id_doc_service.createId(id_doc_service_a)))
                promises.push(id_doc_service.get(id_doc_service.createId(id_doc_service_b)))
                promises.push(id_doc_service.get(id_doc_service.createId(id_doc_service_c)))
                return Promise.all(promises)
            })
            .then(function(saved_id_doc){
                // console.log(saved_cas)
                expect(saved_id_doc[0]._source).to.deep.equal(id_doc_service_a)
                expect(saved_id_doc[1]._source).to.deep.equal(id_doc_service_b)
                expect(saved_id_doc[2]._source).to.deep.equal(id_doc_service_c)

                // clean up
                let promises = []
                promises.push(id_doc_service.delete(id_doc_service.createId(id_doc_service_a)))
                promises.push(id_doc_service.delete(id_doc_service.createId(id_doc_service_b)))
                promises.push(id_doc_service.delete(id_doc_service.createId(id_doc_service_c)))
                return Promise.all(promises)
            })
            
        })
    })
    describe('#GET',  function(){       
        it('should return empty if nothing exits',function() {
            return id_doc_service.get('this-is-a-fake-id').then(function(result){
                expect(result).to.be.null
            })
            
        })
        it('Should return ID Doc when the ID Doc exists', function(){
            return id_doc_service.save(id_doc_data)
            .then(function(result){
                let id = id_doc_service.createId(id_doc_data)
                return id_doc_service.get(id)
            })
            .then(function(result){
                expect(result._source).to.deep.equal(id_doc_data)
            })
            .then(function(){
                // cleanup
                id_doc_service.delete(id_doc_service.createId(id_doc_data))
            })
        })
     
    })
})