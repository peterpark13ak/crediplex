const expect    = require('chai').expect
const fs        = require('fs')
const addresses   = require('../../src/scrape/parse/lender_addresses')

describe('#lender_addresses',function(){
    describe('#scrape', function(){
        it('should scrape a table of lender information and parss it into structured json',function() {
            let body = fs.readFileSync('./test/data/addresses.html', "utf8")
            let results = addresses.scrape(body)

            expect(results[0]).to.deep.equal(
                { street: 'Insurgentes Sur',
                    street_number: '1228',
                    suite: '5° Piso',
                    cross_street_a: 'Manzanas',
                    cross_street_b: 'San Lorenzo',
                    landmark: 'Frente a Autofin',
                    area_code: '55',
                    phone_number: '22 82 76 70; 01800 2 233 123',
                    zipcode: '3200',
                    colonia: 'Tlacoquemécatl',
                    municipio: 'Benito Juárez',
                    federal_entity: 'Ciudad de México' })
                    expect(results[1]).to.deep.equal(
                        { street: 'Insurgentes Sur',
                        street_number: '1228',
                        suite: '5° Piso',
                        cross_street_a: 'Manzanas',
                        cross_street_b: 'san lorenzo',
                        landmark: '',
                        area_code: '55',
                        phone_number: '22 82 76 70',
                        zipcode: '3200',
                        colonia: 'Tlacoquemécatl',
                        municipio: 'Benito Juárez',
                        federal_entity: 'Ciudad de México' })
                })
    })
})