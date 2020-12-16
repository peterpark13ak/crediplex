class ProductUtils{
   camelize (str) {
    return str.replace(/\w\S*/g, function(txt){
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
    }

  cleanName(name){
    name = name.replace(", S.A. de C.V.", "")
    name = name.replace(", S.A.P.I. de C.V.", "")
    name = name.replace(", SOFOM","")
    name = name.replace(", E.N.R.","")
    return name
  }
  getPhones(product){
    let result = []
    let phones =  product.lender.phone.split(/\s{2,}/)

    for(let phone of phones){
      let display_phone = phone.trim()
      let dial_phone= phone.replace(/\D/g,'');
      result.push({display:display_phone, dial:dial_phone})
    }
    return result
  }
  formatMoney(n, c, d, t) {
    c = isNaN(c = Math.abs(c)) ? 2 : c
    d = d === undefined ? "." : d
    t = t === undefined ? "," : t
    let s = n < 0 ? "-" : ""
    let i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c)))
    let j = (i.length) > 3 ? i.length % 3 : 0
  
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
  };
  listFormat(arrlist){
    if (!Array.isArray(arrlist)){
      throw new Error("listFormat parameter must be an array.")
    }
    if( arrlist.length === 1){
      return arrlist[0]
    }
    else{
      let last = arrlist.pop()
      return arrlist.join(', ') +` o ${last}`
    }
    // return "not possible"
  }  
  writtenNumber(num){
    let written = ['uno', 'dos', 'tres','cuatro', 'cinco', 'seis', 'siete','ocho','nueve','diez','once','doce', 'trece', 'catorce','quince','dieciséis',
    'diecisiete','dieciocho','diecinueve',
    'veinte','veintiuno','veintidós','veintitrés','veinticuatro','veinticinco','veintiséis','veintisiete','veintiocho','veintinueve',
    'treinta','treinta y uno','treinta y dos','treinta y tres','treinta y cuatro','treinta y cinco','treinta y sies','treinta y siete','treinta y ocho','treinta y nueve','cuarenta']
    if (num <= written.length){
      return written[num - 1]
    }
    return num
  }
}


export default ProductUtils