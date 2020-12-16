const category = require('./category')



module.exports = {
    crawl:function(categories){
        let promises = []

        categories.forEach(function(cat){
            let updated_cat = category.crawl(cat)
                .then(function(products){
                    return {
                        id: cat.id,
                        name: cat.name,
                        products:products
                    }
                })
            promises.push(updated_cat)
        })
        return Promise.all(promises)                           
    } 
}

