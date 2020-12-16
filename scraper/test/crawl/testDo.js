const doCrawl            = require('../../src/scrape/crawl/do')

describe('#doCrawl',function(){
    describe('#getAsync', function(){
        it('Get contents of url', (done)=> {
            doCrawl.updateProducts(69,19).then(function(result){
                // console.log(JSON.stringify(result,null, 4))    
                console.log(result)
                done()            
            })
            .catch(function(err){
                // There was a problem
                console.log(err)
            })            
        })
    })
})