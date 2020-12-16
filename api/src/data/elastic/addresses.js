var crypto = require('crypto');
const es_client = require('./client')


module.exports = {
    createId:function(id, address){
        var data = JSON.stringify({id:id, address:address})

        return crypto.createHash('md5').update(data).digest("hex")
    },
    saveAll: async function(addresses){
        var self = this, id = 0 , position = 0, response, responses =[]
        for (address of addresses){
            id = self.createId(position, address)
            response = await self.save(id, address)
            responses.push(response)
            position++
        }
        return responses
    },
    validate: function(address){
        if (address == undefined || address == null) {
            throw new Error('Cannot save null or undefined address')
            return
        }
        if (Object.keys(address).length == 0 ) {
            throw new Error('Cannot save empty address')
            return
        }
        if (address.lender_id == undefined || address.lender_id == null) {
            throw new Error('Cannot save address without lender_id')
            return
        }
    },
    save:async function(id, address){
        this.validate(address)

        let put_command = {
            index:'addresses',
            type:'address',
            id: id,
            body: address
        }          
        var result = await es_client.index(put_command);      
        return result
    },
    get: async function(id){
        let get_command = {
            index:'addresses',
            type:'address',
            id:id
        }
        
        try{
            let result = await es_client.get(get_command)

            return result
        }
        catch(err){
            if(err.status == 404)            
                return null
            throw err
        }
        
    },
    delete: async function(id){
        let delete_command = {
            index:'addresses',
            type:'address',
            id:id
        }
        try{
            let result = await es_client.delete(delete_command)

            return result
        }
        catch(err){
            if(err.status == 404)            
                return false
            throw err
        }
        
    }

}

