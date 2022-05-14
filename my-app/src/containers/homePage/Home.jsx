
import styled from "styled-components";
import Navbar from "../../components/OneForAll/Navbar"
import PopularBook from "../../components/Elements/PopularBook"
import SaleBooks from "../../components/Elements/Sale-book";
import Category  from "../../components/Elements/Category";
import UserService from "../../services/user.service";
import Profile from "../../containers/Profile/Profile"

import axios from "axios";
import { Component } from "react";
import ContentHome from "./ContentHome";
import { Switch,Route,Link } from "react-router-dom";

class Home extends Component{
    
    constructor(props) {
        super(props);
    
        this.state = {
          content: ""
        };
      }
    
      componentDidMount() {
        UserService.getPublicContent().then(
          response => {
            this.setState({
              content: response.data
            });
          },
          error => {
            this.setState({
              content:
                (error.response && error.response.data) ||
                error.message ||
                error.toString()
            });
          }
        );
      }
    
    
    render(){
            return (
                <Section>
                    <Navbar />
                    <Link to={["/home","/"]}></Link>
                    <Link to="/home/profile"></Link>
                    
                     <Route exact path={["/home","/"]}>
                        <PopularBook />
                        <ContentHome/>
                      </Route>
                     <Route exact path="/home/profile"> <Profile /> </Route>
                    
                </Section>
            )
        
        
    }
}
export default Home;
const Section = styled.section`
     
`;