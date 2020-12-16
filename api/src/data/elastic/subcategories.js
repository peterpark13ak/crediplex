var crypto = require('crypto');
const es_client = require('./client')

const index_name = 'subcategories'
const type = index_name

module.exports = {
    validate: function(subcategory){
        if (subcategory == undefined || subcategory == null) {
            throw new Error('Cannot save null or undefined coverage area')
            return
        }
        if (Object.keys(subcategory).length == 0 ) {
            throw new Error('Cannot save empty subcategory object')
            return
        }
        if (subcategory.name == undefined || subcategory.name == null) {
            throw new Error('Cannot save subcategory without name')
            return
        }
        if (subcategory.id == undefined || subcategory.id == null) {
            throw new Error('Cannot save subcategory without id')
            return
        }
    },
    save:async function(subcategory){
        this.validate(subcategory)
        let put_command = {
            index:index_name,
            type: type,
            id: subcategory.id,
            body: subcategory
        }          
        var result = await es_client.index(put_command);      
        return result
    },
    // TODO: Add SaveAll Method and testing for it.
    saveAll: async function(subcategory_array){
        var self = this, id = 0 , response, responses =[]
        for (subcat of subcategory_array){
            response = await self.save(subcat)
            responses.push(response)
        }
        return responses  
    },    
    get: async function(id){
        let get_command = {
            index: index_name,
            type: type,
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
            index: index_name,
            type: type,
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

