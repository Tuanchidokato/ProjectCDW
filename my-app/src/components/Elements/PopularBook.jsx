import React from "react";
import styled from "styled-components"

import book1 from "../../assets/Book-popular/book1.svg"
import book2 from "../../assets/Book-popular/book2.svg"
import book3 from "../../assets/Book-popular/book3.svg"
function PopularBook() {
    return(
        <Div>
            <div className="book_popular col-sm-12 row ">
                <div className="col-sm-4 book_items book_item1">
                    <img src={book1} alt="" />
                    <div className="book-content">
                        <h1 className="title">Book head</h1>
                        <p className="content-book">Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                            Massa elit lectus enim id euismod. Gravida at praesent aliquam, at natoque at leo. 
                            </p>

                        <p className="note_book">Detective-ScienceFiction-Fantastic</p>
                        <a href="#">Now Read</a>
                    </div>
                </div>

                <div className="col-sm-4 book_items book_item2">
                    <img src={book2} alt="" />
                    <div className="book-content">
                        <h1 className="title">Book head</h1>
                        <p className="content-book">Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                            Massa elit lectus enim id euismod. Gravida at praesent aliquam, at natoque at leo. 
                            </p>
                        <p className="note_book">Detective-ScienceFiction-Fantastic</p>
                        <a href="#">Now Read</a>
                    </div>
                </div>


                <div className="col-sm-4 book_items book_item3">
                    <img src={book3} alt="" />
                    <div className="book-content">
                        <h1 className="title">Book head</h1>
                        <p className="content-book">Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                            Massa elit lectus enim id euismod. Gravida at praesent aliquam, at natoque at leo. 
                            </p>
                        <p className="note_book">Detective-ScienceFiction-Fantastic</p>
                        <a className="button_read" href="#">Now Read</a>
                    </div>
                </div>
            </div>
        </Div>
    )
}
export default PopularBook;
const Div = styled.div`
    background-color: #2C2828;
    height: 300px;
    .book_popular{


        background-color: #2C2828;
        .book_items{
            width: 370px;
            height: 210px;
            margin-left: 70px;
            border-radius: 5px;
            margin-top: 10px;
            display: flex;
            margin-top: 40px;
            img{
                width: 166px;
                margin-left: -34px;
                position: absolute;
                margin-top: -14px;
            }
            .book-content{
                width: 237px;
                margin-left: 155px;
                color: #FFFF;
                .title{
                    font-size: 25px;
                    font-weight: bold;
                }
                .content-book{
                    font-size: 12px;
                     
                }
                .note_book{
                    font-size: 12px;
                    margin-bottom: 10px;
                    margin-top: -5px;
                }
                a{
                    text-decoration: none;
                    margin-left: 30px;
                    color: #FFFF !important;
                    padding: 5px 15px 5px 15px;
                    border: 1px  solid #FFFF;
                    font-size: 20px;
                }

            }
        }
        .book_item1{
            background: rgba(42, 107, 145, 0.38);
        }
        .book_item2{
            background: rgba(171, 113, 244, 0.38);
        }
        .book_item3{
            background: rgba(244, 113, 168, 0.38);
        }
    }
`;