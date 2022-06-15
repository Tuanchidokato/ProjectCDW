import React, { Component } from "react";
import styled from "styled-components";
import background from "../../assets/background-login.png"
import logo from "../../assets/Logo.svg"
import authService from "../../services/auth.service";
import {ToastContainer,toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {withRouter,Link} from "react-router-dom" 

class SignUp extends Component{

   constructor(props){
        super(props)
        this.handleSignUp = this.handleSignUp.bind(this);
        this.onchangeUsername = this.onchangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeRePassword= this.onChangeRePassword.bind(this)
        this.onChangeEmail    = this.onChangeEmail.bind(this)
        this.unPass = this.unPass.bind(this);
        this.re_unPass= this.re_unPass.bind(this)
        this.state ={
           username:"",
           password:"",
           rePassword:"",
           email:"",
           successful: false,
           unPass:true,
           re_unPass:true,
       };
        
   }
    
// ẩn và hiện pass
    unPass(e){
        e.preventDefault();
        this.setState({
            unPass:!this.state.unPass
        })
    }

    re_unPass(e){
        e.preventDefault();
        this.setState({
            re_unPass:!this.state.re_unPass
        })       
    }

    onchangeUsername(e){
        this.setState({
            username: e.target.value
        });
    }
    onChangePassword(e){
        this.setState({
            password: e.target.value
        })
    }
    onChangeEmail(e){
        this.setState({
            email:e.target.value
        })
    }
    onChangeRePassword(e){
        this.setState({
          rePassword:e.target.value  
        })
    }

    // đăng ký tài khoản
      
    handleSignUp(e){
        e.preventDefault();
        if(this.state.password===this.state.rePassword){
            this.setState({
                message: "",
                successful: false
              });
            authService.register(
                this.state.username,
                this.state.email,
                this.state.password
            ).then(
                response =>{
                    this.setState({
                        message: response.data.message,
                        successful:true
                    });
                    authService.login(this.state.username,this.state.password).then(
                        ()=>{
                            this.props.history.push("/")
                            window.location.reload();
                        }
                    )
                    console.log(this.state.message)
                    
                },
                error =>{
                    const resMessage =(
                        error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                      error.message ||
                      error.toString();
        
    
                    this.setState({
                      successful: false,
                      message: resMessage
                    }
                    );
                    toast.error(this.state.message)
    
                   
                }
            )
            console.log("ha")
        } else{
            toast.error("Mật khẩu không trùng nhau")
        }
        
        
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
                            action="" 
                            className="form_login_"
                       >

                           <div className="input_form">
                                <input 
                                    name="username"
                                    type="username"  
                                    placeholder="Username..."
                                    onChange={this.onchangeUsername}
                                    required
                                />

                                <input 
                                type="email"  
                                name="email"
                                placeholder="Your email..." 
                                onChange={this.onChangeEmail}
                                required
                                />
                                <input 
                                    type={this.state.unPass?"password":"text"}  
                                    name="password"
                                    placeholder="Your password..." 
                                    id="Pass"
                                    onChange={this.onChangePassword}
                                    required
                                />
                                <i  
                                    required
                                    onClick={this.unPass} 
                                    id="enter" 
                                    className={this.state.unPass?"enter fa-solid fa-eye":"enter fa-solid fa-eye-low-vision"}  ></i>

                                <input 
                                    required
                                    type={this.state.re_unPass?"password":"text"} 
                                    name="password"
                                    placeholder="Re-enter password..."
                                    onChange={this.onChangeRePassword}
                                />
                                <i 
                                    onClick={this.re_unPass}
                                    className={this.state.re_unPass?"re-enter fa-solid fa-eye":"re-enter fa-solid fa-eye-low-vision"} ></i>

                           </div>
                          
                           <div className="button_control">
                                <Link
                                onClick={this.handleSignUp}
                                 className="btn_login"
                                 >
                                     <span>Đăng ký</span>
                                </Link>
                                <ToastContainer />
                                
                           </div>


                           {/* {this.state.message && (
                                <div className="form-group">
                                    <div
                                    className={
                                        this.state.successful
                                        ? "alert alert-success"
                                        : "alert alert-danger"
                                    }
                                    role="alert"
                                    >
                                    {this.state.message}
                                    </div>
                                </div>
                                )} */}
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
export default withRouter(SignUp);
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
                    .enter{
                        position: absolute;
                        color: #FFFFFF;
                        left: 425px;
                        top: 325px;
                        cursor: pointer;
                    }
                    .re-enter{
                        position: absolute;
                        color: #FFFFFF;
                        left: 425px;
                        top: 382px;
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
                    width: 150px;
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