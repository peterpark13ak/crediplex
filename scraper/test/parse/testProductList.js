const expect    = require('chai').expect
const fs        = require('fs')
const product_list   = require('../../src/scrape/parse/product_list')

describe('#product_list',function(){
    describe('#isTargetContent', function(){
        it('should return true if body is a category page that lists the products',function(){
            let body = fs.readFileSync('./test/data/list_of_products_in_category.html', "utf8")
            let products = product_list.isTargetContent(body)

            expect(products).to.be.true
        })

        it('should return false if body is a page that does not include product list',function(){
            let body = fs.readFileSync('./test/data/list_of_product_categories_for_lender.html', "utf8")
            let products = product_list.isTargetContent(body)

            expect(products).to.be.false
        })
    })      
    describe('#scrape', function(){
        it('should return array of products in category',function(){
            let body = fs.readFileSync('./test/data/list_of_products_in_category.html', "utf8")
            let products = product_list.scrape(body)
            // console.log(products)
        })

    })      
})