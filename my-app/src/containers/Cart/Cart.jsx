import React from "react";
import './css/cart.css';
import Navbar from "../../components/OneForAll/Navbar"
import { withRouter } from "react-router-dom";
import CartService from "../../services/CartService";
import axios from "axios";
import authService from "../../services/auth.service";

const API_URL = "http://localhost:8080/api/auth/cart";


class Cart extends React.Component {

       constructor(props) {
              super(props);
              this.state = {
                     items: [],
                     numberOfItems: 0,
                     total: 0,
                     user_id: 0
              }

       }

       handleCart() {
              const user = authService.getCurrentUser();
              var headers = {
                     'Content-Type': 'application/json',
                     'Access-Control-Allow-Credentials': true
              };
              axios.defaults.withCredentials = true;
              axios.post(API_URL + "/handleCart", user, headers);
       }

       componentDidMount() {
              CartService.getItemListCart().then((response) => {
                     this.setState({
                            items: response.data.items,
                            numberOfItems: response.data.numberOfItems,
                            total: response.data.total
                     });

                     console.log("items" + JSON.stringify(this.state.items));
                     console.log(JSON.stringify(response.data));
              })
       }

       getDiscountPrice(oldPrice, discount) {
              const result = oldPrice * (100 - discount) / 100;
              return result;
       }

       render() {
              return (
                     <body>
                            <Navbar />
                            <div className="di">
                                   <div className="_9_5_1E">
                                          <div style={{ display: "block" }}>
                                                 <div className="container">
                                                        <div className="_2REryK" style={{ marginBottom: 0 }}>
                                                               <div className="_2eZQze">
                                                                      <div className="_35gBGg">
                                                                             <label className="stardust-checkbox">
                                                                                    <input className="stardust-checkbox_input" type={"checkbox"} />
                                                                                    <div className="stardust-checkbox_box"></div>
                                                                             </label>
                                                                      </div>
                                                                      <div className="_2cHnzN">Sản phẩm</div>
                                                                      <div className="_2UJcxH">Đơn giá</div>
                                                                      <div className="_1SKeIp">Số lượng</div>
                                                                      <div className="_2LUhSC">Số tiền</div>
                                                                      <div className="HHdkhO">Thao tác</div>
                                                               </div>

                                                               {
                                                                      this.state.items.map(
                                                                             item =>
                                                                                    <div className="_1K9yK1">

                                                                                           <div className="_1BehlF">
                                                                                                  <div className="_-0yJ2-">

                                                                                                         <div className="_1Lgvsy">
                                                                                                                <label className="stardust-checkbox">
                                                                                                                       <input className="stardust-checkbox_input" type={"checkbox"} />
                                                                                                                       <div className="stardust-checkbox_box"></div>
                                                                                                                </label>
                                                                                                         </div>
                                                                                                         <div className="_1Z2fe1">
                                                                                                                <div className="_3mceb9">
                                                                                                                       <a title={item.product.name} href="/">
                                                                                                                              <img className="_25vezo" src={require('../../assets/bookStudent/' + item.product.image)} alt="" />
                                                                                                                       </a>
                                                                                                                       <div className="_1WfuBi">
                                                                                                                              <a className="_3t5Sij" title={item.product.name} href="">{item.product.name}</a>
                                                                                                                       </div>
                                                                                                                </div>
                                                                                                         </div>
                                                                                                         <div className="_34KJXV"></div>
                                                                                                         <div className="_1C6zuo">


                                                                                                                <div>
                                                                                                                       {
                                                                                                                              item.product.discount === 0 ?

                                                                                                                                     <span className="_1E5-FE">₫{item.product.price}</span>
                                                                                                                                     :
                                                                                                                                     <div>
                                                                                                                                            <span className="_1E5-FE _1PSxs0">₫{item.product.price}</span>
                                                                                                                                            <span className="_1E5-FE">₫{this.getDiscountPrice(item.product.price, item.product.discount)}</span>
                                                                                                                                     </div>


                                                                                                                       }


                                                                                                                </div>
                                                                                                         </div>

                                                                                                         <div className="_2vZsK0">
                                                                                                                <div className="_3he7rw">
                                                                                                                       <button className="_3Ell0h">
                                                                                                                              <svg enable-background="new 0 0 10 10" viewBox="0 0 10 10" x="0" y="0" className="shopee-svg-icon"><polygon points="4.5 4.5 3.5 4.5 0 4.5 0 5.5 3.5 5.5 4.5 5.5 10 5.5 10 4.5"></polygon></svg>
                                                                                                                       </button>
                                                                                                                       <input className="_3Ell0h _37H5-t" type={"text"} value={item.soLuong} />
                                                                                                                       <button className="_3Ell0h">
                                                                                                                              <svg enable-background="new 0 0 10 10" viewBox="0 0 10 10" x="0" y="0" className="shopee-svg-icon icon-plus-sign"><polygon points="10 4.5 5.5 4.5 5.5 0 4.5 0 4.5 4.5 0 4.5 0 5.5 4.5 5.5 4.5 10 5.5 10 5.5 5.5 10 5.5"></polygon></svg>
                                                                                                                       </button>
                                                                                                                </div>
                                                                                                         </div>

                                                                                                         <div className="_2S6DJl">
                                                                                                                <span>₫{item.product.price}</span>
                                                                                                         </div>

                                                                                                         <div className="_1-z5aG _1AeN8q">
                                                                                                                <button className="Lur7Ey">Xóa</button>
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
                                                                      <div className="_3p5aR1">
                                                                             <div className="_2nE2iF">
                                                                                    <div className="_2LXtFJ">
                                                                                           <div className="_333O5j">Tổng thanh toán ({this.state.numberOfItems} Sản phẩm):</div>
                                                                                           <div className="ZxTZV3">₫{this.state.total}</div>
                                                                                    </div>
                                                                             </div>
                                                                      </div>
                                                                      <button className="shopee-button-solid shopee-button-solid--primary" onClick={this.handleCart}>
                                                                             <span className="_3zK-FN">Mua hàng</span>
                                                                      </button>
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

export default withRouter(Cart);