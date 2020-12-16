var crypto = require('crypto');
const es_client = require('./client')

const index_name = 'proof_of_income_docs'
const type = index_name

module.exports = {
    createId:function(proof_of_income_doc_data){
        var data = JSON.stringify(proof_of_income_doc_data)

        return crypto.createHash('md5').update(data).digest("hex")
    },
    validate: function(proof_of_income_doc_data){
        if (proof_of_income_doc_data == undefined || proof_of_income_doc_data == null) {
            throw new Error('Cannot save null or undefined Proof of Income Doc')
        }
        if (Object.keys(proof_of_income_doc_data).length == 0 ) {
            throw new Error('Cannot save empty Proof of Income Doc object')
        }
        if (proof_of_income_doc_data.name == undefined || proof_of_income_doc_data.name == null) {
            throw new Error('Cannot save Proof of Income Doc without name')
        }
    },
    save:async function(proof_of_income_doc_data){
        this.validate(proof_of_income_doc_data)
        var id = this.createId(proof_of_income_doc_data)
        let put_command = {
            index:  index_name,
            type:   type,
            id:     id,
            body:   proof_of_income_doc_data
        }          
        var result = await es_client.index(put_command);      
        return result
    },
    saveAll: async function(proof_of_income_doc_array){
        var self = this, id = 0 , response, responses =[]
        for (proof_of_income_doc_data of proof_of_income_doc_array){
            response = await self.save(proof_of_income_doc_data)
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

