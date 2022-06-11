import React from "react";
import Navbar from "../../components/OneForAll/Navbar"
import { withRouter } from "react-router-dom";
import './css/detail.css';
import ProductService from "../../services/ProductService";


class ProductDetail extends React.Component {

       constructor(props) {
              super(props);
              this.state = {
                     product: {},
                     category: {}
              }
       }

       componentDidMount() {
              let { id } = this.props.match.params;
              console.log("Product's id:" + id);
              ProductService.getProductDetail(id).then((response) => {
                     this.setState({
                            product: response.data,
                            category: response.data.categories
                     })
                     console.log("Product: " + JSON.stringify(this.state.product));
                     console.log("Image:" + this.state.category.name);
              })
       }

       getDiscountPrice(oldPrice, discount) {
              const result = oldPrice * (100 - discount) / 100;
              return result;
       }

       //Lấy file ảnh của product và đưa vào đường dẫn đến file
       getImage() {
              return {
                     img: this.state.product.image && require(`../../assets/bookStudent/${this.state.product.image}`)
              }
       }

       getCategory() {
              return {
                     cate: JSON.stringify(this.state.product.categories.name)
              }
       }


       render() {
              return (
                     <body>
                            <Navbar />
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
                                                                                                                       <img src={this.getImage().img} className="fhs-p-img" alt="" />
                                                                                                                </div>
                                                                                                         </div>

                                                                                                         <div className="product_view_add_box">
                                                                                                                <button type="button" title="Thêm vào giỏ hàng" className="btn-cart-to-cart" ><span className="fhs_icon_cart"></span><span>Thêm vào giỏ hàng</span></button>
                                                                                                                <button type="button" title="Mua ngay" is_buynow="true" className="btn-buy-now"><span>Mua ngay</span></button>
                                                                                                         </div>
                                                                                                  </div>

                                                                                                  <div className="product-essential-detail">
                                                                                                         <h1 style={{ color: "white" }}>{this.state.product.name}</h1>
                                                                                                         <div className="product-view-sa">
                                                                                                                <div className="product-view-sa_one">
                                                                                                                       <div className="product-view-sa-supplier">
                                                                                                                              <span>Nhà cung cấp:</span>  <span>1980 Books</span>
                                                                                                                       </div>
                                                                                                                       <div className="product-view-sa-author">
                                                                                                                              <span>Tác giả:</span><span>{this.state.product.author}</span>

                                                                                                                       </div>
                                                                                                                </div>

                                                                                                                <div className="product-view-sa_two">
                                                                                                                       <div className="product-view-sa-supplier">
                                                                                                                              <span>Nhà xuất bản:</span><span>{this.state.product.nxb}</span>
                                                                                                                       </div>
                                                                                                                       <div className="product-view-sa-author">
                                                                                                                              <span>Hình thức bìa:</span><span>Bìa Mềm</span>
                                                                                                                       </div>
                                                                                                                </div>

                                                                                                         </div>

                                                                                                         <div className="col-md-12 price-block desktop_only">
                                                                                                                <div id="catalog-product-details-price" className="catalog-product-details-price product_price price-block-left">
                                                                                                                       <div className="price-box">

                                                                                                                              {
                                                                                                                                     this.state.product.discount === 0 ?
                                                                                                                                            <p className="special-price">
                                                                                                                                                   <span className="price-label">Special Price</span>
                                                                                                                                                   <span className="price" id="product-price-395589">{this.state.product.price} đ</span>
                                                                                                                                            </p>
                                                                                                                                            :
                                                                                                                                            <div className="price-box">
                                                                                                                                                   <p className="special-price">
                                                                                                                                                          <span className="price-label">Special Price</span>
                                                                                                                                                          <span className="price" id="product-price-395589">{this.getDiscountPrice(this.state.product.price, this.state.product.discount)} đ</span>
                                                                                                                                                   </p>
                                                                                                                                                   <p className="old-price">
                                                                                                                                                          <span style={{ color: "white" }} className="price" id="old-price-395589">{this.state.product.price}đ</span>
                                                                                                                                                          <span className="discount-percent">{this.state.product.discount}%</span>
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
                                                                                                                              Chính sách đổi trả
                                                                                                                       </div>
                                                                                                                       <div>
                                                                                                                              <div>
                                                                                                                                     Đổi trả sản phẩm trong 30 ngày
                                                                                                                              </div>
                                                                                                                       </div>
                                                                                                                </div>
                                                                                                         </div>
                                                                                                         <div className="clear"></div>
                                                                                                         <div id="catalog-product-details-discount">
                                                                                                                <div class="product-view-quantity-box">
                                                                                                                       <label style={{ color: "white" }} for="qty">Số lượng:</label>
                                                                                                                       <div className="product-view-quantity-box-block">
                                                                                                                              <a className="btn-subtract-qty">
                                                                                                                                     <img style={{ width: 12 }} src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/ico_minus2x.png" />
                                                                                                                              </a>
                                                                                                                              <input type="text" name="qty" id="qty" max={999} min={1} value="1" title="SL" className="input-text qty"></input>
                                                                                                                              <a className="btn-add-qty">
                                                                                                                                     <img style={{ width: 12 }} src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/ico_plus2x.png" />
                                                                                                                              </a>

                                                                                                                       </div>

                                                                                                                </div>


                                                                                                         </div>

                                                                                                  </div>

                                                                                           </div>
                                                                                           <div className="clear"></div>

                                                                                    </div>
                                                                             </form>

                                                                             <div className="product-collateral">
                                                                                    <div className="content product_view_content">
                                                                                           <div className="product_view_content-title">Thông tin sản phẩm </div>
                                                                                           <div className="product_view_tab_content_ad">
                                                                                                  <div className="product_view_tab_content_additional">
                                                                                                         <table className="data-table table-additional">
                                                                                                                <colgroup>
                                                                                                                       <col width="25%" ></col>
                                                                                                                </colgroup>
                                                                                                                <tbody>
                                                                                                                       <tr>
                                                                                                                              <th className="tabel-label">Mã hàng</th>
                                                                                                                              <td className="data_saku">{this.state.product.id}</td>
                                                                                                                       </tr>
                                                                                                                       <tr>
                                                                                                                              <th className="tabel-label">Nhà cung cấp</th>
                                                                                                                              <td className="data_saku">1980 Books</td>
                                                                                                                       </tr>
                                                                                                                       <tr>
                                                                                                                              <th className="tabel-label">Tác giả</th>
                                                                                                                              <td className="data_saku">{this.state.product.author}</td>
                                                                                                                       </tr>
                                                                                                                       <tr>
                                                                                                                              <th className="tabel-label">NXB</th>
                                                                                                                              <td className="data_saku">{this.state.product.nxb}</td>
                                                                                                                       </tr>
                                                                                                                       <tr>
                                                                                                                              <th className="tabel-label">Ngày cập nhật</th>
                                                                                                                              <td className="data_saku">{this.state.product.date}</td>
                                                                                                                       </tr>
                                                                                                                       <tr>
                                                                                                                              <th className="tabel-label">Thể loại</th>
                                                                                                                              <td className="data_saku">{this.state.category.name}</td>
                                                                                                                       </tr>
                                                                                                                       <tr>
                                                                                                                              <th className="tabel-label">Ngôn Ngữ</th>
                                                                                                                              <td className="data_saku">Tiếng Anh</td>
                                                                                                                       </tr>
                                                                                                                       <tr>
                                                                                                                              <th className="tabel-label">Trạng thái</th>
                                                                                                                              {
                                                                                                                                     this.state.product.available == 1 ?
                                                                                                                                            < td className="data_saku">Còn</td>
                                                                                                                                            :
                                                                                                                                            < td className="data_saku">Hết</td>
                                                                                                                              }
                                                                                                                       </tr>
                                                                                                                </tbody>
                                                                                                         </table>
                                                                                                  </div>
                                                                                                  <div className="clear"></div>
                                                                                                  <div className="product_view_content-title">Mô tả sản phẩm </div>
                                                                                                  <div id="product_tabs_description_contents">
                                                                                                         <div id="desc_content" className="std">
                                                                                                                <p style={{ textAlign: "justify", color: "white" }}>
                                                                                                                       <strong>{this.state.product.name}</strong>
                                                                                                                </p>
                                                                                                                <p style={{ textAlign: "justify", color: "white" }}>
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
                     </body >

              )

       }
}

export default withRouter(ProductDetail);