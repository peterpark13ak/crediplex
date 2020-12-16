import React, { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import SearchScreen from './screens/Search';
import SearchResults from './screens/ProductList'
import { BrowserRouter as Router, Route} from "react-router-dom";
import client from './utils/client'
import ProductScreen from './screens/Product'
// import HomeScreen from './screens/Home'
import ContactScreen from './screens/Contact'
import ContactReceived from './screens/ContactReceived'
import DirectoryScreen from './screens/Directory'
import LenderList from './screens/LenderList'
import LenderPage from './screens/LenderList/LenderPage.js'
import DirectoryItemScreen from './screens/Directory/DirectoryItems'
import {Helmet} from "react-helmet";
import tracker from './ga';


class App extends Component {
  state = {
    errors:null,
    products:[],
    product:{},
    directory_products:[]

  }  
  constructor(props){
    super(props)

    this.submitSearch = this.submitSearch.bind(this);
    // this.getProductById =  this.getProductById.bind(this)
    this.submitContact =  this.submitContact.bind(this)
    // this.handleSelectCategory = this.handleSelectCategory.bind(this)    
  }


  componentDidMount(){  
    let products = JSON.parse(localStorage.getItem('found-products'))
    if(products){
      this.setState({
        products:products
      })     
    }
  }
   getCards(){
     return 
  }
  async submitSearch(searchTerms){
    let products = []
    this.setState({
      searchData:searchTerms
    })
    let response = await client.search(searchTerms)
    if(response.data !== undefined){
      products = response.data.products   

    }
    localStorage.setItem('found-products', JSON.stringify(products))

    this.setState({
      products:products
    })    

  }
  async submitContact(data){
    await client.sendContactUs(data)    
  }  
  render() {
    // const Index = () => <HomeScreen handleSearch={this.submitSearch}  />
    const About = () => <h2 style={{color:"black"}} >About</h2>;
    const Users = () => <h2 style={{color:"black"}}>Users</h2>;
    const Search = ()=> <SearchScreen handleSearch={this.submitSearch}  />
    const Contact = ()=> <ContactScreen handleSubmit={this.submitContact}  />
    const Product = ({match}) => {
      return <ProductScreen key={match.params.prestamo_id} viewMode="detail" id={match.params.prestamo_id} />
    }
    const Lender = ({match}) => {
      return <LenderList estado = {match.params.estado} baseurl={"/financieras/"} />
    }
    const LenderItem = ({match}) => {
      return <LenderPage id = {match.params.id} baseurl={"/financieras/"} />
    }
    const ProductDirectory = () => {
      let categories =   {title:"Prestamos", list:[
        {
          "name": "Todos los Estados",
          "count":111,
          "_id": "c884df61d06209319576208053573ddf"
        },
        {
          "name": "Aguascalientes",
          "count":39,
          "_id": "5e168df7f695bd15a51b1fa1d43cffe2"
        },
        {
          "name": "Baja California",
          "count":39,
          "_id": "5675613fb96c694c3aa1df103ad8082f"
        },
        {
          "name": "Baja California Sur",
          "count":39,
          "_id": "52436cdbe35f508cfe92f7337cc91122"
        },
        {
          "name": "Campeche",
          "count":39,
          "_id": "b28daf698d02492631327a6e2509c142"
        },
        {
          "name": "Chiapas",
          "count":39,
          "_id": "52f10f103c05445c7bb847616bdfb2ce"
        },
        {
          "name": "Chihuahua",
          "count":39,
          "_id": "17dc03fc2bec1b541067d38dda209677"
        },
        {
          "name": "Coahuila",
          "count":39,
          "_id": "753c993354af1eb0158cac21a30b8461"
        },
        {
          "name": "Colima",
          "count":39,
          "_id": "7e29dcf53c00246b0106300b283c39fe"
        },
        {
          "name": "Distrito Federal",
          "count":39,
          "_id": "59931a53d4a75c6ddab0cee8fcc85d33"
        },
        {
          "name": "Durango",
          "count":39,
          "_id": "6858c6cb4ef881d3cc534b24b850ec55"
        },
        {
          "name": "Estado de México",
          "count":39,
          "_id": "ca5a2136e93b43dda9babe7357a7459d"
        },
        {
          "name": "Guerrero",
          "count":39,
          "_id": "10306c68325b9d69b21b9ebd8b53199e"
        },
        {
          "name": "Guanajuato",
          "count":39,
          "_id": "5886077499a34d96a4695959e81aa4a3"
        },
        {
          "name": "Hidalgo",
          "count":39,
          "_id": "87e3d41d3b194d0f420a862df4e9d459"
        },
        {
          "name": "Jalisco",
          "count":39,
          "_id": "0863d5ed9367ab1020d4c23b5fd1aae6"
        },
        {
          "name": "Michoacán",
          "count":39,
          "_id": "35b3a7d72ddd72ba1625ad4dce98a6f0"
        },
        {
          "name": "Morelos",
          "count":39,
          "_id": "3912cbeab477775cb91cc90a4d9f3c92"
        },
        {
          "name": "Nayarit",
          "count":39,
          "_id": "e061f30d33215bb2a373c205646479e8"
        },
        {
          "name": "Nuevo León",
          "count":39,
          "_id": "7c225d4093ffd01a299988e7daa526af"
        },
        {
          "name": "Oaxaca",
          "count":39,
          "_id": "1caccac1aa6300a1c99e130a72fab5e5"
        },
        {
          "name": "Puebla",
          "count":39,
          "_id": "00ad11eb964a48696150a844e9fb6e7f"
        },  
        {
          "name": "Querétaro",
          "count":39,
          "_id": "14f1d0626afe5272513c6001b1a4fad3"
        },
        {
          "name": "Quintana Roo",
          "count":39,
          "_id": "73ce3bccc97a3742b091147801310cbc"
        },
        {
          "name": "San Luis Potosí",
          "count":39,
          "_id": "06e539b7ef9b4df6ee1d839e58456ba7"
        },
        {
          "name": "Sinaloa",
          "count":39,
          "_id": "4ef3fde725e913323feb9cad1a7daa4d"
        },
        {
          "name": "Sonora",
          "count":39,
          "_id": "b107b4c6ca5da0698a2b142afed42669"
        },
        {
          "name": "Tabasco",
          "count":39,
          "_id": "132e643854836e43679970f9f3d8275c"
        },
        {
          "name": "Tamaulipas",
          "count":39,
          "_id": "700c21e2669aed7bae74834861f3621b"
        },
        {
          "name": "Tlaxcala",
          "count":39,
          "_id": "78a8b2b62ec11c5c35243d13a834fc2a"
        },
        {
          "name": "Veracruz",
          "count":39,
          "_id": "753176bb10dd684e5ea7e7f60e753fa1"
        },
        {
          "name": "Yucatán",
          "count":39,
          "_id": "4757345ab99f2abfc7d65c3301180688"
        },
        {
          "name": "Zacatecas",
          "count":39,
          "_id": "77a3e6dc61494ea04fd90c84c24b2c6e"
        }
      ]}
      return <DirectoryScreen handleClick={this.handleSelectCategory} categories={categories} baseurl="/prestamos/mexico/" />
    }
    const LenderDirectory = () => {
      let categories =   {title:"Entidades Financieras", list:[
        {
          "name": "Aguascalientes",
          "count":4,
          "_id": "5e168df7f695bd15a51b1fa1d43cffe2"
        },
        {
          "name": "Baja California",
          "count":3,
          "_id": "5675613fb96c694c3aa1df103ad8082f"
        },
        {
          "name": "Baja California Sur",
          "count":9,
          "_id": "52436cdbe35f508cfe92f7337cc91122"
        },
        {
          "name": "Campeche",
          "count":3,
          "_id": "b28daf698d02492631327a6e2509c142"
        },
        {
          "name": "Chiapas",
          "count":39,
          "_id": "52f10f103c05445c7bb847616bdfb2ce"
        },
        {
          "name": "Chihuahua",
          "count":39,
          "_id": "17dc03fc2bec1b541067d38dda209677"
        },
        {
          "name": "Coahuila",
          "count":39,
          "_id": "753c993354af1eb0158cac21a30b8461"
        },
        {
          "name": "Colima",
          "count":39,
          "_id": "7e29dcf53c00246b0106300b283c39fe"
        },
        {
          "name": "Distrito Federal",
          "count":39,
          "_id": "59931a53d4a75c6ddab0cee8fcc85d33"
        },
        {
          "name": "Durango",
          "count":39,
          "_id": "6858c6cb4ef881d3cc534b24b850ec55"
        },
        {
          "name": "Estado de México",
          "count":39,
          "_id": "ca5a2136e93b43dda9babe7357a7459d"
        },
        {
          "name": "Guerrero",
          "count":39,
          "_id": "10306c68325b9d69b21b9ebd8b53199e"
        },
        {
          "name": "Guanajuato",
          "count":39,
          "_id": "5886077499a34d96a4695959e81aa4a3"
        },
        
        {
          "name": "Hidalgo",
          "count":39,
          "_id": "87e3d41d3b194d0f420a862df4e9d459"
        },
        {
          "name": "Jalisco",
          "count":39,
          "_id": "0863d5ed9367ab1020d4c23b5fd1aae6"
        },
        {
          "name": "Michoacán",
          "count":39,
          "_id": "35b3a7d72ddd72ba1625ad4dce98a6f0"
        },
        {
          "name": "Morelos",
          "count":39,
          "_id": "3912cbeab477775cb91cc90a4d9f3c92"
        },
        {
          "name": "Nayarit",
          "count":39,
          "_id": "e061f30d33215bb2a373c205646479e8"
        },
        {
          "name": "Nuevo León",
          "count":39,
          "_id": "7c225d4093ffd01a299988e7daa526af"
        },
        {
          "name": "Oaxaca",
          "count":39,
          "_id": "1caccac1aa6300a1c99e130a72fab5e5"
        },
        {
          "name": "Puebla",
          "count":39,
          "_id": "00ad11eb964a48696150a844e9fb6e7f"
        },  
        {
          "name": "Querétaro",
          "count":39,
          "_id": "14f1d0626afe5272513c6001b1a4fad3"
        },
        {
          "name": "Quintana Roo",
          "count":39,
          "_id": "73ce3bccc97a3742b091147801310cbc"
        },
        {
          "name": "San Luis Potosí",
          "count":39,
          "_id": "06e539b7ef9b4df6ee1d839e58456ba7"
        },
        {
          "name": "Sinaloa",
          "count":39,
          "_id": "4ef3fde725e913323feb9cad1a7daa4d"
        },
        {
          "name": "Sonora",
          "count":39,
          "_id": "b107b4c6ca5da0698a2b142afed42669"
        },
        {
          "name": "Tabasco",
          "count":39,
          "_id": "132e643854836e43679970f9f3d8275c"
        },
        {
          "name": "Tamaulipas",
          "count":39,
          "_id": "700c21e2669aed7bae74834861f3621b"
        },
        {
          "name": "Tlaxcala",
          "count":39,
          "_id": "78a8b2b62ec11c5c35243d13a834fc2a"
        },
        {
          "name": "Veracruz",
          "count":39,
          "_id": "753176bb10dd684e5ea7e7f60e753fa1"
        },
        {
          "name": "Yucatán",
          "count":39,
          "_id": "4757345ab99f2abfc7d65c3301180688"
        },
        {
          "name": "Zacatecas",
          "count":39,
          "_id": "77a3e6dc61494ea04fd90c84c24b2c6e"
        }
      ]}
      return <DirectoryScreen handleClick={this.handleSelectCategory} categories={categories} baseurl="/financieras/" />
    }

    const DirectoryItems = () => {
      return <DirectoryItemScreen products={this.state.directory_products} />
    }
    const ContactReceivedFunc = () => <ContactReceived />
    const SearchResultsFunc = () => {
        return <SearchResults  products={this.state.products} />
    }

    return (
      <div className="App" style={{ padding: 20 }}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Crediplex - Préstamos en mexico</title>
          <link rel="canonical" href="http://crediplex.io" />
          <html lang="es"  />
        </Helmet>
        <header className="App-header">
          <Router >
            <div>
              <NavBar>     
                <Route render={tracker} />           
                <Route path="/" exact component={ProductDirectory} />
                <Route path="/home/"  component={ProductDirectory} />
                <Route path="/about/" component={About} />
                <Route path="/login/" component={Users} />
                <Route path="/buscar/" component={Search} />
                <Route path="/contactar/" component={Contact} />
                <Route exact path="/prestamos/" component={ProductDirectory}/>
                <Route exact path="/financieras/" component={LenderDirectory}/>
                <Route path="/prestamos/mexico/:estado" exact component={DirectoryItems}/>
                <Route path="/prestamos/mexico/:estado/page/:page" component={DirectoryItems}/>
                <Route path="/mensaje-recibida/" component={ContactReceivedFunc} />
                <Route path="/resultados/" component={SearchResultsFunc} />
                <Route path="/financieras/:estado" exact component={Lender} />
                <Route path="/financieras/:estado/:id" exact component={LenderItem} />
                <Route path="/financieras/:empresa/:empresa_id/prestamos/:prestamo_nombre/:prestamo_id" exact component={Product} />
              </NavBar>
            </div>
          </Router>
        </header>
      </div>
    );
  }
}

export default App;
