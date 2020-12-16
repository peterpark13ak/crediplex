#!/usr/bin/env node

const program       = require('commander');
const buro          = require('../src/scrape/buro')
const db_lender     = require('../src/data/elastic/lender')
// const parse         = require('../src/scrape/parse/parse')
// const rq            = require('./src/scrape/crawl/rq')
// const validate      = require('../src/scrape/parse/validate')
// const db_product  = require('../data/elastic/products')

program
  .version('1.0.0')
  .option('-s, --sector <sector>', 'Sector to crawl, i.e SOFOM_ENR')
  .option('-p, --period <period>', 'Period to crawl for, ie: "CURRENT", "LAST_YEAR"')
  .option('-r, --reg_status <reg_status>', 'Re, ie: "REGISTERED", "NOT_REGISTERED", "BOTH')
  .parse(process.argv);


async function run(){
  let urls =  buro.getSectorEntityUrl(program.sector,program.period,program.reg_status)
  const types  = Object.keys(urls)
  for (const type of types) {
    let url = urls[type]
    let contents = await buro.getSectorTableContents(url)
    let lenders = buro.getLendersFromSectorTable(contents, type)

    let count = {lenders:0,products:0}
    for(lender of lenders ){               
      count.lenders++      
      console.log(`Processing lender # ${count.lenders}:: ${lender.name}` )
      lender.addresses = await buro.getLenderAddresses(lender.address_link)
      lender.details = await buro.getLenderDetails(lender.lender_details_url)
      let product_meta_data = await buro.getProductLinks(lender.lender_product_link)
      lender.products = []
      
      for (meta of product_meta_data){
        let product = {}
        for(link of meta.links){
          product = await buro.getProductDetails(link.details_url)
          product.url               = link.details_url
          product.id                = parseInt(link.id)
          product.lender_id         = lender.id
          product.sub_product_name  = link.sub_product_name.trim()
          product.sub_product_id    = parseInt(link.sub_product_id)
          product.link_name         = link.name.trim()
          product.category_id       = parseInt(meta.category.id)
          product.category_name     = meta.category.name.trim()
          lender.products.push(product)
          // await sleep(100)
          count.products++          

        }
      }
      let result = await db_lender.save(lender)            
    }
  }
}
function sleep(ms){
  return new Promise(resolve=>{
      setTimeout(resolve,ms)
  })
}
run()

async function test(){
  let product_meta_data = await buro.getProductLinks('http://e-portalif.condusef.gob.mx/ifit/ftb_validaciones.php?idi=6127&ids=69&idt=1&ida=2015')
  console.log(product_meta_data)
} 
// test()