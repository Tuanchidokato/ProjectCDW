import React from "react";
import './css/cart.css';
import NumberFormat from 'react-number-format';
import {withRouter} from "react-router-dom";
import {withTranslation} from "react-i18next";
import CartService from "../../services/CartService";

class Cart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            numberOfItems: 0,
            total: 0,
        }

        this.checkOut = this.checkOut.bind(this);
        this.clearItems = this.clearItems.bind(this);
        this.removeFromCart = this.removeFromCart.bind(this);
        this.increaseFromCart = this.increaseFromCart.bind(this);
        this.decreaseFromCart = this.decreaseFromCart.bind(this);
    }

    checkOut() {
        this.props.history.push("/CartInfo");
        window.location.reload();
    }

    //Xóa sản phẩm khỏi giỏ hàng
    removeFromCart = (event, id) => {
        event.preventDefault();
        console.log(id);
        CartService.removeItem(id);
    }

    //Tăng số lượng sản phẩm
    increaseFromCart = (event, id) => {
        event.preventDefault();
        console.log(id);
        CartService.increaseItem(id);
    }

    //Giảm số lương sản phẩm
    decreaseFromCart = (event, id) => {
        event.preventDefault();
        console.log(id);
        CartService.decreaseItem(id);
    }

    componentDidMount() {
        CartService.getItemListCart().then((response) => {
            this.setState({
                items: response.data.items,
                numberOfItems: response.data.numberOfItems,
                total: response.data.total
            });
        });
    }

    //Lấy giá sau khi áp dụng giảm giá
    getDiscountPrice(oldPrice, discount) {
        const result = oldPrice * (100 - discount) / 100;
        return result;
    }

    clearItems() {
        CartService.clearCart();
    }

    render() {
        const {t, i18n} = this.props;
        return (

            <body>
            {
                this.state.items && this.state.items.length > 0 ?
                    <div className="di">
                        <div className="_9_5_1E">
                            <div style={{display: "block"}}>
                                <div className="container">
                                    <div className="_2REryK" style={{marginBottom: 0}}>
                                        <div className="_2eZQze">
                                            <div className="_35gBGg">
                                                <label className="stardust-checkbox">
                                                    <input className="stardust-checkbox_input" type={"checkbox"}/>
                                                    <div className="stardust-checkbox_box"></div>
                                                </label>
                                            </div>
                                            <div className="_2cHnzN"
                                                 style={{fontWeight: "bold"}}>{t('Cart.cart_product')}</div>
                                            <div className="_2UJcxH"
                                                 style={{fontWeight: "bold"}}>{t('Cart.cart_product')}</div>
                                            <div className="_1SKeIp"
                                                 style={{fontWeight: "bold"}}>{t('Cart.cart_unit')}</div>
                                            <div className="_2LUhSC"
                                                 style={{fontWeight: "bold"}}>{t('Cart.cart_totalPrice')}</div>
                                            <div className="HHdkhO"
                                                 style={{fontWeight: "bold"}}>{t('Cart.cart_action')}</div>
                                        </div>

                                        {
                                            this.state.items.map(
                                                item =>
                                                    <div className="_1K9yK1">

                                                        <div className="_1BehlF">
                                                            <div className="_-0yJ2-">

                                                                <div className="_1Lgvsy">
                                                                    <label className="stardust-checkbox">
                                                                        <input className="stardust-checkbox_input"
                                                                               type={"checkbox"}/>
                                                                        <div className="stardust-checkbox_box"></div>
                                                                    </label>
                                                                </div>
                                                                <div className="_1Z2fe1">
                                                                    <div className="_3mceb9">
                                                                        <a title={item.product.name} href="/">
                                                                            <img className="_25vezo"
                                                                                 src={require('../../assets/bookStudent/' + item.product.image)}
                                                                                 alt=""/>
                                                                        </a>
                                                                        <div className="_1WfuBi">
                                                                            <a href={"/ProductDetail/" + item.product.id}
                                                                               className="_3t5Sij"
                                                                               title={item.product.name}>{item.product.name}</a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="_34KJXV"></div>
                                                                <div className="_1C6zuo">


                                                                    <div>
                                                                        {
                                                                            item.product.discount === 0 ?

                                                                                <span
                                                                                    className="_1E5-FE">₫   <NumberFormat
                                                                                    value={item.product.price}
                                                                                    displayType={'text'}
                                                                                    thousandSeparator={true}/> </span>
                                                                                :
                                                                                <div>
                                                                                <span
                                                                                    className="_1E5-FE _1PSxs0">₫ <NumberFormat
                                                                                    value={item.product.price}
                                                                                    displayType={'text'}
                                                                                    thousandSeparator={true}/> </span>
                                                                                    <span
                                                                                        className="_1E5-FE">₫ <NumberFormat
                                                                                        value={this.getDiscountPrice(item.product.price, item.product.discount)}
                                                                                        displayType={'text'}
                                                                                        thousandSeparator={true}/> </span>
                                                                                </div>


                                                                        }


                                                                    </div>
                                                                </div>

                                                                <div className="_2vZsK0">
                                                                    <div className="_3he7rw">
                                                                        <button className="_3Ell0h"
                                                                                onClick={event => this.decreaseFromCart(event, item.product.id)}>
                                                                            <svg enable-background="new 0 0 10 10"
                                                                                 viewBox="0 0 10 10" x="0" y="0"
                                                                                 className="shopee-svg-icon">
                                                                                <polygon
                                                                                    points="4.5 4.5 3.5 4.5 0 4.5 0 5.5 3.5 5.5 4.5 5.5 10 5.5 10 4.5"></polygon>
                                                                            </svg>
                                                                        </button>
                                                                        <input className="_3Ell0h _37H5-t" type={"text"}
                                                                               value={item.soLuong}/>
                                                                        <button className="_3Ell0h"
                                                                                onClick={event => this.increaseFromCart(event, item.product.id)}
                                                                                disabled={item.soLuong === item.product.quantity}>
                                                                            <svg enable-background="new 0 0 10 10"
                                                                                 viewBox="0 0 10 10" x="0" y="0"
                                                                                 className="shopee-svg-icon icon-plus-sign">
                                                                                <polygon
                                                                                    points="10 4.5 5.5 4.5 5.5 0 4.5 0 4.5 4.5 0 4.5 0 5.5 4.5 5.5 4.5 10 5.5 10 5.5 5.5 10 5.5"></polygon>
                                                                            </svg>
                                                                        </button>
                                                                    </div>
                                                                </div>


                                                                <div className="_2S6DJl">
                                                                    {
                                                                        item.product.discount === 0 ?
                                                                            <span>₫ <NumberFormat
                                                                                value={item.product.price * item.soLuong}
                                                                                displayType={'text'}
                                                                                thousandSeparator={true}/></span>
                                                                            :
                                                                            <span>₫ <NumberFormat
                                                                                value={this.getDiscountPrice(item.product.price, item.product.discount) * item.soLuong}
                                                                                displayType={'text'}
                                                                                thousandSeparator={true}/> </span>
                                                                    }

                                                                </div>

                                                                <div className="_1-z5aG _1AeN8q">

                                                                    <button className="Lur7Ey"
                                                                            onClick={event => this.removeFromCart(event, item.product.id)}>{t('Cart.cart_delete')}
                                                                    </button>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                            )

                                        }


                                    </div>

                                    <div className="_2qn3bA">
                                        <div className="CsNHbu -Gs_Ma">
                                            <div className="_2n5_2u"></div>
                                            <button className={"clear-btn-style j9RJQY"} onClick={this.clearItems}
                                                    style={{fontWeight: "bold"}}>{t('Cart.cart_clear')}
                                            </button>
                                            <div className="_2n5_2u"></div>
                                            <div className="_3p5aR1">
                                                <div className="_2nE2iF">
                                                    <div className="_2LXtFJ">
                                                        <div className="_333O5j"
                                                             style={{fontWeight: "bold"}}>{t('Cart.cart_total')}
                                                            ({this.state.numberOfItems} {t('Cart.cart_product')}):
                                                        </div>
                                                        <div className="ZxTZV3"
                                                             style={{fontWeight: "bold"}}>₫ <NumberFormat
                                                            value={this.state.total}
                                                            displayType={'text'}
                                                            thousandSeparator={true}/> </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <button className="shopee-button-solid shopee-button-solid--primary"
                                                    onClick={this.checkOut}>
                                                <span className="_3zK-FN">{t('Cart.cart_check')}</span>
                                            </button>
                                        </div>
                                    </div>

                                </div>


                            </div>
                        </div>
                    </div>
                    :
                    <div></div>
            }
            </body>
        )
    }
}

export default withTranslation()(withRouter(Cart));