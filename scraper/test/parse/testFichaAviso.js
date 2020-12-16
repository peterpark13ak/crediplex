const expect    = require('chai').expect
const fs        = require('fs')
const ficha_aviso   = require('../../src/scrape/parse/ficha_aviso')

describe('#ficha_aviso',function(){
    describe('#scrape', function(){
        it('should scrape the product disclaimer screen and get the link to the product description page',function() {
            let body = fs.readFileSync('./test/data/ficha_link_aviso.html', "utf8")
            aviso = ficha_aviso.scrape(body)
            expect(aviso).to.deep.equal({ product_id: '21039',
            product_link: 'https://ifit.condusef.gob.mx/ifit/ft_general_final_2.php?idnc=21039&t=16&b=1' })
            
            
        })
    })
    describe('#isTargetContent', function(){
        it('should return true if it is on a product disclaimer page', function(){
            let body = fs.readFileSync('./test/data/ficha_link_aviso.html', "utf8")
            aviso = ficha_aviso.isTargetContent(body)
            expect(aviso).to.be.true
        })
        it('should return false if it is passed a non-disclaimer page',function() {
            let body = fs.readFileSync('./test/data/list_of_products_in_category.html', "utf8")
            aviso = ficha_aviso.isTargetContent(body)
            expect(aviso).to.be.false
        })

    })
})