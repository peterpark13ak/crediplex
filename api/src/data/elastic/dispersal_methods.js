var crypto = require('crypto');
const es_client = require('./client')

const index_name = 'dispersal_methods'
const type = index_name

module.exports = {
    createId:function(dispersal_method_data){
        var data = JSON.stringify(dispersal_method_data)

        return crypto.createHash('md5').update(data).digest("hex")
    },
    validate: function(dispersal_method_data){
        if (dispersal_method_data == undefined || dispersal_method_data == null) {
            throw new Error('Cannot save null or undefined Dispersal Method')
        }
        if (Object.keys(dispersal_method_data).length == 0 ) {
            throw new Error('Cannot save empty Pay Preiod object')
        }
        if (dispersal_method_data.name == undefined || dispersal_method_data.name == null) {
            throw new Error('Cannot save Dispersal Method without name')
        }
    },
    save:async function(dispersal_method_data){
        this.validate(dispersal_method_data)
        var id = this.createId(dispersal_method_data)
        let put_command = {
            index:  index_name,
            type:   type,
            id:     id,
            body:   dispersal_method_data
        }          
        var result = await es_client.index(put_command);      
        return result
    },
    saveAll: async function(dispersal_method_array){
        var self = this, id = 0 , response, responses =[]
        for (dispersal_method_data of dispersal_method_array){
            response = await self.save(dispersal_method_data)
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

