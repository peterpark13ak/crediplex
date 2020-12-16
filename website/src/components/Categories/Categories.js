import React, { Component } from 'react';
import CategoryCard from './CategoryCard'
import Grid from '@material-ui/core/Grid'
import TablePagination from '@material-ui/core/TablePagination';

class Categories extends Component {

  state = {
    currentPage: 0,
    pageSize: 24
  }

  handleChangePage = (ev, page) => {
    this.setState({ currentPage: page})
  }

  handlePageRowChange = (event) => {
    this.setState({ currentPage: 0, pageSize: event.target.value })
  }

  render() {
    let title = this.props.categories.title
    let baseurl = this.props.baseurl
    const {currentPage, pageSize} = this.state
     return (
      <React.Fragment>
        <div style={{minHeight: 700, width: '100%'}}>
          <Grid container spacing={8} justify="center">
            {this.props.categories.list.slice(currentPage * pageSize, (currentPage + 1) * pageSize).map((category)=>{
                return (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={category._id}>
                    <CategoryCard baseurl={baseurl} name={category.name} count={category.count} title={title}/>
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
              count={this.props.categories.list.length}
              page={currentPage}
              rowsPerPage={pageSize}
              rowsPerPageOptions = {[12, 24, 36]}
              onChangePage = { this.handleChangePage }
              onChangeRowsPerPage = { this.handlePageRowChange }
            />
          </tr></tbody></table>
        </div>
      </React.Fragment>
     ) 
  }
}

export default Categories;
