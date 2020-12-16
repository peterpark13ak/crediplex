const chai        = require('chai')
const lender     = require('../../src/data/elastic/lender')
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

var expect = chai.expect;

describe('#ElasticLender',function(){
    var lender_data
    beforeEach(function(){
        lender_data = { name: 'Grupo Anisal, S.A. de C.V., SOFOM, E.N.R.',
        external_id: '123',
        lender_details_url: 'https://webapps.condusef.gob.mx/SIPRES/jsp/home_publico.jsp?idins=3666',
        trade_association: '-',
        main_activity: 'Crédito Personal',
        lender_product_link: 'http://ifit.condusef.gob.mx/ifit/ftb_validaciones.php?idi=3666',
        short_name: 'Abonitos',
        status: 'En operación',
        rfc: 'GAN090903BQ5 ',
        shcp_key: '691720',
        sector: 'Sociedades Financieras de Objeto Múltiple E.N.R.',
        supervisor: 'CONDUSEF',
        entity: 'Nacional',
        launch_date: '03/09/2009',
        website: 'www.abonitos.com.mx',
        email: 'aalvarez@abonitos.com.mx',
        sic_data: 'Trans Unión de México, S.A., Sociedad de Información Crediticia, Vigencia: 31/07/2014 - Indefinido - Último cumplimiento: 13/07/2018',
        generales_modificados: '(generales modificados el 25/03/2014)',
        sipres_start_date: '15/07/2010 12:42:00',
        sipres_end_date: 'somedateingo' }
        
    })
   
    describe('#save', function(){
        
        it('Should save an lender ', function(){
            lender.save(lender_data)
            .then(function(result){
                return lender.get(lender_data.external_id)
            })
            .then(function(data){
                expect(data._source).to.deep.equal(lender_data)
                return true
            })
            .then(function(){
                // cleanup
                return lender.delete(lender_data.external_id)
            })
            
        })
        it('should throw an  validation error if lender is empty object', function(){            
            return expect(lender.save({})).to.be.rejected                        
        })
        it('should throw an  validation error if lender is missing external_id', function(){            
            return expect(lender.save({hello:'world'})).to.be.rejected                        
        })
        it('should throw an  validation error if lender object is null', function(){            
            return expect(lender.save(null)).to.be.rejected                        
        })
    

    })
    describe('#GET',  function(){       
        it('should return empty if nothing exits',function() {
            return lender.get(0).then(function(result){
                expect(result).to.be.null
            })
            
        })
        it('Should return lender when the lender exists', function(){
            lender_data.external_id = '99'
            return lender.save(lender_data)
            .then(function(result){
                return lender.get(lender_data.external_id)
            })
            .then(function(result){
                expect(result._source).to.deep.equal(lender_data)
            })
            .then(function(){
                // cleanup
                lender.delete(lender_data.external_id)
            })
        })
     
    })              
})