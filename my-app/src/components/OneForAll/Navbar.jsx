import styled from "styled-components";
import Logo from "../../assets/Logo.svg"
import Book from "../../assets/bx_bx-book-heart.svg"
import Diamond from "../../assets/ic_round-notifications-none.svg"
import Bell from "../../assets/fluent_premium-person-20-regular.svg"
import User from "../../assets/user.svg"
import { Component } from "react";
import authService from "../../services/auth.service";
import {Link} from "react-router-dom";
class Navbar extends Component{

    constructor(props){
        super(props)
        this.Logout = this.Logout.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this)
        this.state ={
            currentUser:true,
        }

    }
    componentDidMount(e){
        const currentUser = authService.getCurrentUser();
       
        if(currentUser ==null){
            this.setState({
                currentUser:false
            })
        }else{
            this.setState({
                currentUser:true
            })
        }
    //    console.log(currentUser);
        console.log(this.state.currentUser)
    }

    Logout(){
       authService.logout();
    }
    render(){
        return(
            <Nav>
                <div class="my_navbar ">
                    <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 ">
                        <a href="/" class="d-flex align-items-center col-md-3 mb-2 mb-md-0 Logo_section">
                            <img src={Logo} alt="" />
                            <p className="title_logo"><span className="title_logo_1">KeazoN</span><span className="title_logo_2">BOOKS</span></p>
                        </a>

                        <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0 search_section">
                        <i className="fa fa-search"></i>
                            <input type="text" placeholder="Search for the book you want and read it now... Sherlock Holmes..."/>
                        </ul>

                        <div class="col-md-3 text-end login_section">
                            <a href=""><img src={Book} alt="" /></a>
                            <a href=""><img src={Diamond} alt="" /></a>
                            <a href="/"><img src={Bell} alt="" /></a>
                            {
                                this.state.currentUser?
                                <a className="dropbtn">
                                <img src={User} alt="" />
                                <div class="dropdown-content">
                                    <Link to="/home/profile">Xem trang cá nhân</Link>
                                    <Link >Quản lý tài khoản</Link>
                                    <Link onClick={this.Logout} to="/Login">Đăng xuất</Link>
                                    <Link>Ví của tôi</Link>
                                </div>
                            </a> 
                            :
                            <a href="/Login" className="Login_">Đăng nhập</a>

                            }
                            
                        </div>
                    </header>
                </div>
                <nav class="navbar navbar-expand-sm justify-content-center">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link" href="#">Detective</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Love</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Novel</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">History</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Science fiction</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Fantastic</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">More</a>
                        </li>
                        
                    </ul>
                </nav>
            </Nav>
        )
    }

}
export default Navbar;
const Nav= styled.nav`
      background-color: #2C2828;
 
    .my_navbar{
        margin: auto;
        background: #292828;
    } 
    .Logo_section{
        color:#D2D2D2;
        text-decoration: none;
        margin-left: 40px;
        img{
            width: 100px;
            height: 54.92px;
            
        }
        p{
            .title_logo_1{
                font-family: 'Varela';
                font-style: normal;
                font-weight: 400;
                font-size: 35px;
                line-height: 46px;
                color: #FFFFFF;
            }

            .title_logo_2{
                font-family: 'Roboto', sans-serif;
                font-style: normal;
                font-weight: 100;
                font-size: 20px;
                line-height: 23px;
                color: #FFFFFF;


            }
        }
    }
    .search_section{
        color: #242121;
        i{
            font-size: 25px;
            margin-top: 3px;
            position: absolute;
            margin-right: 450px;
            color: #808080;

        }
        input{
            width: 500px;
            height: 33px;
            border: none;
            border-radius: 5px;
            //opacity: 30%;
            background-color: #3d3c3c;
            padding-left: 50px;
            color: #000000;
            ::placeholder{
                color: #D2D2D2;
                 
                font-size: 14px;
            }
        }
    }
    .login_section{
        img{
            margin-right:20px;
            width: 10%;
            cursor: pointer;
        }
        .Login_{
            color: #FFFFFF;
            text-decoration: none;
            margin-right: 20px;
            font-size: 20px;
            padding: 5px 5px 8px 5px;
            background-color: #808080;
            border-radius:5px;
            :hover{
                background-color: #f1f1f1;
                color: #000000;
            }
        }
        .dropbtn{ 
            :hover{
                .dropdown-content{
                    display: block;
                   
                }
            }
        }
        .dropdown-content{
            display: none;
            margin-top: 4px;
            border-radius: 10px;
            right: 4px;
            position: absolute;
            background-color: #f1f1f1;
            min-width: 130px;
            box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
            z-index: 1;
            a{
                color: black;
                padding: 12px 16px;
                text-decoration: none;
                display: block;
                border-bottom: 1px solid #000000;
                :hover{
                    background-color: #000000;
                    color: #FFFFFF;
                    transition: cubic-bezier(0.165, 0.84, 0.44, 1);
                }
            }
        }
    }
    .nav-link{
        font-size: 20px;
        color: #FFFFFF;
        margin-top: -20px;


    }
`;