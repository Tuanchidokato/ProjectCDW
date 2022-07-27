import React from "react";
import Navbar from "../../components/OneForAll/Navbar"
import NumberFormat from 'react-number-format';
import {withRouter} from "react-router-dom";
import {withTranslation} from "react-i18next";
import './css/detail.css';
import ProductService from "../../services/ProductService";
import CartService from "../../services/CartService";


class ProductDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            product: {},
            category: {},
            quantity: 1
        }

        this.increaseQuantity = this.increaseQuantity.bind(this);
        this.decreaseQuantity = this.decreaseQuantity.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.buyNow = this.buyNow.bind(this);
    }

    componentDidMount() {
        let {id} = this.props.match.params;
        console.log("Product's id:" + id);
        ProductService.getProductDetail(id).then((response) => {
            this.setState({
                product: response.data,
                category: response.data.categories
            })
            console.log("Product: " + JSON.stringify(response.data));
            console.log("Image:" + this.state.category.name);
        })
    }

    increaseQuantity(e) {
        e.preventDefault();
        this.setState({
            quantity: this.state.quantity + 1
        });
    }

    decreaseQuantity(e) {
        e.preventDefault();
        this.setState({
            quantity: this.state.quantity - 1
        });
    }

    //Thêm vào giỏ hàng
    addToCart() {
        let {id} = this.props.match.params;
        CartService.addItem(id, this.state.quantity);
        window.location.reload();
    }

    //Đi thằng vào giỏ
    buyNow() {
        let {id} = this.props.match.params;
        console.log("Product's id:" + id);
        CartService.addItem(id, this.state.quantity);
        this.props.history.push("/Cart");
        window.location.reload();
    }


    getDiscountPrice(oldPrice, discount) {
        const result = oldPrice * (100 - discount) / 100;
        return result;
    }


    render() {
        const {t, i18n} = this.props;
        return (
            <body>
            <Navbar/>
            <div className="wrapper" id="wrapper">
                <div className="page">
                    <div className="main-container col1-layout no-margin-top">
                        <div className="main">
                            <div className="col-main">
                                <div className="container">
                                    <div className="container-inner">
                                        <form>
                                            <div className="product-view kasitoo">
                                                <div className="product-essential">
                                                    <div className="product-essential-media">
                                                        <div className="product-view-image">
                                                            <div className="product-view-image-product">
                                                                <img src={this.state.product.image} className="fhs-p-img"
                                                                     alt=""/>
                                                            </div>
                                                        </div>

                                                        <div className="product_view_add_box">
                                                            <button type="button" title="Thêm vào giỏ hàng"
                                                                    className="btn-cart-to-cart"
                                                                    onClick={this.addToCart}
                                                                    disabled={this.state.product.quantity === 0}><span
                                                                className="fhs_icon_cart"></span><span>{t('product_detail.product_addCart')}</span>
                                                            </button>
                                                            <button type="button" title="Mua ngay" is_buynow="true"
                                                                    className="btn-buy-now" onClick={this.buyNow}
                                                                    disabled={this.state.product.quantity === 0}>
                                                                <span>{t('product_detail.product_buyNow')}</span>
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <div className="product-essential-detail">
                                                        <h1 style={{color: "white"}}>{this.state.product.name}</h1>
                                                        <div className="product-view-sa">
                                                            <div className="product-view-sa_one">
                                                                <div className="product-view-sa-supplier">
                                                                    <span>{t('product_detail.product_supplier')}:</span>
                                                                    <span>1980 Books</span>
                                                                </div>
                                                                <div className="product-view-sa-author">
                                                                    <span>{t('product_detail.product_author')}:</span><span>{this.state.product.author}</span>

                                                                </div>
                                                            </div>

                                                            <div className="product-view-sa_two">
                                                                <div className="product-view-sa-supplier">
                                                                    <span>{t('product_detail.product_publisher')}:</span><span>{this.state.product.nxb}</span>
                                                                </div>
                                                                <div className="product-view-sa-author">
                                                                    <span>{t('product_detail.product_layout')}:</span><span>{t('product_detail.product_typelayout')}</span>
                                                                </div>
                                                            </div>

                                                        </div>

                                                        <div className="col-md-12 price-block desktop_only">
                                                            <div id="catalog-product-details-price"
                                                                 className="catalog-product-details-price product_price price-block-left">
                                                                <div className="price-box">

                                                                    {
                                                                        this.state.product.discount === 0 ?
                                                                            <p className="special-price">
                                                                                <span className="price-label">Special Price</span>
                                                                                <span className="price"
                                                                                      id="product-price-395589"><NumberFormat
                                                                                    value={this.state.product.price}
                                                                                    displayType={'text'}
                                                                                    thousandSeparator={true}/> đ</span>
                                                                            </p>
                                                                            :
                                                                            <div className="price-box">
                                                                                <p className="special-price">
                                                                                    <span className="price-label">Special Price</span>
                                                                                    <span className="price"
                                                                                          id="product-price-395589"> <NumberFormat
                                                                                        value={this.getDiscountPrice(this.state.product.price, this.state.product.discount)}
                                                                                        displayType={'text'}
                                                                                        thousandSeparator={true}/>  đ</span>
                                                                                </p>
                                                                                <p className="old-price">

                                                                                    <NumberFormat
                                                                                        style={{color: "white"}}
                                                                                        className="price"
                                                                                        value={this.state.product.price}
                                                                                        displayType={'text'}
                                                                                        thousandSeparator={true}/> đ
                                                                                    <span
                                                                                        className="discount-percent">{this.state.product.discount}%</span>
                                                                                </p>
                                                                            </div>


                                                                    }

                                                                </div>

                                                            </div>
                                                        </div>

                                                        <div className="clear"></div>
                                                        <div id="expected_delivery">
                                                            <div id="expected_return_product_policy">
                                                                <div>
                                                                    {t('product_detail.product_return')}
                                                                </div>
                                                                <div>
                                                                    <div>
                                                                        {t('product_detail.product_30day')}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="clear"></div>
                                                        <div id="catalog-product-details-discount">
                                                            <div class="product-view-quantity-box">
                                                                <label style={{color: "white"}}
                                                                       for="qty">{t('product_detail.product_quantity')}:
                                                                </label>

                                                                {
                                                                    this.state.product.quantity > 0 ?
                                                                        <div
                                                                            className="product-view-quantity-box-block">
                                                                            <button className="btn-subtract-qty"
                                                                                    onClick={event => this.decreaseQuantity(event)}
                                                                                    disabled={this.state.quantity === 1}>
                                                                                <img style={{width: 12}}
                                                                                     src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/ico_minus2x.png"/>
                                                                            </button>
                                                                            <input type="text" name="qty" id="qty"
                                                                                   min={1} value={this.state.quantity}
                                                                                   title="SL"
                                                                                   className="input-text qty"></input>
                                                                            <button className="btn-add-qty"
                                                                                    onClick={event => this.increaseQuantity(event)}
                                                                                    disabled={this.state.quantity === this.state.product.quantity}>
                                                                                <img style={{width: 12}}
                                                                                     src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/ico_plus2x.png"/>
                                                                            </button>

                                                                        </div>
                                                                        :
                                                                        <label style={{color: "red"}}
                                                                               htmlFor="qty">{t('product_detail.product_stock')}</label>

                                                                }


                                                            </div>


                                                        </div>

                                                    </div>

                                                </div>
                                                <div className="clear"></div>

                                            </div>
                                        </form>

                                        <div className="product-collateral">
                                            <div className="content product_view_content">
                                                <div
                                                    className="product_view_content-title">{t('product_detail.product_information')}</div>
                                                <div className="product_view_tab_content_ad">
                                                    <div className="product_view_tab_content_additional">
                                                        <table className="data-table table-additional">
                                                            <colgroup>
                                                                <col width="25%"></col>
                                                            </colgroup>
                                                            <tbody>
                                                            <tr>
                                                                <th className="tabel-label">{t('product_detail.prodcut_code')}</th>
                                                                <td className="data_saku">{this.state.product.id}</td>
                                                            </tr>
                                                            <tr>
                                                                <th className="tabel-label">{t('product_detail.product_supplier')}</th>
                                                                <td className="data_saku">1980 Books</td>
                                                            </tr>
                                                            <tr>
                                                                <th className="tabel-label">{t('product_detail.product_author')}</th>
                                                                <td className="data_saku">{this.state.product.author}</td>
                                                            </tr>
                                                            <tr>
                                                                <th className="tabel-label">{t('product_detail.product_publisher')}</th>
                                                                <td className="data_saku">{this.state.product.nxb}</td>
                                                            </tr>
                                                            <tr>
                                                                <th className="tabel-label">{t('product_detail.product_date')}</th>
                                                                <td className="data_saku">{this.state.product.date}</td>
                                                            </tr>
                                                            <tr>
                                                                <th className="tabel-label">{t('product_detail.product_cate')}</th>
                                                                <td className="data_saku">{this.state.category.name}</td>
                                                            </tr>
                                                            <tr>
                                                                <th className="tabel-label">{t('product_detail.product_language')}</th>
                                                                <td className="data_saku">{t('product_detail.prodcut_vnEN')}</td>
                                                            </tr>
                                                            <tr>
                                                                <th className="tabel-label">{t('product_detail.product_availible')}</th>
                                                                {
                                                                    this.state.product.available == 1 ?
                                                                        < td
                                                                            className="data_saku">{t('product_detail.product_availible')}</td>
                                                                        :
                                                                        < td
                                                                            className="data_saku">{t('product_detail.product_stock')}</td>
                                                                }
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <div className="clear"></div>
                                                    <div
                                                        className="product_view_content-title">{t('product_detail.product_description')}</div>
                                                    <div id="product_tabs_description_contents">
                                                        <div id="desc_content" className="std">
                                                            <p style={{textAlign: "justify", color: "white"}}>
                                                                <strong>{this.state.product.name}</strong>
                                                            </p>
                                                            <p style={{textAlign: "justify", color: "white"}}>
                                                                {this.state.product.description}
                                                            </p>

                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

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

export default withTranslation()(withRouter(ProductDetail));