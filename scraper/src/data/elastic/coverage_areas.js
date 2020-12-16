var crypto = require('crypto');
const es_client = require('./client')


module.exports = {
    createId:function(ca){
        var data = JSON.stringify(ca)

        return crypto.createHash('md5').update(data).digest("hex")
    },
    validate: function(ca){
        if (ca == undefined || ca == null) {
            throw new Error('Cannot save null or undefined coverage area')
            return
        }
        if (Object.keys(ca).length == 0 ) {
            throw new Error('Cannot save empty coverage area object')
            return
        }
        if (ca.name == undefined || ca.name == null) {
            throw new Error('Cannot save coverage area without name')
            return
        }
    },
    save:async function(ca){
        this.validate(ca)
        var id = this.createId(ca)
        let put_command = {
            index:'coverage_areas',
            type:'coverage_area',
            id: id,
            body: ca
        }          
        var result = await es_client.index(put_command);      
        return result
    },
    saveAll: async function(coverage_areas_array){
        var self = this, id = 0 , response, responses =[]
        for (ca of coverage_areas_array){
            response = await self.save(ca)
            responses.push(response)
        }
        return responses  
    },
    get: async function(id){
        let get_command = {
            index:'coverage_areas',
            type:'coverage_area',
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
            index:'coverage_areas',
            type:'coverage_area',
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

