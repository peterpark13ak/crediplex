import axios from 'axios'

let host = "http://localhost:9090" 
if (process.env.NODE_ENV === 'production'){
     host = "https://ve2vshh5r2.execute-api.us-east-1.amazonaws.com/prod"
}
// console.log(host)
const client = {
    async search(params){
        if (params === undefined)
            return []
        return axios.get(`${host}/prod/products/?desired_loan_amount=${params.amount}&monthly_income=${params.monthly_income}&coverage_area=${params.state}&term_length=20`)
    },
    
    async sendContactUs(data){
        if(data === undefined)
            return false
        await axios.post(`${host}/prod/contact-us`, data)
        return true
    },
    async getCoverageAreas(){
        return  axios.get(`${host}/coverage_areas`)
    },
    async getProductsForArea(estado){
        return  axios.get(`${host}/products/area/${estado}`)
    },
    async getProductById(id){
        return axios.get(`${host}/products/${id}`)
    },
    async getProductsLike(id){
        return axios.get(`${host}/products/more-like/${id}`)
    },
    async getLenderById(id){
        return axios.get(`${host}/lenders/${id}`)
    },
    async getLendersForArea(estado){
        return  axios.get(`${host}/lenders/area/${estado}`)
    },
    async getSimilarLenders(id){
        return  axios.get(`${host}/lenders/${id}/morelike`)
    }
}
export default client