const expect        = require('chai').expect
const fs            = require('fs')
const runner        = require('../../src/scrape/jobs/job_runner')
const crawl         = require('../../src/scrape/jobs/crawl')
var sinon           = require('sinon');

describe('#job_runner',function(){
    var lender_list_item_job = {
        "type": "lender",
        "data": {
            "name": "Grupo Anisal, S.A. de C.V., SOFOM, E.N.R.",
            "external_id": "3666",
            "lender_details_url": "https://webapps.condusef.gob.mx/SIPRES/jsp/home_publico.jsp?idins=3666",
            "trade_association": "-",
            "main_activity": "Crédito Personal",
            "lender_product_link": "http://ifit.condusef.gob.mx/ifit/ftb_validaciones.php?idi=3666"
        }
    }
    var lender_detail_job = { data:
        { name: 'Grupo Anisal, S.A. de C.V., SOFOM, E.N.R.',
          external_id: '3666',
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
          sipres_end_date: undefined },
       type: 'lender_details' } 

    describe('#process_lender', function(){
        it('Return a job if it crawls successfully and has detail url',function() {
            var content = fs.readFileSync('./test/data/data/lender_detail.html', "utf8")
            var crawl_lender_details = sinon.stub(crawl, "lender_details")
            crawl_lender_details.returns(content)

            runner.process_lender(lender_list_item_job)
            .then(function(results){
                expect(results).to.deep.equal([lender_detail_job])
            })
        })
    })
    
})