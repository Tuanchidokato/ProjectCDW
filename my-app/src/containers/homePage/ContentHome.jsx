import styled from "styled-components"
import {Component} from "react"
import Category from "../../components/Elements/Category";
import SaleBooks from "../../components/Elements/Sale-book";
class ContentHome extends Component{

    render(){
        return(

            <Div>
                <div className="container-fluid">
                    <div className="sale_book row ">
                        <div className="col-sm-2">
                            <div className="category">
                                <Category />
                            </div>
                        </div>
                        <div className="col-sm-10">
                            <SaleBooks />
                        </div>
                    </div>
                </div>
            </Div>
        )
    }
}
export default ContentHome;
const Div = styled.div`
    background-color: #2C2828;
    .category{
        border-right: 0.01rem solid #FFFF;
    }
`;