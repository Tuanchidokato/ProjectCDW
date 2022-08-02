import React from "react"
import ProductService from "../../services/ProductService";
import Navbar from "../OneForAll/Navbar";
import {withRouter} from "react-router-dom";
import {withTranslation} from "react-i18next";
import "./css/searchbook.css";
import NumberFormat from 'react-number-format';

class SearchBook extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            page: 1, //Trang hien tai
            count: 0, // Tong so trang
            size: 10, // Tong so san pham tren 1 trang
            products: [],
            search:""
        }
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
        let {search} = this.props.match.params;
        const {page, size} = this.state;
        const params = this.getRequestParams(page, size);
        console.log("Product's name:" + search);
        ProductService.searchProducts(params, search).then(r => {
            this.setState({
                products: r.data.productList,
                count: r.data.totalItems
            })
            console.log(JSON.stringify(this.state.products));
        });

    }

    getDiscountPrice(oldPrice, discount) {
        const result = oldPrice * (100 - discount) / 100;
        return result;
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


    }


    render() {
        const {t, i18n} = this.props;
        return (
            <body>
            <Navbar/>

            <div className={"main-container col2-left-layout "}>
                <div className={"main"}>
                    <div className={"container"}>
                        <div className={"container-inner"}>
                            <div style={{justifyContent: "center"}}>
                                <div className={"col-main col-lg-9 col-md-9 col-sm-12 col-xs-12 col-fhs-main-body"}>
                                    <div className={"mb-content"}>
                                        {
                                            this.state.products && this.state.products.length === 0 ?
                                                <div className={"mb-search-result"}>
                                                    <div className={"page-title"}>
                                                        <h1>{t('search.search_with')} </h1>
                                                    </div>
                                                    <p className={"note-msg"}>{t('search.search_empty')}</p>
                                                </div>
                                                :
                                                <div className={"mb-search-result"}>
                                                    <div className={"page-title"}>
                                                        <h1>{t('search.search_with')}</h1>
                                                    </div>
                                                    <div className={"category-products row"}>
                                                        <div className={"toolbar-top"}>
                                                            <div
                                                                className={"toolbar  col-sm-12 col-xs-12 col-md-12 "}></div>
                                                        </div>
                                                        {
                                                            this.state.products.map(
                                                                product =>
                                                                    <ul className={"products-grid fhs-top "}>
                                                                        <li>
                                                                            <div className={"item-inner"}>

                                                                                {
                                                                                    product.discount > 0 ?
                                                                                        <div
                                                                                            className={"label-pro-sale m-label-pro-sale"}
                                                                                            style={{display: "flex"}}>
                                                                                                <span
                                                                                                    className={"p-sale-label"}>
                                                                                                        {product.discount}%
                                                                                              </span>
                                                                                        </div>
                                                                                        :
                                                                                        <></>
                                                                                }

                                                                                <div className={"ma-box-content"}>
                                                                                    <div
                                                                                        className={"products clearfix"}>
                                                                                        <div
                                                                                            className={"product images-container"}>
                                                                                            <a href={"/ProductDetail/" + product.id}
                                                                                               title={product.name}
                                                                                               className="product-image">
                                                                                                <span
                                                                                                    className="product-image">
                                                                                                    <img
                                                                                                        src={product.image}
                                                                                                        alt={product.name}/>
                                                                                                 </span>
                                                                                            </a>
                                                                                        </div>
                                                                                    </div>
                                                                                    <h2 className={"product-name-no-ellipsis p-name-list"}>
                                                                                        <a href={"/ProductDetail/" + product.id}
                                                                                           title="Shinzo Abe &amp; Gia Tộc Tuyệt Đỉnh">{product.name}</a>
                                                                                    </h2>


                                                                                    {
                                                                                        product.discount > 0 ?
                                                                                            <div
                                                                                                className={"price-label"}>
                                                                                                <p className={"special-price"}>
                                                                                             <span
                                                                                                 id="product-price-189024"
                                                                                                 className="price"><NumberFormat
                                                                                                 value={this.getDiscountPrice(product.price, product.discount)}
                                                                                                 displayType={'text'}
                                                                                                 thousandSeparator={true}/>đ</span>
                                                                                                </p>
                                                                                                <p className={"old-price bg-white"}>
                                                                                              <span
                                                                                                  id="old-price-189024"
                                                                                                  className="price"><NumberFormat
                                                                                                  value={product.price}
                                                                                                  displayType={'text'}
                                                                                                  thousandSeparator={true}/>đ</span>
                                                                                                </p>
                                                                                            </div>
                                                                                            :
                                                                                            <div
                                                                                                className={"price-label"}>
                                                                                                <p className={"special-price"}>
                                                                                            <span
                                                                                                id="product-price-189024"
                                                                                                className="price"><NumberFormat
                                                                                                value={product.price}
                                                                                                displayType={'text'}
                                                                                                thousandSeparator={true}/>đ</span>
                                                                                                </p>
                                                                                            </div>

                                                                                    }


                                                                                </div>
                                                                            </div>
                                                                        </li>
                                                                    </ul>

                                                            )

                                                        }
                                                        <div className={"toolbar-bottom"}>
                                                            <div className={"toolbar  col-sm-12 col-xs-12 col-md-12 "}>
                                                                <div className={"col-sm-12 col-xs-12 col-md-12"} style={{marginTop: "-3px"}}>
                                                                    <div className={"pages"}>
                                                                        <ol>
                                                                            {
                                                                                [...Array(this.state.count)].map(
                                                                                    (item, i) => {
                                                                                        return <button
                                                                                            className={`${this.state.page === (i + 1) ? "current" : ""}`}
                                                                                            onClick={() => this.changePage(i + 1)}>{i + 1}</button>
                                                                                    }
                                                                                )
                                                                            }
                                                                        </ol>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                        }


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            </body>
        )
    }

}

export default withTranslation()(withRouter(SearchBook));