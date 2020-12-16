const chai        = require('chai')
const addresses     = require('../../src/data/elastic/addresses')
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

var expect = chai.expect;

describe('#ElasticAddresses',function(){
    var address_data
    beforeEach(function(){
        address_data = {
            "lender_id":1234,
            "street": "Tiburcio Montiel",
            "street_number": "14",
            "suite": "",
            "cross_street_a": "",
            "cross_street_b": "",
            "landmark": "",
            "area_code": "55",
            "phone_number": "5278-29-30; 5278-22-80",
            "zipcode": "11850",
            "colonia": "San Miguel Chapultepec II Sección",
            "municipio": "Miguel Hidalgo",
            "federal_entity": "Ciudad de México"
        }
    })
    describe('#createID', function(){
        it('should create same id with same address data and same id value',function() {
            var id = addresses.createId(0, {key:'value', key2:'value2'})
            var id2 = addresses.createId(0, {key:'value', key2:'value2'})
            expect(id).to.equal(id2)
        })
        it('should create different id if address data differs',function() {
            var id = addresses.createId(0, {key:'valueA', key2:'valueB'})
            var id2 = addresses.createId(0, {key:'value', key2:'value2'})
            expect(id).to.not.equal(id2)
        })
        it('should create different id if indexes differ',function() {
            var id = addresses.createId(0, {key:'value', key2:'value2'})
            var id2 = addresses.createId(1, {key:'value', key2:'value2'})
            expect(id).to.not.equal(id2)
        })
    })
    describe('#save', function(){
        var addr_id = 123
        it('Should save an address ', function(){
            addresses.save(addr_id, address_data)
            .then(function(result){
                return addresses.get(addr_id)
            })
            .then(function(data){
                expect(data._source).to.deep.equal(address_data)
                return true
            })
            .then(function(){
                // cleanup
                return addresses.delete(addr_id)
            })
            
        })
        it('should throw an  validation error if address is empty object', function(){            
            return expect(addresses.save(32,{})).to.be.rejected                        
        })
        it('should throw an  validation error if address is missing lender_id', function(){            
            return expect(addresses.save(32,{hello:'world'})).to.be.rejected                        
        })
        it('should throw an  validation error if address null', function(){            
            return expect(addresses.save(32,null)).to.be.rejected                        
        })
    

    })
    describe('#GET',  function(){       
        it('should return empty if nothing exits',function() {
            return addresses.get(0).then(function(result){
                expect(result).to.be.null
            })
            
        })
        it('Should return address when the address exists', function(){
            return addresses.save(0,address_data)
            .then(function(result){
                return addresses.get(0)
            })
            .then(function(result){
                expect(result._source).to.deep.equal(address_data)
            })
            .then(function(){
                // cleanup
                addresses.delete(0)
            })
        })
     
    })
    describe('#saveAll', function(){
        it('Should save multiple addresses', function(){
            let id1 = addresses.createId(0, address_data)
            let id2 = addresses.createId(1, address_data)

            let addr_array = [address_data, address_data]
            return addresses.saveAll(addr_array)
            .then(function(result){
                return addresses.get(id1)                
            })
            .then(function(addr1){
                expect(addr1._source).to.deep.equal(address_data)
                return addresses.get(id2)
            })            
            .then(function(addr2){
                expect(addr2._source).to.deep.equal(address_data)
                // cleanup
                return addresses.delete(id1)
            })
            .then(function(){
                // cleanup
                return addresses.delete(id2)
            })
        })
        
    })
        
    
})