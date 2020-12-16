const expect    = require('chai').expect
const fs        = require('fs')
const product_categories   = require('../../src/scrape/parse/product_categories')

describe('#ProductCategories',function(){
    describe('#scrape', function(){
        it('should scrape product categories html content and pars it into structured json',function() {
            let body = fs.readFileSync('./test/data/list_of_product_categories_for_lender.html', "utf8")
            let categories = product_categories.scrape(body)
             console.log(categories)
            expect(categories[0].products_link).to.equal('https://ifit.condusef.gob.mx/ifit/ftb_vista_institucion.php?idp=8&producto=8&idi=3078&ids=&ido=&idrt=16&idt=1&ida=2018&idp=')
            expect(categories[1].products_link).to.equal('https://ifit.condusef.gob.mx/ifit/ftb_vista_institucion.php?idp=10&producto=10&idi=3078&ids=&ido=&idrt=16&idt=1&ida=2018&idp=')
        })
    })
    describe('#isTargetContent', function(){
        it('should return true if body is a category page',function(){
            let body = fs.readFileSync('./test/data/list_of_product_categories_for_lender.html', "utf8")
            let is_categories_page = product_categories.isTargetContent(body)

            expect(is_categories_page).to.be.true
        })

        it('should return false if body is a product details page',function(){
            let body = fs.readFileSync('./test/data/list_of_products_in_category.html', "utf8")
            let is_categories_page = product_categories.isTargetContent(body)

            expect(is_categories_page).to.be.false
        })
    })
    describe('#isRedirect', function(){
        it('should return true if body is a category page',function(){
            let body = fs.readFileSync('./test/data/redirect_to_list_of_product_categories.html', "utf8")
            let is_redirect = product_categories.isRedirect(body)

            expect(is_redirect).to.be.true
        })
        it('should return true if body is a category page',function(){
            let body = fs.readFileSync('./test/data/list_of_product_categories_for_lender.html', "utf8")
            let is_redirect = product_categories.isRedirect(body)

            expect(is_redirect).to.be.false
        })        
    })
    describe('#getRedirectLink', function(){
        it('should return true if body is a category page',function(){
            let body = fs.readFileSync('./test/data/redirect_to_list_of_product_categories.html', "utf8")
            let redirect = product_categories.getRedirectLink(body)

            expect(redirect).to.equal('https://ifit.condusef.gob.mx/ifit/ftb_vista_institucion.php?idi=1864&ids=&idrt=16&idt=1&ida=2018')
        })
    })

})