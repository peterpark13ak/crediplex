import React, { Component } from 'react';
import Categories from '../../components/Categories'
import {withRouter } from 'react-router-dom'
import {Helmet} from "react-helmet";

class Directory extends Component {
  state= {
    loaded_data:false,
    products:[]
  }
  render() {
    return (
      <div style={{color:'black',paddingTop:'20px'}}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Crediplex - Directorio de Préstamos en México</title>
          <link rel="canonical" href="http://crediplex.io/prestamos" />
          <meta name="description" content="Directorio de préstamos en cada estado de México. Presione el estado para ver una lista de prestamos y prestamistas en el estado."/>
        </Helmet>
        <Categories categories={this.props.categories} baseurl={this.props.baseurl} />
      </div>
    );
  }
}

export default withRouter(Directory);
