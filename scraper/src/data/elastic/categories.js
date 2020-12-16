var crypto = require('crypto');
const es_client = require('./client')


module.exports = {
    validate: function(category){
        if (category == undefined || category == null) {
            throw new Error('Cannot save null or undefined coverage area')
            return
        }
        if (Object.keys(category).length == 0 ) {
            throw new Error('Cannot save empty Category object')
            return
        }
        if (category.name == undefined || category.name == null) {
            throw new Error('Cannot save Category without name')
            return
        }
        if (category.id == undefined || category.id == null) {
            throw new Error('Cannot save Category without id')
            return
        }
    },
    save:async function(category){
        this.validate(category)
        let put_command = {
            index:'categories',
            type:'categories',
            id: category.id,
            body: category
        }          
        var result = await es_client.index(put_command);      
        return result
    },
    saveAll: async function(category_array){
        var self = this, id = 0 , response, responses =[]
        for (cat of category_array){
            response = await self.save(cat)
            responses.push(response)
        }
        return responses  
    },    
    get: async function(id){
        let get_command = {
            index:'categories',
            type:'categories',
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
            index:'categories',
            type:'categories',
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

