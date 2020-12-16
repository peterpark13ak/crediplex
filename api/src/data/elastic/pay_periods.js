var crypto = require('crypto');
const es_client = require('./client')

const index_name = 'pay_periods'
const type = index_name

module.exports = {
    createId:function(pay_period_data){
        var data = JSON.stringify(pay_period_data)

        return crypto.createHash('md5').update(data).digest("hex")
    },
    validate: function(pay_period_data){
        if (pay_period_data == undefined || pay_period_data == null) {
            throw new Error('Cannot save null or undefined Pay Period')
        }
        if (Object.keys(pay_period_data).length == 0 ) {
            throw new Error('Cannot save empty Pay Preiod object')
        }
        if (pay_period_data.name == undefined || pay_period_data.name == null) {
            throw new Error('Cannot save Pay Period without name')
        }
    },
    save:async function(pay_period_data){
        this.validate(pay_period_data)
        var id = this.createId(pay_period_data)
        let put_command = {
            index:  index_name,
            type:   type,
            id:     id,
            body:   pay_period_data
        }          
        var result = await es_client.index(put_command);      
        return result
    },
    saveAll: async function(pay_period_array){
        var self = this, id = 0 , response, responses =[]
        for (pay_period_data of pay_period_array){
            response = await self.save(pay_period_data)
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

