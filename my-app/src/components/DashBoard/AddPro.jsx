import React, {Component} from "react";
import {withRouter} from "react-router";
import styled from "styled-components";
import ProductService from "../../services/ProductService";
import {storage} from "../../config/firebase/firebase";
import {Link} from "react-router-dom";
import CartInfoValidator from "../../services/CartInfo-Validator";

class AddPro extends Component {

    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            nameB: "",
            author: "",
            nxb: "",
            price: 0,
            discount: 0,
            quantity: 0,
            description: "",
            category: 1,
            imageURL: "",
            errors: {}
        }

        const rules = [
            {
                field: 'nameB',
                method: 'isEmpty',
                validWhen: false,
                message: 'Thông tin này không thể để trống',
            },

            {
                field: 'author',
                method: 'isEmpty',
                validWhen: false,
                message: 'Thông tin này không thể để trống',
            },

            {
                field: 'price',
                method: 'isEmpty',
                validWhen: false,
                message: 'Thông tin này không thể để trống',
            },

            {
                field: 'price',
                method: 'isNumeric',
                validWhen: true,
                message: 'Chỉ được nhập số',
            },


            {
                field: 'quantity',
                method: 'isEmpty',
                validWhen: false,
                message: 'Thông tin này không thể để trống',
            },

            {
                field: 'quantity',
                method: 'isNumeric',
                validWhen: true,
                message: 'Chỉ được nhập số',
            },


            {
                field: 'description',
                method: 'isEmpty',
                validWhen: false,
                message: 'Thông tin này không thể để trống',
            },


            {
                field: 'nxb',
                method: 'isEmpty',
                validWhen: false,
                message: 'Thông tin này không thể để trống',
            },


        ];

        this.validator = new CartInfoValidator(rules);
        this.insertProduct = this.insertProduct.bind(this);
        this.handleInput = this.handleInput.bind(this)
        this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
        this.handleInputCategory = this.handleInputCategory.bind(this);

    }

    componentDidMount() {
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
            category: id,
        })

    }

    fileSelectedHandler = async (e) => {
        const file = e.target.files[0];
        const today = new Date()
        const storageRef = storage.ref(`listImageProducts/`)
        const fileRef = storageRef.child(file.name + ":" + today.getMilliseconds() + ":" + today.getMinutes())
        await fileRef.put(file)
        const fileUrl = await fileRef.getDownloadURL()
        console.log(fileUrl)
        this.setState({
            imageURL: fileUrl
        }, () => {
            this.componentDidMount();
        });
    }

    insertProduct = (e) => {
        e.preventDefault();

        const current = new Date();
        const currentDate = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

        let dis;
        if (this.state.discount === null) {
            dis = 0;
        } else {
            dis = this.state.discount
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
            available: true,
            category: Number(this.state.category),
        }

        this.validator.validate(this.state);

        if (this.validator.isValid === true) {
            console.log(JSON.stringify(product));
            ProductService.addProduct(product);
            this.props.history.push("/adminDashBoard");
        } else {
            this.setState({
                errors: this.validator.validate(this.state),
            });
        }

    }

    render() {
        return (

            <Div>
                <div className="Information_Detail">
                    <h1>Thêm sản phẩm</h1>
                    <form>
                        <div className="infor1">
                            <div className="inforData">
                                <div className="name_book">
                                    <p>Tên sách</p>
                                    <input
                                        type="text" name="nameB" id="" onChange={this.handleInput}/>

                                </div>

                                <div className="name_book">
                                    {this.state.errors.nameB &&
                                        <span className={"fhs-textbox-alert"}
                                              style={{color: "red"}}>{this.state.errors.nameB}</span>}
                                </div>


                                <div className="author_nxb">
                                    <div className="author">
                                        <p>Tác giả</p>
                                        <input
                                            type="text" name="author" id="" onChange={this.handleInput}/>

                                        {this.state.errors.author &&
                                            <span className={"fhs-textbox-alert"}
                                                  style={{color: "red"}}>{this.state.errors.author}</span>}
                                    </div>

                                    <div className="nxb">
                                        <p>Nhà xuất bản</p>
                                        <input
                                            type="text" name="nxb" id="" onChange={this.handleInput}/>
                                        {this.state.errors.nxb &&
                                            <span className={"fhs-textbox-alert"}
                                                  style={{color: "red"}}>{this.state.errors.nxb}</span>}
                                    </div>
                                </div>
                                <div className="price_quantity">
                                    <div className="price">
                                        <p style={{fontSize: "20px"}}>Giá</p>
                                        <input
                                            type="text" name="price" id="" onChange={this.handleInput}/>
                                        {this.state.errors.price &&
                                            <span className={"fhs-textbox-alert"}
                                                  style={{
                                                      color: "red",
                                                      fontSize: "20px"
                                                  }}>{this.state.errors.price}</span>}
                                    </div>

                                    <div className="price">
                                        <p style={{fontSize: "20px"}}>Giảm Giá</p>
                                        <input
                                            type="text" name="discount" id="" onChange={this.handleInput}/>
                                    </div>

                                    <div className="quantity">
                                        <p>Số lượng</p>
                                        <input
                                            type="text" name="quantity" id="" onChange={this.handleInput}/>
                                        {this.state.errors.quantity &&
                                            <span className={"fhs-textbox-alert"}
                                                  style={{color: "red"}}>{this.state.errors.quantity}</span>}
                                    </div>
                                </div>
                                <div className="description">
                                    <p>Mô tả sách</p>
                                    <textarea onChange={this.handleInput} style={{textAlign:"justify"}}
                                              rows="9" cols="70" name="description" form="usrform">
                                     </textarea>
                                    {this.state.errors.description &&
                                        <span className={"fhs-textbox-alert"}
                                              style={{color: "red"}}>{this.state.errors.description}</span>}
                                </div>
                            </div>
                            <div className="inforImage">
                                <div className="category">
                                    <p>Phân loại sách</p>
                                    <select name="category" id="" onChange={this.handleInputCategory} ref={value => this.refName = value}>
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
                                            onClick={this.insertProduct}>Thêm
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

export default withRouter(AddPro)
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


  }
`;