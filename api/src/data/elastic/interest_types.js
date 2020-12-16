var crypto = require('crypto');
const es_client = require('./client')

const index_name = 'interest_types'
const type = index_name

module.exports = {
    createId:function(interest_type_data){
        var data = JSON.stringify(interest_type_data)

        return crypto.createHash('md5').update(data).digest("hex")
    },
    validate: function(interest_type_data){
        if (interest_type_data == undefined || interest_type_data == null) {
            throw new Error('Cannot save null or undefined Interest Type')
        }
        if (Object.keys(interest_type_data).length == 0 ) {
            throw new Error('Cannot save empty Interest Type object')
        }
        if (interest_type_data.name == undefined || interest_type_data.name == null) {
            throw new Error('Cannot save Interest Type without name')
        }
    },
    save:async function(interest_type_data){
        this.validate(interest_type_data)
        var id = this.createId(interest_type_data)
        let put_command = {
            index:  index_name,
            type:   type,
            id:     id,
            body:   interest_type_data
        }          
        var result = await es_client.index(put_command);      
        return result
    },
    saveAll: async function(interest_type_array){
        var self = this, id = 0 , response, responses =[]
        for (interest_type_data of interest_type_array){
            response = await self.save(interest_type_data)
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

