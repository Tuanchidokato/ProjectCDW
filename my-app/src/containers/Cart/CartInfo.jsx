import React from "react";
import NumberFormat from 'react-number-format';
import {withRouter} from "react-router-dom";
import CartInfoValidator from "../../services/CartInfo-Validator";
import {withTranslation} from "react-i18next";
import './css/cartinfo.css';
import CartService from "../../services/CartService";
import authService from "../../services/auth.service";
import informationUserService from "../../services/InformationUser.service";
import {toast} from "react-toastify";


class CartInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            total: 0,
            name: "",
            email: "",
            address: "",
            phoneNumber: "",
            paymentType: "cash on delivery",
            errors: {}
        };


        const rules = [
            {
                field: 'name',
                method: 'isEmpty',
                validWhen: false,
                message: 'Thông tin này không thể để trống',
            },


            // {
            //     field: 'name',
            //     method: 'isAlpha',
            //     validWhen: true,
            //     message: 'Họ và tên không được có số'
            // },


            {
                field: 'name',
                method: 'isLength',
                args: [{min: 5}],
                validWhen: true,
                message: 'Họ và tên phải có 2 từ trở lên'
            },


            {
                field: 'email',
                method: 'isEmpty',
                validWhen: false,
                message: 'Thông tin này không thể để trống',
            },

            {
                field: 'email',
                method: 'isEmail',
                validWhen: true,
                message: 'Email không hợp lệ',
            },

            {
                field: 'phoneNumber',
                method: 'isEmpty',
                validWhen: false,
                message: 'Thông tin này không thể để trống',
            },

            {
                field: 'phoneNumber',
                method: 'isLength',
                args: [{min: 10, max: 10}],
                validWhen: true,
                message: 'Số điện thoại phải 10 chữ số',
            },

            {
                field: 'phoneNumber',
                method: 'isNumeric',
                validWhen: true,
                message: 'Số điện thoại chỉ gồm số',
            },

            {
                field: 'address',
                method: 'isEmpty',
                validWhen: false,
                message: 'Thông tin này không thể để trống',
            },

        ];

        this.validator = new CartInfoValidator(rules);
        this.setPaymentType = this.setPaymentType.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }


    componentDidMount() {
        //Get user info
        const user = authService.getCurrentUser();
        informationUserService.getInformationUser(user.id).then((response) => {
            this.setState({
                name: response.data.data.lastName + response.data.data.firstName,
                email: response.data.data.user.email,
                phoneNumber: "" + response.data.data.phoneNumber
            });
            console.log(JSON.stringify(response.data.data));
        }, error => {
            toast.error("something went wrong");
        });

        CartService.getItemListCart().then((response) => {
            this.setState({
                items: response.data.items, total: response.data.total
            });
            console.log("items" + JSON.stringify(this.state.items));
            console.log(JSON.stringify(response.data));
        });
    }

    setPaymentType = (e) => {
        this.setState({
            paymentType: e.target.value
        });
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.validator.validate(this.state);

        if (this.validator.isValid === true) {
            const address = this.inputNode.value;
            const payment = this.state.paymentType;
            CartService.handlingCart(address, payment);
            this.props.history.push("/");
            window.location.reload();

        } else {
            this.setState({
                errors: this.validator.validate(this.state),
            });
        }

    };

    getDiscountPrice(oldPrice, discount) {
        const result = oldPrice * (100 - discount) / 100;
        return result;
    }

    render() {
        const {t, i18n} = this.props;
        return (<body>
        <div className="page">
            <div className="main-container col1-layout no-margin-top">

                <div className="col-main">
                    <div className="container">

                        <div className="container-inner">
                            <form>
                                <ul id="admin_message"></ul>
                                <div className="fhs-co-banner"></div>

                                <div id="fhs_checkout_block_address" className="fhs_checkout_block">
                                    <div
                                        className="fhs_checkout_block_title">{t('Check_out.check_shippingAddress')}</div>
                                    <div className="fhs_checkout_block_content">
                                        <div className="fhs_checkout_block_address_block">
                                            <div className="fhs-input-box fhs-input-group-horizontal-shippingaddress">
                                                <label>{t('Check_out.check_recipient')}</label>
                                                <div className="fhs-input-item">
                                                    <div className="fhs-input-group">

                                                        <input required
                                                               className="fhs-textbox require_check check_shipping_address"
                                                               type="text"
                                                               placeholder={t('Check_out.check_recipient_placeholder')}
                                                               id="fhs_shipping_fullname" name="name"
                                                               defaultValue={this.state.name}
                                                               onChange={this.handleInput}

                                                        />

                                                        {this.state.errors.name && <span
                                                            className={"fhs-input-icon fhs-textbox-alert"}></span>}
                                                    </div>

                                                </div>
                                                {this.state.errors.name &&
                                                    <div className={"fhs-input-alert"}>{this.state.errors.name}</div>}
                                            </div>

                                            <div className="fhs-input-box fhs-input-group-horizontal-shippingaddress">
                                                <label>{t('Check_out.check_email')}</label>
                                                <div className="fhs-input-item">
                                                    <div className="fhs-input-group">
                                                        <input
                                                            className="fhs-textbox require_check check_shipping_address"
                                                            type="email"
                                                            placeholder={t('Check_out.check_email_placeholder')}
                                                            id="fhs_shipping_email" name="email"
                                                            defaultValue={this.state.email} onChange={this.handleInput}
                                                        />
                                                        {this.state.errors.email && <span
                                                            className={"fhs-input-icon fhs-textbox-alert"}></span>}
                                                    </div>

                                                </div>
                                                {this.state.errors.email &&
                                                    <div className={"fhs-input-alert"}>{this.state.errors.email}</div>}
                                            </div>

                                            <div className="fhs-input-box fhs-input-group-horizontal-shippingaddress">
                                                <label>{t('Check_out.check_phoneNumber')}</label>
                                                <div className="fhs-input-item">
                                                    <div className="fhs-input-group">
                                                        <input
                                                            className="fhs-textbox require_check check_shipping_address"
                                                            type="text"
                                                            placeholder={t('Check_out.check_phoneNumber_placeholder')}
                                                            id="fhs_shipping_telephone" name="phoneNumber"
                                                            defaultValue={this.state.phoneNumber}
                                                            onChange={this.handleInput}
                                                        />
                                                        {this.state.errors.phoneNumber && <span
                                                            className={"fhs-input-icon fhs-textbox-alert"}></span>}
                                                    </div>
                                                </div>
                                                {this.state.errors.phoneNumber &&
                                                    <div
                                                        className={"fhs-input-alert"}>{this.state.errors.phoneNumber}</div>}
                                            </div>

                                            <div className="fhs-input-box fhs-input-group-horizontal-shippingaddress">
                                                <label>{t('Check_out.check_address')}</label>
                                                <div className="fhs-input-item">
                                                    <div className="fhs-input-group">
                                                        <input
                                                            className="fhs-textbox require_check check_shipping_address"
                                                            type={"text"}
                                                            placeholder={t('Check_out.check_address_placeholder')}
                                                            id="fhs_shipping_street" name="address"
                                                            onChange={this.handleInput}
                                                            ref={node => (this.inputNode = node)}
                                                        />
                                                        {this.state.errors.address && <span
                                                            className={"fhs-input-icon fhs-textbox-alert"}></span>}
                                                    </div>
                                                </div>
                                                {this.state.errors.address &&
                                                    <div
                                                        className={"fhs-input-alert"}>{this.state.errors.address}</div>}
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div id="fh_checkout_block_shippingmethod" className="fhs_checkout_block">
                                    <div className="fhs_checkout_block_title">{t('Check_out.check_shipMethod')}
                                    </div>
                                    <div className="fhs_checkout_block_content">
                                        <div className="fhs_checkout_block_radio_list">
                                            <div className="fhs_checkout_block_radio_list_title"></div>
                                            <div id="fhs_checkout_shippingmethod_msg"
                                                 className="fhs_checkout_block_radio_list_msg">{t('Check_out.check_sorry')}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className={"fhs_checkout_block"}>
                                    <div className="fhs_checkout_block_title">{t('Check_out.check_payment')}</div>
                                    <div className="fhs_checkout_block_content">
                                        <div className="fhs_checkout_block_radio_list">
                                            <div>
                                                <ul className={"fhs_checkout_block_radio_list_items"}>
                                                    <li className={"fhs_checkout_block_radio_list_item vnpay"}>
                                                        <div className={"fhs_checkout_paymentmethod_with_tutorial"}>
                                                            <div className={"fhs-radio-big-with-icon-container"}>
                                                                <label
                                                                    className={"fhs-radio-big fhs-raido-big-with-icon"}>
                                                                    <div
                                                                        className={"fhs-payment-name-with-icon-container"}>
                                                                        <div className={"vnpay-icon"}></div>
                                                                        <div className={"fhs-payment-name"}>PayPal</div>
                                                                        <input type={"radio"}
                                                                               id="fhs_checkout_paymentmethod_vnpay"
                                                                               name="fhs_checkout_paymentmethod_option"
                                                                               className="fhs_checkout_paymentmethod_option"
                                                                               value="paypal"
                                                                               onChange={event => this.setPaymentType(event)}/>
                                                                        <span className="radiomark-big"></span>
                                                                    </div>

                                                                </label>
                                                            </div>
                                                        </div>
                                                    </li>

                                                    <li className={"fhs_checkout_block_radio_list_item cashondelivery"}>
                                                        <div className={"fhs_checkout_paymentmethod_with_tutorial"}>
                                                            <div className={"fhs-radio-big-with-icon-container"}>
                                                                <label
                                                                    className={"fhs-radio-big fhs-raido-big-with-icon"}>
                                                                    <div
                                                                        className={"fhs-payment-name-with-icon-container"}>
                                                                        <div className={"cashdelivery-icon"}></div>
                                                                        <div
                                                                            className={"fhs-payment-name"}>{t('Check_out.check_cash')}</div>
                                                                        <input type={"radio"}
                                                                               id="fhs_checkout_paymentmethod_vnpay"
                                                                               name="fhs_checkout_paymentmethod_option"
                                                                               className="fhs_checkout_paymentmethod_option"
                                                                               checked={true}
                                                                               value="cash on delivery"
                                                                               onChange={event => this.setPaymentType(event)}/>
                                                                        <span className="radiomark-big"></span>
                                                                    </div>

                                                                </label>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className={"fhs_checkout_block"}>
                                    <div className="fhs_checkout_block_title">{t('Check_out.check_cartAgain')}</div>
                                    <div className="fhs_checkout_block_content">
                                        <div id={"fhs_checkout_products"} className={"fhs_checkout_products"}>
                                            {this.state.items.map(item => <div className={"fhs_checkout_products_item"}>

                                                <div className={"fhs_checkout_products_item_img"}>
                                                    <img
                                                        src={require('../../assets/bookStudent/' + item.product.image)}/>
                                                </div>

                                                <div className={"fhs_checkout_products_item_detail"}>
                                                    <div className={"fhs_checkout_products_item_name"}>
                                                        <div style={{color: "white"}}>{item.product.name}</div>
                                                    </div>

                                                    {
                                                        item.product.discount === 0 ?

                                                            <div className={"fhs_checkout_products_item_price"}>
                                                                <div style={{color: "white"}}>{item.product.price}</div>
                                                            </div>
                                                            :
                                                            <div className={"fhs_checkout_products_item_price"}>
                                                                <div
                                                                    style={{color: "white"}}><NumberFormat
                                                                    value={this.getDiscountPrice(item.product.price, item.product.discount)}
                                                                    displayType={'text'}
                                                                    thousandSeparator={true}/>
                                                                    đ
                                                                </div>
                                                                <div
                                                                    className={"fhs_checkout_products_item_original_price"}>
                                                                    <NumberFormat
                                                                        value={item.product.price}
                                                                        displayType={'text'}
                                                                        thousandSeparator={true}/>
                                                                    đ
                                                                </div>
                                                            </div>
                                                    }

                                                    <div className={"fhs_checkout_products_item_qty"}>
                                                        {item.soLuong}
                                                    </div>
                                                    {
                                                        item.product.discount === 0 ?
                                                            <div
                                                                className={"fhs_checkout_products_item_total"}>
                                                                <NumberFormat
                                                                    value={item.product.price * item.soLuong}
                                                                    displayType={'text'}
                                                                    thousandSeparator={true}/> đ</div>
                                                            :
                                                            <div
                                                                className={"fhs_checkout_products_item_total"}> <NumberFormat
                                                                value= {this.getDiscountPrice(item.product.price, item.product.discount) * item.soLuong}
                                                                displayType={'text'}
                                                                thousandSeparator={true}/> đ</div>
                                                    }

                                                </div>

                                            </div>)}


                                        </div>
                                    </div>
                                </div>

                                <div className={"fhs_checkout_block"}>

                                    <div className="fhs_checkout_total fhs_checkout_total_desktop">
                                        <div className="fhs_checkout_total_subtotal">
                                            <div style={{color: "white"}}>{t('Check_out.check_total')}</div>
                                            <div style={{color: "white"}}><NumberFormat
                                                value={this.state.total}
                                                displayType={'text'}
                                                thousandSeparator={true}/> đ
                                            </div>
                                        </div>
                                        <div className="fhs_checkout_total_grand_total">
                                            <div
                                                style={{color: "white"}}>{t('Check_out.check_total')} ({t('Check_out.check_include')} VAT)
                                            </div>
                                            <div><NumberFormat
                                                value={this.state.total}
                                                displayType={'text'}
                                                thousandSeparator={true}/> đ
                                            </div>
                                        </div>
                                    </div>
                                    <div className="fhs_checkout_block_content">
                                        <div className="fhs_checkout_bottom">
                                            <div>
                                                <div className="fhs_checkout_total_grand_total">
                                                    <div>{t('Check_out.check_total')} ({t('Check_out.check_include')} VAT)</div>
                                                    <div><NumberFormat
                                                        value={this.state.total}
                                                        displayType={'text'}
                                                        thousandSeparator={true}/> đ
                                                    </div>
                                                </div>
                                                <div><a href="/Cart"><span
                                                    style={{paddingRight: "8px", color: "white"}}><img
                                                    src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/btn_back.svg?q=101075"/></span><span
                                                    style={{color: "white"}}>{t('Check_out.check_back')}</span></a>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="fhs-btn-box">
                                                    <button type={"button"} title="Xác nhận thanh toán"
                                                            onClick={this.handleSubmit}
                                                            className="fhs-btn-confirm fhs-btn-orderconfirm">
                                                        <span>{t('Check_out.check_order')}</span></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>

            </div>
        </div>
        </body>)
    }
}

export default withTranslation()(withRouter(CartInfo));
