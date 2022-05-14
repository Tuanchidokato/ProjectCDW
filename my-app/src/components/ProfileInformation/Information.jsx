import { Component } from "react";
import styled from "styled-components"
class Information extends Component{
    
    render(){
        return(
            <Div>
                <div className="form_Information">
                    <form action="">
                        <h1>Xem trang cá nhân</h1>
                        <div className="name_ info ">
                            <p>Họ tên</p>
                            <input type="text" />
                        </div>

                        <div className="address_ info">
                            <p>Địa chỉ</p>
                            <input type="text" />
                        </div>

                        <div className="email_ info">
                            <p>Email</p>
                            <input type="email" />
                        </div>

                        <div className="PhoneNumber_ info">
                            <p>Số điện thoại</p>
                            <input type="text" />
                        </div>
                        <button>Lưu</button>
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