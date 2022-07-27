import React, {Component} from "react";
import {withRouter} from "react-router";
import styled from "styled-components";
import ProductService from "../../services/ProductService";
import {storage} from "../../config/firebase/firebase";
import {Link} from "react-router-dom";
import CartInfoValidator from "../../services/CartInfo-Validator";

class InfoPro extends Component {

    constructor(props) {
        super(props)
        this.componentDidMount = this.componentDidMount.bind(this)
        this.state = {
            categories: [],
            nameB: "",
            author: "",
            nxb: "",
            price: "",
            discount: 0,
            quantity: "",
            description: "",
            category: "",
            imageURL: "",
            date: "",
            category_id: 0,
        }

    }

    componentDidMount() {
        let {id} = this.props.match.params;
        ProductService.getProductDetail(id).then(
            res => {
                this.setState({
                    nameB: res.data.name,
                    author: res.data.author,
                    nxb: res.data.nxb,
                    price: res.data.price,
                    discount: res.data.discount,
                    quantity: res.data.quantity,
                    description: res.data.description,
                    imageURL: res.data.image,
                    category: res.data.categories.name,
                    available: res.data.available,
                    date: res.data.date,
                    category_id: res.data.categories.category_id
                })
            }
        )
        //get all product
        ProductService.getCategory().then(
            res => {
                this.setState({categories: res.data})
            }
        )
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handleInputCategory = (e) => {
        e.preventDefault(e);
        const id = this.refName.value;
        this.setState({
            category_id: id,
        })
    }

    fileSelectedHandler = async (e) => {
        const file = e.target.files[0];
        const today = new Date()
        const storageRef = storage.ref(`listImageProducts/`)
        const fileRef = storageRef.child(file.name + ":" + today.getMilliseconds() + ":" + today.getMinutes())
        await fileRef.put(file)
        const fileUrl = await fileRef.getDownloadURL()
        this.setState({}, () => {
            this.setState({
                imageURL: fileUrl
            })
        });
    }

    editProduct = (e) => {
        e.preventDefault();
        let {id} = this.props.match.params;
        const current = new Date();
        const currentDate = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

        let dis;
        if (this.state.discount === null) {
            dis = 0;
        } else {
            dis = this.state.discount
        }

        let avai;
        if (this.state.quantity > 0) {
            avai = true;
        } else {
            avai = false;
        }

        let product = {
            name: this.state.nameB,
            image: this.state.imageURL,
            author: this.state.author,
            nxb: this.state.nxb,
            price: Number(this.state.price),
            discount: Number(this.state.discount),
            description: this.state.description,
            date: currentDate,
            quantity: Number(this.state.quantity),
            available: avai,
            category: Number(this.state.category_id),
        }

        console.log(JSON.stringify(product));
        ProductService.editProduct(id, product);
        this.props.history.push("/adminDashBoard");
        window.location.reload();

    }


    render() {
        return (
            <Div>
                <div className="Information_Detail">
                    <h1>Chỉnh sửa sản phẩm</h1>
                    <form>
                        <div className="infor1">
                            <div className="inforData">
                                <div className="name_book">
                                    <p>Tên sách</p>
                                    <input
                                        value={this.state.nameB}
                                        type="text" name="nameB" id="" onChange={this.handleInput}/>
                                </div>




                                <div className="author_nxb">
                                    <div className="author">
                                        <p>Tác giả</p>
                                        <input
                                            value={this.state.author}
                                            type="text" name="author" onChange={this.handleInput} id=""/>


                                    </div>
                                    <div className="nxb">
                                        <p>Nhà xuất bản</p>
                                        <input
                                            value={this.state.nxb}
                                            type="text" name="nxb" onChange={this.handleInput} id=""/>




                                    </div>
                                </div>
                                <div className="price_quantity">
                                    <div className="price">
                                        <p style={{fontSize: "20px"}}>Giá</p>
                                        <input style={{fontSize: "20px"}}
                                               value={this.state.price}
                                               type="text" name="price" id="" onChange={this.handleInput}/>

                                    </div>

                                    <div className="price">
                                        <p style={{fontSize: "20px"}}>Giảm Giá</p>
                                        <input
                                            type="text" style={{fontSize: "20px"}} value={this.state.discount}
                                            name="discount" id="" onChange={this.handleInput}/>
                                    </div>


                                    <div className="quantity">
                                        <p>Số lượng còn lại</p>
                                        <input
                                            value={this.state.quantity}
                                            type="text" name="quantity" id="" onChange={this.handleInput}/>


                                    </div>
                                </div>
                                <div className="description">
                                    <p>Mô tả sách</p>
                                    <textarea style={{textAlign: "justify"}}
                                              value={this.state.description}
                                              rows="9" cols="70" name="description" form="usrform"
                                              onChange={this.handleInput}>
                                    </textarea>
                                   
                                </div>
                            </div>
                            <div className="inforImage">
                                <div className="dateCreate">
                                    <p>Ngày đăng </p>
                                    <p>{this.state.date}</p>
                                </div>
                                <div className="status">
                                    <p>Trạng thái</p>
                                    <p>{this.state.available ? "Còn hàng" : "Hết hàng"} </p>
                                </div>
                                <hr/>
                                <div className="category">
                                    <p>Phân loại sách</p>
                                    <select value={this.state.category_id} name="category_id" id=""
                                            onChange={this.handleInputCategory} ref={value => this.refName = value}>
                                        {
                                            this.state.categories.map(category =>
                                                <option value={category.category_id}>{category.name}</option>
                                            )
                                        }

                                    </select>
                                </div>
                                <div className="imageProduct">
                                    <p>Ảnh sản phẩm
                                        <label htmlFor="change-img">
                                            <i type="file" className="fa fa-pencil"></i>
                                            <input
                                                id="change-img"
                                                hidden type="file"
                                                accept="image/png, image/jpeg"
                                                onChange={this.fileSelectedHandler}
                                            />
                                        </label>
                                    </p>
                                    <div className="image">
                                        <img src={this.state.imageURL} alt=""/>
                                    </div>
                                </div>


                                <div className="imageProduct">
                                    <button className={"w3-btn-insert"} type={"button"}
                                            onClick={this.editProduct}>Lưu
                                    </button>
                                    <Link to={"/adminDashBoard"}>
                                        <button className={"w3-btn-cancel"}>Hủy</button>
                                    </Link>

                                </div>


                            </div>
                        </div>
                    </form>
                </div>
            </Div>
        )
    }
}

export default withRouter(InfoPro);
const Div = styled.div`
  /* ================ Colors ============= */
  /* --primary-color:#3a3b3c;
  --panel-color:#242526;
  --text-color:#ccc;
  --black-light-color:#ccc;
  --border-color:#4d4c4c;
  --toggle-color:#fff;
  --box1-color:#3a3b3c;
  --box2-color:#3a3b3c;
  --box3-color:#3a3b3c;
  --title-icon-color:#ccc; */


  /* ============ Trasition =============== */
  /* --tran-05:all 0.5s ease;
  --tran-03:all 0.5s ease;
  --tran-03:all 0.5s ease; */

  .Information_Detail {
    padding-top: 60px;
    font-size: 20px;
    margin-left: 250px;
    width: calc(100% - 250px);
    transition: var(--tran-05);
    color: var(--text-color);

    .infor1 {
      display: flex;
      justify-content: space-around;

      .inforData {
        border: 1px solid var(--border-color);
        padding: 20px 20px 20px 20px;
        box-shadow: 0px 0px 9px 5px #0c050519;
        border-radius: 5px;

        input {
          border: 2px solid var(--border-color);
          color: #000;
        }

        textarea {
          color: #000;
        }

        .author_nxb {
          display: flex;
          justify-content: space-between;
        }

        .price_quantity {
          display: flex;
          justify-content: space-between;
        }
      }

      .inforImage {
        border: 1px solid var(--border-color);
        padding: 20px 20px 20px 20px;
        box-shadow: 0px 0px 9px 5px #0c050519;
        border-radius: 5px;

        .dateCreate {
          display: flex;
          justify-content: space-between;
          font-size: 15px;
        }

        .status {
          display: flex;
          justify-content: space-between;
          font-size: 15px;

        }

        select {
          color: #000;
        }

        .imageProduct {
          margin-top: 20px;

          .image {
            display: flex;
            justify-content: center;
            margin-top: 20px;
          }
        }
      }
    }
  }

  .w3-btn-insert {
    background-color: #4CAF50;
  !important;
    border-radius: 5px;
    font-size: 17px;
    font-family: 'Source Sans Pro', sans-serif;
    padding: 6px 10px;
    color: #FFFFFF;
  }

  .w3-btn-cancel {
    background-color: #bb2d3b;
  !important;
    border-radius: 5px;
    font-size: 17px;
    font-family: 'Source Sans Pro', sans-serif;
    padding: 6px 15px;
    color: #FFFFFF;
    margin-left: 16px !important;
  }

  .fhs_checkout_block .fhs-input-box.checked-error .fhs-input-group .fhs-textbox-alert {
    height: 18px;
    width: 18px;
    display: block;
    margin-top: 8px;
    color: #dc3545;
    margin-left: 154px;

  }

`;