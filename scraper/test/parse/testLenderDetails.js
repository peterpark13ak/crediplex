const expect    = require('chai').expect
const fs        = require('fs')
const lender_details   = require('../../src/scrape/parse/lender_details')

describe('#lender_details',function(){
    describe('#scrape', function(){
        it('should scrape a table of lender information and parss it into structured json',function() {
            let body = fs.readFileSync('./test/data/lender_details.html', "utf8")
            let lender = lender_details.parse(body)

            expect(lender).to.deep.equal(
                { 
                    short_name: 'Impulsando Va',
                    status: 'En operación',
                    rfc: 'IVA1605131B9',
                    shcp_key: '694799',
                    sector: 'Sociedades Financieras de Objeto Múltiple E.N.R.',
                    supervisor: 'CONDUSEF',
                    entity: 'Nacional',
                    launch_date: '13/05/2016',
                    website: 'www.impulsandovalor.com.mx',
                    email: 'impulsandovalor@gmail.com',
                    sic_data: 'Círculo de Crédito, S.A. de C.V., Sociedad de Información Crediticia, Vigencia: 06/06/2016 - Indefinido - Último cumplimiento: 09/07/2018',
                    generales_modificados: '(generales modificados el 19/09/2016)',
                    sipres_start_date: '12/08/2016 10:28:46',
                    sipres_end_date: undefined 
                })
        })
    })  
    describe('#isNoDataMessage', function(){
        it('should return true if parsing page that indicates no data is available',function() {
            let body = fs.readFileSync('./test/data/no_lender_data.html', "utf8")
            let value = lender_details.isNoDataMessage(body)
            expect(value).to.be.true
        })
        it('should return false other page',function() {
            let body = fs.readFileSync('./test/data/lender_details.html', "utf8")
            let value = lender_details.isNoDataMessage(body)
            expect(value).to.be.false
        })
    })  
})