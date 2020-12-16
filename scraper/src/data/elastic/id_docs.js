var crypto = require('crypto');
const es_client = require('./client')

const index_name = 'id_docs'
const type = index_name

module.exports = {
    createId:function(id_doc_data){
        var data = JSON.stringify(id_doc_data)

        return crypto.createHash('md5').update(data).digest("hex")
    },
    validate: function(id_doc_data){
        if (id_doc_data == undefined || id_doc_data == null) {
            throw new Error('Cannot save null or undefined ID Doc')
        }
        if (Object.keys(id_doc_data).length == 0 ) {
            throw new Error('Cannot save empty ID Doc object')
        }
        if (id_doc_data.name == undefined || id_doc_data.name == null) {
            throw new Error('Cannot save ID Doc without name')
        }
    },
    save:async function(id_doc_data){
        this.validate(id_doc_data)
        var id = this.createId(id_doc_data)
        let put_command = {
            index:  index_name,
            type:   type,
            id:     id,
            body:   id_doc_data
        }          
        var result = await es_client.index(put_command);      
        return result
    },
    saveAll: async function(id_doc_array){
        var self = this, id = 0 , response, responses =[]
        for (id_doc_data of id_doc_array){
            response = await self.save(id_doc_data)
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

