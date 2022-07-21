import { Component } from "react";
import { withRouter } from "react-router";
import styled from "styled-components";
import book from "../../assets/bookStudent/image 3.png"
import ProductService from "../../services/ProductService";
class InfoPro extends Component{

    constructor(props){
        super(props)
        this.componentDidMount= this.componentDidMount.bind(this)
        this.state={
            categories:[],
            nameB:"",
            author:"",
            nxb:"",
            price:"",
            quantity:"",
            description:"",
            category:"",
            image:"",
            date:""
        }
    }
    componentDidMount(){
        let {id} = this.props.match.params;
        ProductService.getProductDetail(id).then(
            res=>{
                console.log(res.data)
                this.setState({
                    nameB:res.data.name,
                    author:res.data.author,
                    nxb:res.data.nxb,
                    price:res.data.price,
                    quantity:res.data.quantity,
                    description:res.data.description,
                    category:res.data.categories.name,
                    available:res.data.available
                })
            }
        )
        //get all product
        ProductService.getCategory().then(
            res=>{
                this.setState({categories:res.data})
            }
        )
    }
   
    render(){
        return(
            <Div>
                <div className="Information_Detail">
                    <h1>Chỉnh sửa sản phẩm</h1>
                    <div className="infor1">
                        <div className="inforData">
                            <div className="name_book">
                                <p>Tên sách</p>
                                <input 
                                    value={this.state.nameB}
                                    type="text" name="" id="" />
                            </div>
                            <div className="author_nxb">
                                <div className="author">
                                    <p>Tác giả</p>
                                    <input 
                                        value={this.state.author}
                                        type="text" name="" id="" />
                                </div>
                                <div className="nxb">
                                    <p>Nhà xuất bản</p>
                                    <input 
                                        value={this.state.nxb}
                                        type="text" name="" id="" />
                                </div>
                            </div>
                            <div className="price_quantity">
                                <div className="price">
                                    <p>Giá</p>
                                    <input 
                                        value={this.state.price}
                                        type="text" name="" id="" />
                                </div>
                                <div className="quantity">
                                    <p>Số lượng còn lại</p>
                                    <input 
                                        value={this.state.quantity}
                                        type="text" name="" id="" />
                                </div>
                            </div>
                            <div className="description">
                                <p>Mô tả sách</p>
                                <textarea 
                                    value={this.state.description} 
                                    rows="9" cols="70" name="comment" form="usrform" > 
                                </textarea>
                            </div>
                        </div>
                        <div className="inforImage">
                            <div className="dateCreate">
                                <p>Ngày đăng</p>
                                <p>13/8/2022</p>
                            </div>
                            <div className="status">
                                <p>Trạng thái</p>
                                <p>{this.state.available?"Còn hàng":"Hết hàng"} </p>
                            </div>
                            <hr />
                            <div className="category">
                                <p>Phân loại sách</p>
                                <select value={this.state.category} name="" id="">
                                  {
                                    this.state.categories.map(category=>
                                        <option value={category.name}>{category.name}</option>    
                                    )
                                  }

                                </select>
                            </div>
                            <div className="imageProduct">
                                <p>Ảnh sản phẩm</p>
                                <div className="image">
                                    <img src={book} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
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
   .Information_Detail{
        padding-top: 60px;
        font-size: 20px;
        margin-left: 250px;
        width: calc(100% - 250px);
        transition: var(--tran-05);
        color: var(--text-color);
        .infor1{
            display: flex;
            justify-content: space-around;
            .inforData{
                border: 1px solid var(--border-color);
                padding: 20px 20px 20px 20px;
                box-shadow: 0px 0px 9px 5px #0c050519;
                border-radius: 5px ;
                input{
                    border: 2px solid var(--border-color);
                    color: #000;
                }
                textarea{
                    color: #000;
                }
                .author_nxb{
                    display: flex;
                    justify-content: space-between;
                }
                .price_quantity{
                    display: flex;
                    justify-content: space-between;
                }
            }
            .inforImage{
                border: 1px solid var(--border-color);
                padding: 20px 20px 20px 20px;
                box-shadow: 0px 0px 9px 5px #0c050519;
                border-radius: 5px ;
                .dateCreate{
                    display: flex;
                    justify-content: space-between;
                    font-size: 15px;
                }
                .status{
                    display: flex;
                    justify-content: space-between;
                    font-size: 15px;

                }
                select{
                    color:#000 ;
                }
                .imageProduct{
                    margin-top: 20px;
                    .image{
                        display: flex;
                        justify-content: center;
                        margin-top: 20px;
                    }
                }
            }
        }
   }
`;