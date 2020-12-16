import React, { Component } from 'react';
import LenderListItems from './LenderListItems'
import {withRouter } from 'react-router-dom'
import {Helmet} from "react-helmet";
import client from '../../utils/client'
import Grid from '@material-ui/core/Grid'
import TablePagination from '@material-ui/core/TablePagination';

class LenderList extends Component {
  _isMounted = false
  state = {
    lenders:[],
    currentPage: 0,
    pageSize: 24
  }
  cleanName(name){
    name = name.replace(", S.A. de C.V.", "")
    name = name.replace(", S.A.P.I. de C.V.", "")
    name = name.replace(", SOFOM","")
    name = name.replace(", E.N.R.","")
    return name
  }
  getSlug(title){
    if(title){
      title = this.cleanName(title)
      // remove spaces and replace with dashes      
      title = title.replace(/[\s+]/g, '-').toLowerCase()
      // Remove accents from letters
      title = title.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
      // remove non alapha numeric chars.  Also allow - and _
      title = title.replace(/[^a-zA-Z0-9-_]/g, '');
      title = encodeURIComponent(title)    
      return title  
    }
      
    return ""
  }
  constructor(props){
      super(props)
      this.loadData = this.loadData.bind(this)
  }
  async componentDidMount(){
    this._isMounted = true;
    await this.loadData(this.props.estado)  
  }
  async loadData(estado){
    try{
      let lenders = await client.getLendersForArea(estado)
      if(this._isMounted){        
          this.setState({lenders:lenders.data})    
      }  
    }
    catch(e){
      console.log(e)
    }
  }
  handleChangePage = (ev, page) => {
    this.setState({ currentPage: page})
  }

  handlePageRowChange = (event) => {
    this.setState({ currentPage: 0, pageSize: event.target.value })
  }

  render() {
    const {baseurl} = this.props
    const {currentPage, pageSize, lenders} = this.state
    return (
      <div style={{color:'black',paddingTop:'20px'}}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Crediplex - Directorio de Préstamos en México</title>
          <link rel="canonical" href="http://crediplex.io/prestamos" />
          <meta name="description" content="Directorio de préstamos en cada estado de México. Presione el estado para ver una lista de prestamos y prestamistas en el estado."/>
        </Helmet>
        <div style={{minHeight: 500, width: '100%'}}>
          <Grid container spacing={8} justify="center">
            {lenders.slice(currentPage * pageSize, (currentPage + 1) * pageSize).map((cursor)=>{
                return (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={cursor.id}>
                    <LenderListItems baseurl={baseurl + this.getSlug(cursor.name) + '/'} data={cursor}/>
                  </Grid>
                )
              })
            }
          </Grid>
        </div>
        <div style={{float: 'right', right: 0}}>
          <table><tbody><tr>
            <TablePagination 
              colSpan={3}
              count={lenders.length}
              page={currentPage}
              rowsPerPage={pageSize}
              rowsPerPageOptions = {[12, 24, 36]}
              onChangePage = { this.handleChangePage }
              onChangeRowsPerPage = { this.handlePageRowChange }
            />
          </tr></tbody></table>
        </div>
      </div>
    );
  }
}

export default withRouter(LenderList);
