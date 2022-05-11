import React from "react";
import styled from "styled-components";
import book1 from "../../assets/bookStudent/image 2.png"
import book2 from "../../assets/bookStudent/image 3.png"
import book3 from "../../assets/bookStudent/image 4.png"
import book4 from "../../assets/bookStudent/image 5.png"
import book5 from "../../assets/bookStudent/image 6.png"
import book6 from "../../assets/bookStudent/image 7.png"
import book7 from "../../assets/bookStudent/image 8.png"
import book8 from "../../assets/bookStudent/image 9.png"
import book9 from "../../assets/bookStudent/image 10.png"
import book10 from "../../assets/bookStudent/image 11.png"
function SaleBooks(){
    return (
        <Div>
            <div className="col-12  ">
                <div className="row ml-auto col-sm-10 ">
                    <div className="col-sm-2">
                        <img src={book1} alt="" />
                    </div>
                    <div className="col-sm-2">
                        <img src={book2} alt="" />
                    </div>
                    <div className="col-sm-2">
                        <img src={book3} alt="" />
                    </div>
                    <div className="col-sm-2">
                        <img src={book4} alt="" />
                    </div>
                    <div className="col-sm-2">
                        <img src={book5} alt="" />
                    </div>
                </div>
                <div className=" row col-sm-10">
                    <div className="col-sm-2">
                        <img src={book6} alt="" />
                    </div>
                    <div className="col-sm-2">
                        <img src={book7} alt="" />
                    </div>
                    <div className="col-sm-2">
                        <img src={book8} alt="" />
                    </div>
                    <div className="col-sm-2">
                        <img src={book9} alt="" />
                    </div>
                    <div className="col-sm-2">
                        <img  src={book10} alt="" />
                    </div>
                </div>
            </div>
        </Div>
    )
}
export default SaleBooks;

const Div = styled.div`
background-color: #2C2828;
    .col-sm-10{
        width: 110% !important;
        margin-right: -10px;
    }
    .col-sm-2{
        margin-right: 20px;
        margin-top: 30px;
        img{
            width: 160px;
        }
    } 
`;