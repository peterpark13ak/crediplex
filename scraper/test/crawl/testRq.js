const expect        = require('chai').expect
const rq            = require('../../src/scrape/crawl/rq')

describe('#rq',function(){
    describe('#start', function(){
        it('Get from cache if it has encountered url before', function() {
            return rq.get('http://cnn.com',{}).then(function(result){
                // console.log(result)
            })
            rq.getCached('http://cnn.com',{}).then(function(result){console.log(result)}) 
        })
    })
})