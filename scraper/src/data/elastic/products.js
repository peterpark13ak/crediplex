var crypto = require('crypto');
const es_client = require('./client')
const index_name = 'products'
const type = index_name



module.exports = {
    validate: function(product){

        if (product == undefined || product == null) {
            throw new Error('Cannot save null or undefined Product')
            return
        }
        if (Object.keys(product).length == 0 ) {
            throw new Error('Cannot save empty Product ')
            return
        }
        if (product.description.name == undefined || product.description.name == null) {
            throw new Error('Cannot save Product without name')
            return
        }
        if (product.id == undefined || product.id == null) {
            throw new Error('Cannot save Product without id')
            return
        }
        if (product.category_id == undefined || product.category_id == null) {
            throw new Error('Cannot save Product without category id')
            return
        }
        if (product.subcategory_id == undefined || product.subcategory_id == null) {
            throw new Error('Cannot save Product without subcategory id')
            return
        }
    },
    map: async function(){

    },
    save:async function(product){
        try{
            this.validate(product)
        }
        catch(e){
            console.log('product is invalid. url: ' + product.url)
            console.log(e)

        }
        let put_command = {
            index: index_name,
            type: type,
            id: product.id,
            body: product
        }          
        var result = await es_client.index(put_command);      
        return result
    },
    saveAll: async function(products){
        var self = this, id = 0 , response, responses =[]
        for (product of products){
            response = await self.save(product)
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

