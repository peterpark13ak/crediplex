import hash from 'object-hash'

class Graphs   {
  // dao_object is something like product or Lender data object
  constructor(parag, readable){
    this.parag = parag
    this.readable = readable
  }
  // for_id is ID of entity paragraph will be rendered for
  // for_id ensures each entity consistently gets same set of psuedo-randomly chosen sentences in the paragraph
  render = (for_id) => {
      let  sentences = this.selectSentences(for_id, this.parag)
      let paragraph = ""
      for( let s of sentences){
        paragraph = paragraph + s.statement +" "
      }
      return this.setVariablValues(paragraph)
  }
  getMethods(){
    // let methods = []      
    return  Reflect.getPrototypeOf(this.readable)

  }
  hasMethod(name){
    return this.getMethods().includes(name)
  }
  setVariablValues = (paragraph) => {    
      let methods = this.getMethods()
      for( let method of  Object.getOwnPropertyNames(methods)){
        // Skip constructor or it will recreate object and break
        if (method === 'constructor') continue;     
        let token = `{{${method}}}`

        let func = methods[method]
        let value = Reflect.apply(func,this.readable,[])

        if(value !== undefined)
            paragraph = paragraph.replace(new RegExp(token, 'g'), value);
      }
      return paragraph
  }
  // Returns all keys, including nested, as string.  If nested will return path using dot as separator    
  getDaoKeys(){
    return this.objectKeys(this.dao_object)
  }
  getDaoValue(key){
    return this.getValue(this.dao_object,key)
  }
  getValue(object,key_path){
    let keys = key_path.split(".")
    let value = object
    for(let key of keys){
      value = value[key]
    }
    return value
  }
  objectKeys(object, prefix = [], last_key){
    prefix= prefix.slice(0);
    if(last_key){
      prefix.push(last_key)
    }
    let keys = []
    for (let key of Object.keys(object)){
      
      let value = object[key]
      if(typeof value === 'object' && value !== null){          
        keys = keys.concat(this.objectKeys(value, prefix, key))
      }
      prefix.push(key)
      keys.push(prefix.join('.'))        
      prefix.pop()
    }

    return keys
  }
  selectSentences = (for_id, graph_obj) =>{
    let sentence_count = this.getLength(graph_obj)
    let sentences = []
    for (let i = 1; i <= sentence_count; i++){
        sentences.push(this.getSentenceFor(for_id,graph_obj, i))
    }
    return sentences
  }
  getLength = (graph_obj) =>{
    let length = 0
    for (let s of graph_obj.sentences){
        length = Math.max(length, s.position)
    }
    return length
  }
  getSentenceOptions = (position, graph) => {
    var options = []
    for (let sentence of this.parag.sentences){
      if (sentence.position === position){
        options.push(sentence)
      }
    }
    return options
  }

  // Goal: Select sentence in a way that:
  //  - A) Is stable for a given Entity ID.  So that a product for example always select same sentence given options
  //  - B) Selection of first sentence is independent of selection of subsequent sentences.  To generate more variety 
  //       we don't want selection of sentences to be correlated 
  //   To achieve this we create a hash of entity_id and options parameters.  This will generate a random number 
  //   for each pairing of an entity and a set of sentence options.  
  //   We take the modulus of the hashed value and the number of options for the sentence.
  //   The result is the index in the sentence options array of our selected sentence.
  // Args: 
  //        options: an array of sentences to select from
  //        entity_id: id of the entity (product, lender) that the sentence is going to be used with.
  selectSentence = (entity_id, options) => {
    if (options.length === 0 ){
      return null
    }
    let digest = hash([entity_id, options])  
    // take only first five digits because precision can be lost with large number
    // that leads to modulus often returning 0
    digest = digest.substr(0,5) 
    let int_digest = parseInt(digest,16)

    let selection = int_digest  % options.length
    return options[selection]
  }

  getSentenceFor = (entity_id, parag, position) =>{
    let options = this.getSentenceOptions(position,parag)
    let sentence = this.selectSentence(entity_id, options)

    return sentence
  }
}


export default Graphs;
