var crypto = require('crypto');
const es_client = require('./client')

const index_name = 'applicant_types'
const type = index_name

module.exports = {
    createId:function(applicant_type_data){
        var data = JSON.stringify(applicant_type_data)

        return crypto.createHash('md5').update(data).digest("hex")
    },
    validate: function(applicant_type_data){
        if (applicant_type_data == undefined || applicant_type_data == null) {
            throw new Error('Cannot save null or undefined Applicant Type')
        }
        if (Object.keys(applicant_type_data).length == 0 ) {
            throw new Error('Cannot save empty Applicant Type object')
        }
        if (applicant_type_data.name == undefined || applicant_type_data.name == null) {
            throw new Error('Cannot save Applicant Type without name')
        }
    },
    save:async function(applicant_type_data){
        this.validate(applicant_type_data)
        var id = this.createId(applicant_type_data)
        let put_command = {
            index:  index_name,
            type:   type,
            id:     id,
            body:   applicant_type_data
        }          
        var result = await es_client.index(put_command);      
        return result
    },
    saveAll: async function(applicant_type_array){
        var self = this, id = 0 , response, responses =[]
        for (applicant_type_data of applicant_type_array){
            response = await self.save(applicant_type_data)
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

