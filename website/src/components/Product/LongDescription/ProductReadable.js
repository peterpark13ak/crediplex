import utils from '../utils'
class ProductReadable   {
    constructor(product,second){
      this.product = Object.assign({},product);
      this.notproduct = second; 
      this.LenderName = this.LenderName.bind(this);
      this.utils = new utils()
      
    }
    LenderName(){
      if(this.product.lender.name){
        return this.utils.cleanName(this.product.lender.name)
      }
    }
    LoanName(){
      if (this.product.description.name){
        let name = this.product.description.name
        let result = this.utils.camelize(name)
        return result
      }
    }
    singularize(phrase, is_singular){
      if(!is_singular)
        return phrase
      if(phrase === 'Personas Físicas')
        return 'Presona Física'
      return phrase
    }
    ApplicantType(is_singular = false, article = 'y'){      
      if(this.product.requirements.applicant.type){
        let type = this.product.requirements.applicant.type
        if (type.length === 1){          
          return this.singularize(type[0], is_singular)
        }
        if(type.length===2){
          return `${type[0]} ${article} ${type[1]}`
        }
      }
    }
    LoanCategory(){
      if (this.product.category_name){
        return this.product.category_name.toLowerCase()
      }
    }
    LenderHomeState(){
      if(this.product.lender.detail && this.product.lender.detail.addresses && this.product.lender.detail.addresses.length > 0){
        return this.product.lender.detail.addresses[0].federal_entity
      }
    }
    RequiredTimeInJob(){
      let requirements = this.product.requirements
      if(requirements.applicant.time_in_job && requirements.applicant.time_in_job.value > 0){
        let timeInJob = requirements.applicant.time_in_job
        return `${timeInJob.value} ${timeInJob.units}`
      }
    }

    coverage_area_description(){
      return this.CoverageAreaDescription() 
    }
    CoverageAreaDescription(){
      if(this.product.details.coverage_area){
        let areas = this.product.details.coverage_area 
        if(areas.length === 1){
          return areas[0]
        }
        if(areas.length <= 4 ){
          let last = areas.pop()
          return  `${areas.join(', ')} y ${last}`
        }
        if(areas >= 4){
          return `varias estados incluso ${areas.pop()}`
        }
      }
    }
    AgeRequirement(article){
      if(article === undefined)
        article = 'a'
      if(this.product.requirements.applicant.age){
        let age = this.product.requirements.applicant.age        
        return `${age.from_year} años ${article} ${age.to_year} años`        
      }
    }
    payment_plan_type_description(){
      if(this.product.details.payment_plan_type && this.product.details.payment_plan_type.length > 0){
        let payment_plan_type = this.product.details.payment_plan_type
        let result = this.utils.listFormat(payment_plan_type)
        return result
      }
      return "not defined for some reason"
    }
    pay_period_description(){
        if(this.product.details.pay_period && this.product.details.pay_period.length > 0){
          let pay_period = this.product.details.pay_period
          return this.utils.listFormat(pay_period)
        }
    }
    min_monthly_income(){
      if(this.product.requirements.applicant.min_monthly_income){
        let value = this.product.requirements.applicant.min_monthly_income        
        return this.utils.formatMoney(value)
      }
    }   
    max_interest_rate(){
      let max = this.product.details.max_annual_interest
      if(max){
        return `${max}%`
      }
    }
    interest_type_description(){
      let type = this.product.details.interest_type
      return this.utils.listFormat(type)
    }
    loan_term_display(){
      let term = this.product.details.term
      if(term){
        let from = this.utils.writtenNumber(term.from)
        let to = this.utils.writtenNumber(term.to)
        return `${from} y ${to} ${term.units}`
      }
    }
    destino_de_credito(){
      if(this.product.details.credit_use){
        return this.utils.listFormat(this.product.details.credit_use)
      }
    }
    minimum_amount(){
      let min_amount = this.product.details.min_amount
      if(min_amount){
        return this.utils.formatMoney(min_amount)
      }
    }
    TimeInJob(){
        return this.RequiredTimeInJob()
    }
    MinMonthlyIncome(){
      return this.min_monthly_income()
    }
    RequiresCreditCheck(){
      if(this.product.requirements.applicant.credit_check)
        return "verificación de crédito"
    }
    RequirementList(){
      let age = this.AgeRequirement('y')
      if(age)
        age = `<li>El solicitante debe tener edad entre ${age}</li>`
      let min_income = this.MinMonthlyIncome()
      if(min_income)
        min_income = `<li>Un ingreso mínimo mensual de ${min_income}</li>`

      let time_in_job = `<li>Una antigüedad laboral de ${this.RequiredTimeInJob()} mínimo</li>`
      let applicant_type = this.ApplicantType(true, 'o')
      if(applicant_type)
        applicant_type = `<li>El solictanted debe ser una ${applicant_type}`
      
      let restrictions = this.product.restrictions
      let r_html = ""
      if(restrictions){
        for(let r of restrictions){
          r_html = r_html + `<li>${r}</li>`
        }
      }
      return `<ul>${age}${min_income}${time_in_job}${applicant_type}${restrictions}${r_html}  </ul>`
    }
    DocumentationList(){
      if(!this.product.requirements.documents)
        return
      let docs = this.product.requirements.documents
      let id = docs.id
      let id_html = ""
      if(id  && id.length > 0){
        let last = id.pop()
        if(id.length > 0 )
          id = id.join(", ")+ " o "
        id = id  + last
        id_html = `<li>Documentos de identidad:  ${id}</li>`
      }
      let address = false
      try{  
         address = JSON.parse(JSON.stringify(docs.proof_of_address))
      }
      catch(e){
        console.log('Cannot json parse docs.proof_of_address')
      }
      let address_html = ""
      if(address  && address.length > 0){
        let last = address.pop()
        if(address.length > 0 ) 
          address = address.join(", ") + " o "
        address = address  + last
        address_html = `<li>Comprobante de domicilio:  ${address}</li>`
      }
      let income 
      try{
        income = JSON.parse(JSON.stringify(docs.proof_of_income))
      }
      catch(e){
        // console.log(`Error parsing income: ${docs.proof_of_income}`)
      }
      
      let income_html = ""
      if(income  && income.length > 0){
        let last = income.pop()
        if(income.length > 0)
          income = income.join(", ") + " o "
        income = income  + last
        income_html = `<li>Comprobante de ingreso:  ${income}</li>`
      }


      return `<ul>${id_html}${address_html} ${income_html}</ul>`
    }

    FreeServicesDescription(){
      let free = JSON.parse(JSON.stringify(this.product.free_services))
      if(free && free.length > 0){
        let last = free.pop()
        if(free.length > 0)
          free = free.join(", ") + " o "
        free = free  + last
        return free
      }
    }
    AdvantageList(){
      let benefits 
      try{
        benefits = JSON.parse(JSON.stringify(this.product.scope_or_benefits))
      }
      catch(e){
        // console.log(`Error parsing income: ${docs.proof_of_income}`)
      }
      
      let html = ""
      if(benefits  && benefits.length > 0){
        html = benefits.join("</li><li>")
        html = `<ul><li>${html}</li></ul>`
      }
      return html
    }
  }


export default ProductReadable;