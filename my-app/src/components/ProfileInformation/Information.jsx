import { Component } from "react";
import styled from "styled-components"
import InformationUser from "../../services/InformationUser.service"
import authService from "../../services/auth.service";

import {ToastContainer,toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

class Information extends Component{
    
    constructor(props){
        super(props)
        this.componentDidMount = this.componentDidMount.bind(this)
        this.handleSave= this.handleSave.bind(this)
        this.onChangeAddress=this.onChangeAddress.bind(this)
        this.onChangeEmail= this.onChangeEmail.bind(this)
        this.onChangeName= this.onChangeName.bind(this)
        this.onChangePhoneNumber= this.onChangePhoneNumber.bind(this)
        
       
        this.state={
            fullName:"",
            newFirstName:"",
            newLastName:"",
            address:"",
            email:"",
            phoneNumber:""

        }

    }
    
    handleSave(e){
        e.preventDefault();
        const string = this.state.fullName.replace(/\s\s+/g, ' ');

        var newFirstName =string.split(" ").pop()

        const newLastName = string.replace(newFirstName,"")
        

    //  this.setState({
    //     newFirstName:newFirstName,
    //     newLastName:newLastName,

    //  })
        console.log(this.state.newFirstName)
        InformationUser.editInformation(
            newFirstName,
            newLastName,
            this.state.address,
            this.state.phoneNumber
        ).then(
            response =>{
                window.location.reload()
                toast.success('🦄 Lưu thông tin thành công!');

                //console.log(response)
            },
            error=>{
                toast.error("Lưu thất bại")
            }
        )   
        
        
    }
    
    // Lấy thông tin từ form
    onChangeEmail(e){
        this.setState({
            email:e.target.value.replace(/\s\s+/g, ' ')
        })
    }
    onChangeAddress(e){
        this.setState({
            address:e.target.value.replace(/\s\s+/g, ' ')
        })
    }
    onChangeName(e){
        //  const string =e.target.value
        //  var firstName =string.split(" ").pop()
        this.setState({
            fullName:e.target.value.replace(/\s\s+/g, ' ')
        })
        
    }
    onChangePhoneNumber(e){
    //    let value = e.target.value;
    //    if(!Number(value)){
    //         return;
    //         console.log(value)
    //    }else{
        this.setState({
            phoneNumber:e.target.value.replace(/\D/g, "")
        })
       

      

    }
    
    //Hiển thị thông tin vào form
    componentDidMount(){
        const currentUser= authService.getCurrentUser();
        InformationUser.getInformationUser(currentUser.id).then(
            response =>{
                const userInfo= response.data;
                this.setState({
                    fullName:userInfo.data.lastName+userInfo.data.firstName,
                    address:userInfo.data.address,
                    email:userInfo.data.user.email,
                    phoneNumber: userInfo.data.phoneNumber
                })
               // console.log(this.state)

            }
        )
    }
    render(){
        return(
            <Div>
                <div className="form_Information">
                    <form onSubmit={this.handleSave}>
                        <h1>Xem trang cá nhân</h1>
                        <div className="name_ info ">
                            <p>Họ tên</p>
                            <input
                                required
                                type="text"
                                value={this.state.fullName}    
                                onChange={this.onChangeName}                         
                             />
                        </div>

                        <div className="address_ info">
                            <p>Địa chỉ</p>
                            <input 
                                required
                                type="text"
                                defaultValue={this.state.address}
                                onChange={this.onChangeAddress}
                            />
                        </div>

                        <div className="email_ info">
                            <p>Email</p>
                            <input 
                                required
                                type="email"
                                defaultValue={this.state.email}
                                onChange={this.onChangeEmail}
                                readOnly
                             />
                        </div>

                        <div className="PhoneNumber_ info">
                            <p>Số điện thoại</p>
                            <input 
                                required    
                                type="text"
                                name="phoneNumber"
                                defaultValue={this.state.phoneNumber}
                                onChange={this.onChangePhoneNumber}
                            />
                        </div>
                        <button>Lưu</button>
                        <ToastContainer
                            
                            />
                    </form>
                </div>
            </Div>
        )
    }
}
export default Information;
const Div = styled.div`
    .form_Information{
        margin-left: 40px;
        background-color: #ceb6b6 ;
        max-width: 900px;
        margin-top: 15px;
        border-radius: 10px;
        max-height: 560px;
        form{
            margin-left: 50px;
            h1{
                padding-top: 20px;
                font-size: 30px;
            }
            .info{
                p{
                    color: #000000;
                    font-size: 17px;
                    margin-top: 20px;
                }
                input{
                    width: 600px;
                    height: 40px;
                    border-radius: 5px;
                    border: 1px solid #000000;
                    padding-left: 20px;
                    font-weight: 500;
                }
            }
            button{
                margin-top: 25px;
                margin-left: 30px;
                margin-bottom: 30px;
                border: 1px solid #000000;
                padding: 8px 35px 8px 35px ;
                border-radius: 5px;
                background-color: #a19292;
                font-size: 18px;
                font-weight: 500;
                :hover{
                    background-color: #000000;
                    color: #FFFFFF;
                    transition: 0.3s all;
                }
            }

        }
    }
`;