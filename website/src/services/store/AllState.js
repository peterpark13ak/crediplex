
import { decorate,observable, computed } from 'mobx';



 
class State  {
    path = '/'
    search =   {
        amount:'',
        term:-1,
        state:-1,
        monthly_income:'',
        loan_purpose:'',
    }
    get searchString(){
        return this.path +"/"+ JSON.stringify(this.search)
    }   
}
decorate(State,{
    path: observable,
    search: observable,
    searchString: computed
})

export default State;
