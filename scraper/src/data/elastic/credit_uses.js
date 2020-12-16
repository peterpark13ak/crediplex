var crypto = require('crypto');
const es_client = require('./client')

const index_name = 'credit_uses'
const type = index_name

module.exports = {
    createId:function(credit_use_data){
        var data = JSON.stringify(credit_use_data)

        return crypto.createHash('md5').update(data).digest("hex")
    },
    validate: function(credit_use_data){
        if (credit_use_data == undefined || credit_use_data == null) {
            throw new Error('Cannot save null or undefined Credit Use')
        }
        if (Object.keys(credit_use_data).length == 0 ) {
            throw new Error('Cannot save empty Credit Use object')
        }
        if (credit_use_data.name == undefined || credit_use_data.name == null) {
            throw new Error('Cannot save Credit Use without name')
        }
    },
    save:async function(credit_use_data){
        this.validate(credit_use_data)
        var id = this.createId(credit_use_data)
        let put_command = {
            index:  index_name,
            type:   type,
            id:     id,
            body:   credit_use_data
        }          
        var result = await es_client.index(put_command);      
        return result
    },
    saveAll: async function(credit_use_array){
        var self = this, id = 0 , response, responses =[]
        for (credit_use_data of credit_use_array){
            response = await self.save(credit_use_data)
            responses.push(response)
        }
        return responses  
    },
    get: async function(id){
        let get_command = {
            index:  index_name,
            type:   type,
            id:     id
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
            index:  index_name,
            type:   type,
            id:     id
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

