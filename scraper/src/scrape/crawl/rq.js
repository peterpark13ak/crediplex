// Makes requests and encodes results correctly.
const rp = require('request-promise')
const encoding = require('encoding')
const {promisify} = require('util');
const redis = require('redis')
const hash = require('object-hash');


const redis_get = (key) => {
    let error = false
    const client = redis.createClient({ port: 6379, host: 'redis'});
    client.on('error', function(e){
        console.log(e)
        return null
    })
    const get = promisify(client.get).bind(client);
    const pr = get(key)
    return pr.then((result)=>{
        client.quit()
        return result
    })
    .catch(function(e){
        return null
    })       
}
const redis_set = (key, value)=>{
    try{        
        const client = redis.createClient({ port: 6379, host: 'redis'});
        const set = promisify(client.set).bind(client);
        return set(key, value).then((result)=>{
            client.quit()
            return result
        })
        .error(function(e){
            return null
        })

    }
    catch(e){
        return null
    }
}

module.exports = {
    throttle : {
        waiting_requests: 0,
        interval_ms: 1000,
        concurrent_max:1
    },        
    quit: function(){
        client.quit()
    },
    sleep: function(ms){
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    get:async function(url,options){
            var throttle = this.throttle
            if(throttle.waiting_requests < throttle.concurrent_max){
                options = Object.assign({encoding:'latin1'}, options || {})
                throttle.waiting_requests++              

                var result =  rp.get(url,{ 
                    encoding: options.encoding,
                    transform:function(body){
                        // return body
                        var buf  = encoding.convert(body, 'latin1', options.encoding)
                        return buf.toString('latin1')
                    } })
                    .catch(function(err){
                        return new Promise((res,rej)=>{res(undefined)})
                    })
                    .then(function(result){
                        throttle.waiting_requests--
                        return result
                    })
                    
                return result
            }
            else{               
                await this.sleep(throttle.interval_ms*throttle.waiting_requests)
                return this.get(url,options)
            }                   
    },
    getCached: async function(url,options){
        const data = {url: url, options: options}
        const key = hash(data);
        let html = await redis_get(key)
        if(html){
            // console.log('Cache hit...')
           return html
        }
        // console.log('Cache miss... ')
                
        html = await this.get(url, options)
        if(html !== undefined){
            success = await redis_set(key, html)
        }        
        return html
    },
    postCached: async function(options){
        const key = hash(options)
        let html = await redis_get(key)
        if(html){
            console.log('Cache hit...')

           return html
        }
        console.log('Cache miss...')

        html = await this.post(options)
        if( !html === undefined){
            success = await redis_set(key, html)
        }

        return html
    },
    post: function (options){
        try{
            options.encoding = 'latin1'
            options.transform = function(body){
                return body
            }
            return rp.post(options)    
        }
        catch(err){
            console.log('ERROR POSTING with: ' +JSON.stringify(options))
            return undefined
        }
    },
    

}

