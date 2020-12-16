import React from 'react';

let graphs = {
    get: (PARAMS)=>{
        let paragraphs = {
            intro: [],
            addresses:[],
            contact:[]
        }
        paragraphs.intro = <p>
            {PARAMS.COMPANY_NAME} opera en el sector de  {PARAMS.SECTOR} supervisada por el CONDUSEF.  La empresa se establecio en {PARAMS.START_DATE}.  Otorga prestamos a personas fisicas y morales, y su actividad principal es {PARAMS.MAIN_ACTIVITY}.
            Los presamos que otorga prestamos son disponibles en {PARAMS.COVERAGE_AREA_LIST}. 
        </p>

paragraphs.addresses = <p>
            {PARAMS.COMPANY_NAME} tiene sucursales en {PARAMS.ADDRESS_STATE_LIST}. Consulta la lista de direcciones abajo para mas informacion.                    
        </p>        

paragraphs.contact = <p>
                    Para mayor informacion visita el sitio web de {PARAMS.COMPANY_NAME}, en {PARAMS.COMPANY_WEBSITE_URL}.  
                    O mande un correo electronico a su direccion: {PARAMS.COMPANY_EMAIL}
                </p>
        
        return <div >{paragraphs.intro} {paragraphs.addresses} {paragraphs.contact}</div>
    }
}    
export  default  graphs  
 
