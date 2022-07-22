import React from "react";
import NumberFormat from "react-number-format";
import CartService from "../../services/CartService";
import styled from "styled-components";
import {withTranslation} from "react-i18next";

class CartPreview extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            numberOfItems: 0,
            total: 0
        }
    }

    componentDidMount() {
        CartService.getItemListCart().then((response) => {
            this.setState({
                numberOfItems: response.data.numberOfItems,
                items: response.data.items,
                total: response.data.total
            });
        });
    }

    //Lấy giá sau khi áp dụng giảm giá
    getDiscountPrice(oldPrice, discount) {
        const result = oldPrice * (100 - discount) / 100;
        return result;
    }

    render() {
        const {t, i18n} = this.props;
        return (
            <Nav>
                {
                    this.state.items && this.state.items.length > 0 ?
                        <div id="cartmini_page_content"
                             className={"fhs_top_cart_dropdown fhs_dropdown center"}
                             style={{visibility: "visible", display: "block"}}>
                            <div className={"fhs_center_left"} style={{
                                padding: "16px",
                                borderBottom: "1px solid #F2F4F5",
                                fontSize: "1.23em",
                                color: "#0D0E0F",
                                fontWeight: "bold"
                            }}>
                            <span className={"icon_cart_gray"}
                                  style={{
                                      width: "16px",
                                      height: "16px",
                                      marginRight: "8px"
                                  }}></span>
                                <span
                                    className={"fhs_height_normal"}>{t('Cart.cart')}</span>
                                <span className={"fhs_height_normal"}
                                      style={{marginLeft: "4px"}}>({this.state.numberOfItems})</span>
                            </div>

                            <div className={"clear"}>
                                <ol className={"mini-products-list fhs_column_left fhs_scrollbar "}>
                                    {
                                        this.state.items.map(
                                            item => <li className={"item"}>
                                                <a href={"/ProductDetail/" + item.product.id}
                                                   title={item.product.name}
                                                   className="product-image">
                                                    <img
                                                        src={require('../../assets/bookStudent/' + item.product.image)}
                                                        width="68" height="68"
                                                        alt={item.product.name}/>
                                                </a>
                                                <div
                                                    className="product-details">
                                                    <p className="product_name">
                                                        <a style={{textAlign: "justify"}}
                                                           href={"/ProductDetail/" + item.product.id}>{item.product.name}</a>
                                                    </p>
                                                    <div style={{
                                                        marginTop: "8px",
                                                        textAlign: "justify"
                                                    }}>
                                                        {
                                                            item.product.discount === 0 ?
                                                                <span
                                                                    className="price"> <NumberFormat
                                                                    value={item.product.price}
                                                                    displayType={'text'}
                                                                    thousandSeparator={true}/></span>
                                                                :
                                                                <span
                                                                    className="price"> <NumberFormat
                                                                    value={this.getDiscountPrice(item.product.price, item.product.discount)}
                                                                    displayType={'text'}
                                                                    thousandSeparator={true}/></span>
                                                        }

                                                        <span style={{
                                                            marginLeft: "8px",
                                                            color: "#7A7E7F",
                                                            fontSize: "1.1e,"
                                                        }}>x{item.soLuong}</span>
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    }

                                </ol>
                            </div>

                            <div className={"fhs_center_space"}
                                 style={{padding: "16px"}}>
                                <div className={"fhs_column_left"}>
                                    <div style={{
                                        color: "#0D0E0F",
                                        fontSize: "1.1em"
                                    }}>{t('Cart.cart_total')}
                                    </div>
                                    <div style={{color: "#C92127"}}>
                                    <span className={"price"}><NumberFormat
                                        value={this.state.total}
                                        displayType={'text'}
                                        thousandSeparator={true}/> đ</span>
                                    </div>
                                </div>
                                <a href="/Cart"
                                   className="fhs_btn_default active"
                                   style={{width: "186px"}}>{t('Cart.cart_view')}</a>
                            </div>
                        </div>
                        :
                        <div id="cartmini_page_content"
                             className={"fhs_top_cart_dropdown fhs_dropdown center"}
                             style={{visibility: "visible", display: "block"}}>
                            <div className={"fhs_center_left"} style={{
                                padding: "16px",
                                borderBottom: "1px solid #F2F4F5",
                                fontSize: "1.23em",
                                color: "#0D0E0F",
                                fontWeight: "bold"
                            }}>
                            <span className={"icon_cart_gray"}
                                  style={{
                                      width: "16px",
                                      height: "16px",
                                      marginRight: "8px"
                                  }}></span>
                                <span
                                    className={"fhs_height_normal"}>{t('Cart.cart')}</span>
                                <span className={"fhs_height_normal"}
                                      style={{marginLeft: "4px"}}>(0)</span>
                            </div>

                            <div className={"fhs_center_center"} style={{padding: "16px"}}>
                                <span className={"ico_emptycart"}></span>
                            </div>
                            <div className={"fhs_center_center"}
                                 style={{paddingBottom: "24px", color: "#0D0E0F", fontSize: "1.23em"}}>
                                {t('Cart.empty_cart')}
                            </div>
                        </div>
                }
            </Nav>
        )
    }
}

export default withTranslation()(CartPreview)
const Nav = styled.nav`
  .fhs_center_center {
    display: flex;
    display: -webkit-box;
    display: -webkit-flex;
    align-items: center;
    -webkit-align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
    text-align: center;
  }

  .heading-custom div {
    text-align: center;
  }

  .icon_cart_white {
    background: url(https://cdn0.fahasa.com/skin/frontend/base/default/images/ico_shopping_cart_white.svg) no-repeat center center;
    -webkit-background-size: contain;
    background-size: contain;
    height: 35px;
    width: 35px;
    position: relative;
  }


  .icon_cart_gray {
    background: url(https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/ico_cart_gray.svg) no-repeat center center;
    -webkit-background-size: contain;
    -moz-background-size: contain;
    -o-background-size: contain;
    background-size: contain;
    height: 24px;
    width: 24px;
    position: relative;
  }

  .ico_emptycart {
    background: url(https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/cart/9bdd8040b334d31946f49e36beaf32db.png) no-repeat center center;
    -webkit-background-size: contain;
    -moz-background-size: contain;
    -o-background-size: contain;
    background-size: contain;
    height: 80px;
    width: 80px;
  }

  .top_menu_unseen {
    background-color: #C92127;
    -webkit-border-radius: 10px;
    border-radius: 15px;
    vertical-align: top;
    position: absolute;
    top: -10px;
    right: -10px;
    width: 24px;
    height: 24px;
    color: white;
    font-size: 1.0em;
    font-weight: bold;
    line-height: 0;
    border: 1px solid #fff;
  }

  .fhs_dropdown.center {
    right: 50%;
    -webkit-transform: translate(50%, 100%);
    transform: translate(50%, 100%);
  }

  .fhs_top_cart_dropdown {
    min-width: 264px;
    min-height: 220px;
  }

  .fhs_dropdown {
    display: none;
    position: absolute;
    bottom: 0;
    right: 0;
    -webkit-transform: translate(0, 100%);
    transform: translate(0, 100%);
    background-color: white;
    z-index: 999;
    white-space: nowrap;
    -webkit-border-radius: 8px;
    border-radius: 8px;
    -webkit-border-radius: 8px;
    box-shadow: 0 4px 6px rgb(32 33 36 / 28%);
    color: #7A7E7F;
    max-width: 100vw;
    cursor: default;
  }

  .fhs_center_left {
    display: flex;
    display: -webkit-box;
    display: -webkit-flex;
    align-items: center;
    -webkit-align-items: center;
    -webkit-justify-content: flex-start;
    justify-content: flex-start;
    text-align: left;
  }

  .fhs_height_normal {
    line-height: normal;
  }

  .clear {
    clear: both;
  }

  .mini-products-list {
    max-height: 368px;
    overflow-y: auto;
  }

  .fhs_column_left {
    display: flex;
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    flex-direction: column;
    align-items: flex-start;
    -webkit-align-items: flex-start;
  }

  .mini-products-list li {
    padding: 12px 16px;
    display: flex;
    display: -webkit-box;
    display: -webkit-flex;
    align-items: stretch;
    -webkit-align-items: stretch;
  }

  .mini-products-list li .product-image {
    width: 68px;
    height: 68px;
    display: flex;
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    align-items: center;
    -webkit-align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
  }

  .mini-products-list .product-image {
    /* flex: 1; */
    width: 80px;
  }

  .fhs_dropdown a {
    color: #7A7E7F;
  }

  .mini-products-list li img {
    max-height: 68px;
    width: auto;
    object-fit: contain;
  }

  .mini-products-list .product-details {
    width: 252px;
    margin-left: 8px;
    display: flex;
    display: -webkit-box;
    display: -webkit-flex;
    flex-direction: column;
    color: #0D0E0F;
  }

  .product_name {
    margin: 0;
    font-weight: normal;
    line-height: 18px;
    display: inline-block;
  }

  .mini-products-list .product-details .product_name a {
    padding-top: 0px !important;
    font-size: 1.08em;
    letter-spacing: 0px;
    line-height: 1.4em;
    word-break: break-word;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    min-height: 1.4em;
    max-height: 2.8em;
  }

  .fhs_top_cart_dropdown .price {
    font-family: nunito-sans, sans-serif, Helvetica, Arial;
    font-size: 1.23em;
    font-weight: bold;
  }

  .mini-products-list .price {
    margin: 0 0 10px;
  }

  .price {
    font-size: 15px;
    font-family: "Poppins", sans-serif;
  }

  .fhs_center_space {
    display: flex;
    display: -webkit-box;
    display: -webkit-flex;
    align-items: center;
    -webkit-align-items: center;
    -webkit-justify-content: space-between;
    justify-content: space-between;
  }

  .fhs_btn_default {
    width: 100%;
  }

  .fhs_btn_default {
    display: flex;
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
    color: #C92127;
    background-color: #fff;
    border: 2px solid #C92127;
    font-size: 14px;
    font-weight: 700;
    width: 210px;
    max-width: 100%;
    height: 40px;
    max-height: 100%;
    border-radius: 8px;
    -webkit-border-radius: 8px;
    cursor: pointer;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    user-select: none;
    transition: all 0.5s;
  }

  .fhs_btn_default.active {
    color: #fff;
    background-color: #C92127;
    border: 2px solid #C92127;
  }
`;