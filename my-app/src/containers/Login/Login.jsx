import React, { useState } from "react";
import styled from "styled-components";
import logo from "../../assets/Logo.svg"
import background from "../../assets/background-login.png"
import { Link, withRouter } from 'react-router-dom';
import authService from "../../services/auth.service";

import {ToastContainer,toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
const required = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };
class Login extends React.Component{

    


    constructor(props){
        super(props)
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.UnPassword = this.UnPassword.bind(this)
        this.state ={
            username:"",
            password:"",
            loading:false,
            message:"",
            unPass:true,
        };
    }
       
  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true,
      user:"",  
      navigate:null
    });

     authService.login(this.state.username, this.state.password).then(
       () =>{
         this.props.history.push("/")
         window.location.reload()
       },err=>{
        toast.error("Tên đăng nhập hoặc password không chính xác")
       }
     )
    const currentUser=authService.getCurrentUser();
    if(currentUser != null){
      this.setState({navigate:"/"})
    }
    
  }
  
    // ẩn và hiện mật khẩu
    UnPassword(){
      this.setState({
        unPass:!this.state.unPass
    })   

    }
render(){
    return(
        <Div>
            <div className="container">
                <div className="row content_formLogin">
                   <div className="form_login ">
                       <div className="title_logo">
                            <img src={logo} alt="" />
                            <p className="title_logo_content"><span className="title_logo_1">KeazoN</span><span className="title_logo_2">BOOKS</span></p>
                            <h1 className="title">Knowledge is power</h1>
                       </div>

                       <form
                            ref={c => {
                              this.form = c;
                            }}
                            action="" 
                            className="form_login_"
                       >

                           <div className="input_form">
                                <input 
                                name="username"
                                required
                                value={this.state.username}
                                onChange={this.onChangeUsername}
                                validations={[required]}

                                type="username"  
                                placeholder="Your name..."
                                  />

                                <input 
                                type={this.state.unPass?"password":"text"}  
                                required
                                name="password"
                                value={this.state.password}
                                onChange={this.onChangePassword}
                                validations={[required]}
                                placeholder="Your password..." />
                                <i 
                                onClick={this.UnPassword} 
                                 className={this.state.unPass?"enter fa-solid fa-eye":"enter fa-solid fa-eye-low-vision"}  ></i>
                           </div>
                           <div className="control_pass">
                               <input type="checkbox" value="Save password"/> <span>Save password</span>
                               <a href="">Fogot password</a>
                           </div>
                           <div className="button_control">
                                <Link type="submit"
                                  onClick={this.handleLogin}
                                 className="btn_login"
                                 >
                                     <span>Đăng nhập</span>
                                </Link>
                                <div className="other_login">
                                    <button className="facebook_btn">Facebook</button>
                                    <button className="google_btn">Google</button>
                                </div>
                           </div>
                           <ToastContainer
                            
                            />
                            <div className="signUp">
                              <p>Nếu chưa có tài khoản <Link to="/SignUp">Đăng ký</Link></p>
                            </div>
                       </form>
                   </div>
                  <div className="logo_login">
                     <a href="/">
                        <img src={logo} alt="" />
                     </a>
                  </div>
                </div>
            </div>
        </Div>
    )
}
}
export default withRouter(Login);
const Div = styled.div`
        background-image: url(${background});
        height: 650px;
    .content_formLogin{
        border: 2px solid #FFFF;
        position: absolute;
        border-radius: 5px;
        height: 550px;
        margin-top: 50px;/* height/2 */
        width: 1200px;
        margin-left: -40px; /* width/2 */

        .form_login{
            width: 600px;
            border: 1px solid #FFFF;
            border-radius: 5px;
            
            .title_logo{
                text-align: center;
                margin-top: 40px;
                color: #FFFFFF;
                img{
                width: 100px;
                height: 54.92px;
                
                }
                p{
                    .title_logo_1{
                        font-family: 'Varela';
                        font-style: normal;
                        font-weight: 400;
                        font-size: 55px;
                        line-height: 46px;
                        
                    }

                    .title_logo_2{
                        font-family: 'Roboto', sans-serif;
                        font-style: normal;
                        font-weight: 100;
                        font-size: 20px;
                        line-height: 30px;
                    }
                }
                .title{
                    font-size: 30px;
                    margin-top: -20px;
                    font-weight: 300;
                }
            }
            .form_login_{
                
                .input_form{
                    padding: 7px 100px;
                    input{
                        width: 350px;
                        margin-top: 5px;
                        height: 50px;
                        border-radius: 5px;
                        border: 2px solid #FFFFFF;
                        background: none;
                        padding-left: 25px;
                        color: #FFFF;
                        font-size: 22px;
                        ::placeholder{
                            color: #FFFF;
                            font-size: 20px;
                            margin-left: 10px;
                            opacity: 30%;
                        }
                    }
                    i{
                        position: absolute;
                        color: #FFFFFF;
                        left: 425px;
                        top: 270px;
                        cursor: pointer;
                    }

                }
            }
            .control_pass{
                color: #FFFF;
             input{
                margin-left: 100px;
             }   
             a{
                 margin-left: 110px;
                 text-decoration: none;
                 color: #FFFF;
             }
            }
            .button_control{
                text-align: center;
                margin-top: 30px;
                .btn_login{
                    text-decoration: none;
                    width: 150px;
                    padding-top: 5px;
                    height: 40px;
                    background: rgba(32, 49, 109, 0.38);
                    border-radius: 5px;
                    border: 2px solid #FFFF;
                    color: #FFFFFF;
                }
                .other_login{
                    button{
                        margin-top: 10px;
                        width: 150px;
                        height: 50px;
                        margin-left: 10px;
                        border-radius: 5px;
                    }
                    .facebook_btn{
                        color: #000000;
                        background-color: rgba(255, 255, 255, 0.5);
                        border: 2px solid #000000;
                        font-weight: 600;
                    }
                    .google_btn{
                        color: #FFFF;
                        background-color: rgba(0, 0, 0, 0.5);
                        border: 2px solid #FFFF;
                        font-weight: 600;
                    }
                }
            }
            
        }
        .signUp{
              text-align: center;
              color: #FFFFFF;
              a{
                text-decoration: none;
                :hover{
                  color: #FFFFFF;
                  border-bottom: 1px solid #FFFFFF;
                }
              }
            }
        .logo_login{
            position: absolute;
            top: 0;
            left: 50%;
            width: 50%;
            height: 100%;
            text-align: center;
            border: 1px solid #FFFFFF;
            border-radius: 5px;

            img{
                width: 300px;
                margin-top: 175px;
            }
        }
}
`;