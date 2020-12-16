const expect    = require('chai').expect
const fs        = require('fs')
const lender_sector   = require('../../src/scrape/parse/lender_list')

describe('#lender_sector',function(){
    describe('#scrape', function(){
        it('should scrape a table of lender information and parss it into structured json',function() {
            let body = fs.readFileSync('./test/data/list_of_lenders_in_sector.html', "utf8")
            let lenders = lender_sector.parse(body)
            
            expect(lenders[lenders.length-1]).to.deep.equal({ name: 'Impulsando Valor Activecapital, S.A.P.I. de C.V., SOFOM, E.N.R.',
            external_id: '14376',
                lender_details_url: 'https://webapps.condusef.gob.mx/SIPRES/jsp/home_publico.jsp?idins=14376',
                trade_association: '-',
                main_activity: 'Crédito Personal',
                lender_product_link: 'http://ifit.condusef.gob.mx/ifit/ftb_validaciones.php?idi=14376'}
            )
            expect(lenders[0]).to.deep.equal(
                { name: 'Financiera Maestra, S.A. de C.V. SOFOM, E.N.R.',
                external_id: '1864',
                lender_details_url: 'https://webapps.condusef.gob.mx/SIPRES/jsp/home_publico.jsp?idins=1864',
                trade_association: 'AMDEN',
                main_activity: 'Crédito a la actividad empresarial',
                lender_product_link: 'http://ifit.condusef.gob.mx/ifit/ftb_validaciones.php?idi=1864' }             
            )
            expect(lenders[500]).to.deep.equal(
                { name: 'Servicios Financieros Hogar, S.A. de C.V., SOFOM, E.N.R.',
                external_id: '3875',
                lender_details_url: 'https://webapps.condusef.gob.mx/SIPRES/jsp/home_publico.jsp?idins=3875',
                trade_association: '-',
                main_activity: 'Sin Identificar',
                lender_product_link: 'http://ifit.condusef.gob.mx/ifit/ftb_validaciones.php?idi=3875' }           
            )
            expect(lenders.length).to.equal(758)
            console.log(JSON.stringify(lenders, null, 2))
            console.log(lenders.length)
        })
    })
})