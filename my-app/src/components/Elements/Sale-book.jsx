import React from "react";
import styled from "styled-components";
import ProductService from "../../services/ProductService";
import {Link} from "react-router-dom";

import './css/SaleBook.css'


class SaleBooks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1, //Trang hien tai
            count: 0, // Tong so trang
            size: 10, // Tong so san pham tren 1 trang
            products: []
        }

        this.changePage = this.changePage.bind(this);
    }

    getRequestParams(page, size) {
        let params = {};
        if (page) {
            params["page"] = page - 1;
        }
        if (size) {
            params["size"] = size;
        }
        return params;
    }

    componentDidMount() {
        const {page, size} = this.state;
        const params = this.getRequestParams(page, size);
        ProductService.getProductList(params).then((response) => {
            const {productList, totalPages} = response.data;
            this.setState({
                products: productList,
                count: totalPages,
            })
            console.log("Lift of Books:" + JSON.stringify(this.state.products));
            console.log("Product size: " + this.state.count)
        });
    }

    changePage = params => {
        this.setState(
            {
                page: params,

            },

            () => {
                this.componentDidMount();
            }
        );

        console.log("page:" + this.state.page);
    }


    render() {

        return (
            <Div>
                <div className="col-12  ">
                    <div className="row ml-auto col-sm-10 ">

                        {
                            this.state.products.map(
                                product =>

                                        <div className="col-sm-2">
                                            <Link to={"/ProductDetail/" + product.id}>
                                                <img
                                                    src={require('../../assets/bookStudent/' + product.image)}
                                                    alt={product.name}/>
                                            </Link>
                                        </div>
                            )
                        }

                    </div>


                </div>

                <div className="GYk2AG">
                    <div className="shopee-page-controller">

                        {
                            [...Array(this.state.count)].map(
                                (item, i) => {
                                    return <button
                                        className={`${this.state.page === (i + 1) ? "shopee-button-solid shopee-button-solid--primary" : "shopee-button-no-outline"}`}
                                        onClick={() => this.changePage(i + 1)}>{i + 1}</button>
                                }
                            )
                        }

                    </div>
                </div>


            </Div>
        )
    }
}

export default SaleBooks;

const Div = styled.div`
  background-color: #2C2828;

  .col-sm-10 {
    width: 110% !important;
    margin-right: -10px;
  }

  .col-sm-2 {
    margin-right: 20px;
    margin-top: 30px;

    img {
      width: 160px;
    }
  }


`;