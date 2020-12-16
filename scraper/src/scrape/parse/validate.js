const Joi           = require('joi')


const validate = {
    product_schema: Joi.object().keys({
        "category": Joi.object().keys({
            "category_id":  Joi.number().integer().required(),
            "name": Joi.string().required()
        }),
        "subcategory":Joi.object().keys({
            "sub_category_id":Joi.number().integer().required(),
            "name": Joi.string().required()
        }),
        "updated_at": Joi.string().required(),
        "id": Joi.number().integer().required(),
        "lender_id": Joi.number().integer().required(),
        "category_id": Joi.number().integer().required(),
        "subcategory_id": Joi.number().integer().required(),
        "lender": Joi.object().keys({
            "logo": Joi.string().uri().required(),
            "name": Joi.string().required(),
            "short_name": Joi.string().required(),
            "sector":  Joi.string().required(),
            "website":  Joi.string().allow('').required(),
            "phone":  Joi.string().allow('').required(),
            "address":  Joi.string().required()
        }),
        "description": Joi.object().keys({
            "status": Joi.string().required(),
            "category": Joi.string().required(),
            "subproduct": Joi.string().required(),
            "name": Joi.string().required(),
            "contrato_adhesion": Joi.boolean().required(),
            "RECA": Joi.string().required(),
            "contrato_multiple": Joi.boolean().required()
        }),
        "details": Joi.object().keys({
            "term": Joi.object().keys({
                "from": Joi.number().integer().required(),
                "to": Joi.number().integer().required(),
                "units": Joi.string().required(),
                "from_days":Joi.number().integer().required(),
                "to_days":Joi.number().integer().required(),
                
            }),
            "min_amount": Joi.number().integer().required(),
            "min_payment": Joi.number().integer(),
            "pay_period": Joi.array().items(Joi.string()),
            "dispersal_method": Joi.array().items(Joi.string()),
            "max_annual_interest": Joi.number(),
            "coverage_area": Joi.array().items(Joi.string()),
            "payment_plan_type": Joi.array().items(Joi.string()),
            "interest_type": Joi.array().items(Joi.string()),
            "credit_use": Joi.array().items(Joi.string()),
        }),
        "requirements": {
            "applicant": {
                "age": {
                    "from_year": Joi.number().integer().required(),
                    "from_month": Joi.number().integer().required(),
                    "to_year": Joi.number().integer().required(),
                    "to_month": Joi.number().integer().required()
                },
                "type": Joi.array().items(Joi.string()),
                "time_in_job": Joi.object().keys({
                    value: Joi.number().integer().required(),
                    units:Joi.string().required()
                }),
                "min_monthly_income": Joi.number().integer().required(),
                "credit_check": Joi.boolean(),
            },
        "documents": Joi.object().keys({
            "id": Joi.array().items(Joi.string()),
            "proof_of_address": Joi.array().items(Joi.string()),
            "proof_of_income": Joi.array().items(Joi.string()),
            })
        },
        "commissions": Joi.array().items(),

        "contract_costs": Joi.array(),
        "free_services": Joi.array(),
        "scope_or_benefits": Joi.array(),
        "restrictions": Joi.array().items(Joi.string()),
    }),
    cost_schema: Joi.object().keys({
        "concept": Joi.string().required(),
        "is_free": Joi.boolean().required(),
        "free_ops": Joi.object().keys({
            "number": Joi.string().required(),
            "period": Joi.string().required(),
        }),
        "cost": Joi.object().keys({
            "currency": Joi.string().required(),
            "fixed_amount": Joi.string().required(),
            "factor": Joi.string().required(),
            "factor_amount": Joi.string().required(),
            "factor_reference": Joi.string().required(),
            "period": Joi.string().required()
        }),
        "cond": Joi.string().required(),
    }),
    product: function(product){
        return Joi.validate(product, this.product_schema)
    }
}

module.exports = validate