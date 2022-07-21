
import styled from "styled-components";
import Navbar from "../../components/OneForAll/Navbar"
import PopularBook from "../../components/Elements/PopularBook"
 
import Profile from "../../containers/Profile/Profile"

import { Component } from "react";
import ContentHome from "./ContentHome";
import { Route,Link } from "react-router-dom";
import ProductService from "../../services/ProductService";
import SaleBooks from "../../components/Elements/Sale-book";
import Category from "../../components/Elements/Category";

class Home extends Component{
    constructor(props){
      super(props)
      this.state={
        products:[],
        searchResult:[],
        searchItem:"",
        totalPages:0
      }
    }
 

 
    render(){
            return (
                <Section>
                    <Navbar 
                    />
                    <Link to={["/home","/"]}></Link>
                    <Link to="/home/profile"></Link>
                    
                     <Route exact path={["/home","/"]}>
                        <PopularBook
                     //     products={this.state.products}
                        />
                        <div className="container-fluid">
                          <div className="sale_book row ">
                              <div className="col-sm-2">
                                  <div className="category">
                                      <Category />
                                  </div>
                              </div>
                              <div className="col-sm-10">
                                  <SaleBooks
                                  />
                              </div>
                          </div>
                      </div>
                      </Route>
                     <Route  path="/home/profile"> <Profile /> </Route>
                    
                </Section>
            )
        
        
    }
}
export default Home;
const Section = styled.section`
     background-color: #2C2828;
`;