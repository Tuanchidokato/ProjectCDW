
import styled from "styled-components";
import Navbar from "../../components/OneForAll/Navbar"
import PopularBook from "../../components/Elements/PopularBook"
import SaleBooks from "../../components/Elements/Sale-book";
import Category  from "../../components/Elements/Category";
import UserService from "../../services/user.service";


import axios from "axios";
import { Component } from "react";

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
                    <PopularBook/>
                    <div className="sale_book row ">
                        <div className="col-sm-2">
                            <Category />
                        </div>
                        <div className="col-sm-10">
                            <SaleBooks />
                        </div>
                    </div>
                    
                </Section>
            )
        
        
    }
}
export default Home;
const Section = styled.section`
     
`;