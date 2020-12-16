import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {withRouter} from 'react-router-dom'

class Pager extends Component {
  constructor(props){
    super(props)

    let itemsPerPage = 10
    this.state = {
      total: props.total,
      pages: 5,
      current: props.current,
      limit: itemsPerPage,
    
    }
    this.getBaseUrl      = this.getBaseUrl.bind(this)
  }
  getBaseUrl(){
    let props = this.props    
    let base = props.match.url.split("/page/")[0]
    return base.replace(/\/$/,"")  // Remove trailing / if it exists  
  }
  componentWillReceiveProps(props){   
    let page_split_ar = props.history.location.pathname.split('page/');
    let current = 1
    if(page_split_ar.length === 2){
      current = parseInt(page_split_ar[1])
    } 

    current= Math.max(1,current)
    this.setState({total:props.total,current:current})
  }
 
  render() {
    let pages = Math.ceil(this.props.total/10)
    if (pages === 1 ){
      return <ul></ul>
    }
    let page_ar = []
    for (var i =0; i < pages; i++){
      page_ar.push(<li key={i+1} style={{display:'inline-block',padding:'5px', border:'1px grey solid'}}><Link to={`${this.getBaseUrl()}/page/${i+1}`}>{i+1}</Link></li>)
    }
    return <ul style={{display:'inline'}}>
    {/* <li  style={{display:'inline-block',padding:'5px', border:'1px grey solid'}}>
     <Link to={this.getBaseUrl()+"/page/1"}>
      First
      </Link>
    </li>       */}
      {page_ar}
    {/* <li  style={{display:'inline-block',padding:'5px', border:'1px grey solid'}}>
      <Link to={this.getBaseUrl()+"/page/"+pages}>
      Last
      </Link>

    </li> */}
  </ul>
  }
}

export default withRouter(Pager);
