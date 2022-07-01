import User from "../../assets/bookStudent/image 2.png"
import Logo from "../../assets/Logo.svg"
import styled from "styled-components"
import ColDashBoard from "./ColDashBoard"
function Navbar(){


    const toggleHandlerChange = ()=>{
        const nav= document.getElementById('dark')
        nav.classList.toggle('dark')
    }

    const sidebarHandler =()=>{
        const nav =document.querySelector('nav')
        nav.classList.toggle('close')

    }
    return(
        <Div>
           <div id="dark">
                <nav>
                        <div className="logo-name">
                            <div className="logo-image">
                                <img src={Logo} alt="" />
                            </div>
                            <span className="logo_name">KeanZon</span>
                        </div>

                        <div className="menu-items">
                            <ul className="nav-links">
                                <li>
                                    <a href="#">
                                        <i className="fa fa-home"></i>
                                        <span className="link-name">Dashboard</span>
                                    </a>
                                </li>

                                <li>
                                    <a href="#">
                                        <i className="fa fa-c"></i>
                                        <span className="link-name">Content</span>
                                    </a>
                                </li>

                                <li>
                                    <a href="#">
                                        <i className="fa fa-transgender-alt"></i>
                                        <span className="link-name">Analytics</span>
                                    </a>
                                </li>

                                <li>
                                    <a href="#">
                                    <i class="fa-solid fa-thumbs-up"></i>
                                        <span className="link-name">Like</span>
                                    </a>
                                </li>

                                <li>
                                    <a href="#">
                                        <i className="fa fa-comment"></i>
                                        <span className="link-name">Comment</span>
                                    </a>
                                </li>

                                <li>
                                    <a href="#">
                                        <i className="fa fa-share"></i>
                                        <span className="link-name">Share</span>
                                    </a>
                                </li>
                            </ul>

                            <ul className="logout-mode">
                                <li>
                                    <a href="#">
                                        <i className="fa fa-sign-out"></i>
                                        <span className="link-name">Logout</span>
                                    </a>
                                </li>
                                <li className="mode">
                                    <a href="#">
                                        <i class="fa-solid fa-moon"></i>
                                        <span className="link-name">Dark mod</span>
                                    </a>
                                    <div
                                    onClick={toggleHandlerChange}
                                    className="mode-toggle">
                                        <span className="switch"></span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                </nav>

                <section className="dashboard">
                    <div className="top">
                        <i
                            onClick={sidebarHandler}
                            className="fa fa-bars sidebar-toggle"
                        ></i>
                        <div className="search-box">
                            <i className="fa fa-search"></i>
                            <input type="text" placeholder="Search here..." />
                        </div>

                        <div className="user-img">
                            <img src={User} alt="" />
                        </div>
                    </div>
                </section>
           </div>
            </Div>
    )
}
export default Navbar;
 
const Div = styled.div`
    /* ================ Colors ============= */
    --primary-color:#3a3b3c;
    --panel-color:#242526;
    --text-color:#ccc;
    --black-light-color:#ccc;
    --border-color:#4d4c4c;
    --toggle-color:#fff;
    --box1-color:#3a3b3c;
    --box2-color:#3a3b3c;
    --box3-color:#3a3b3c;
    --title-icon-color:#ccc;


    /* ============ Trasition =============== */
    --tran-05:all 0.5s ease;
    --tran-03:all 0.5s ease;
    --tran-03:all 0.5s ease;
    #dark{
        background-color: var(--panel-color);
    }
   
    nav{
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 250px;
        background-color: var(--panel-color) !important;
        padding: 10px 14px;
        transition: var(--tran-05);
        border-right: 2px solid var(--border-color);
        .logo-name{
            display: flex;
            position: fixed;
            .logo-image{
                min-width: 45px;
                display: flex;
                justify-content: center;
                img{
                    width: 50px;
                    object-fit: cover;
                   // border-radius: 50%;
                }
            }
            .logo_name{
                margin-left: 14px;
                font-size: 22px;
                font-weight: 600;
                color: var(--text-color);
            }
        }
        .menu-items{
            margin-top: 40px;
            height: calc(100% - 90px);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .logout-mode{
                border-top: 2px solid var(--border-color);

            }
            ul{
                padding-left: 0;
                li{
                    list-style: none;
                    a{
                        display: flex;
                        align-items: center;
                        height: 50px;
                        text-decoration: none;
                        i{
                            min-width: 45px;
                            height: 100%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            color: var(--black-light-color);
                            font-size: 23px;
                        }
                        .link-name{
                            font-size: 18px;
                            font-weight: 400;
                            color: var(--black-light-color);
                        }
                        :hover i,:hover .link-name{
                            color: var(--primary-color);
                        }
                    }
                  
                }
                .mode{
                    display: flex;
                    align-items: center;
                    white-space: nowrap;
                    .mode-toggle{
                        position: absolute;
                        height: 50px;
                        right: 14px;
                        min-width: 45px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                        .switch{
                            display: inline-block;
                            border-radius: 25px;
                            position: relative;
                            height: 22px;
                            width: 40px;
                            background-color: var(--toggle-color);
                            ::before {
                                position: absolute;
                                content: "";
                                left: 5px;
                                top: 50%;
                                height: 15px;
                                width: 15px;
                                background-color: var(--panel-color);
                                border-radius: 50%;
                                transform: translateY(-50%);
                                transition: var(--tran-03);
                            }
                        }
                    }
                }
            }
        }
   }
   // change when click sidebar
   .close{
        width: 73px;
        li{
            a{
                .link-name{
                    opacity: 0;
                    pointer-events: none;
                }
            }
        }
        .logo_name{
            opacity: 0;
        }
   }
   .close ~ .dashboard{
        left: 73px;
        width: calc(100% - 73px);
        .top{
            left: 73px;
            width: calc(100% - 73px);
        }
   }
   .dark{
        

        --primary-color:#0e4bf1;
        --panel-color:#FFF;
        --text-color:#000;
        --black-light-color:#707070;
        --border-color:#e6e5e5;
        --toggle-color:#DDD;
        --box1-color:#4da3ff;
        --box2-color:#FFe6ac;
        --box3-color:#e7d1fc;
        --title-icon-color:#FFF;
        .switch::before{
            left: 20px !important;
        }
    }

    .dashboard{
        position: relative;
        background-color: var(--panel-color);
        min-height: 100vh;
        width: calc(100% - 250px);
        left: 250px !important;
        transition: var(--tran-05);
        padding: 10px 14px;
        .top{
            position: fixed;
            top: 0;
            left: 250px;
            padding: 10px 14px;
            width: calc(100% - 250px);
            display: flex;
            justify-content: space-between;
            background-color: var(--panel-color );
            transition: var(--tran-05);
            align-items: center;
            .sidebar-toggle{
                font-size: 26px;
                color: var(--text-color);
                cursor: pointer;
            }
            .search-box{
                position: relative;
                height: 45px;
                max-width: 600px;
                width: 100%;
                margin: 0 30px;
                input{
                    height: 100%;
                    position: absolute;
                    width: 100%;
                    border: 2px solid var(--border-color);
                    background-color: var(--panel-color);
                    padding: 0 25px 0 50px;
                    border-radius: 5px;
                    color: var(--text-color);
                    font-size: 15px;
                    font-weight: 400;
                    outline: none;
                }
                i{
                    position: absolute;
                    left: 15px;
                    font-size: 22px;
                    cursor: pointer;
                    z-index: 10;
                    top: 50%;
                    transform: translateY(-50%);
                    color: var(--black-light-color);
                }
            }
            .user-img{
                position: fixed;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                overflow: hidden;
                cursor: pointer;
                position: relative;
                min-width: 40px;
                img{
                    display: inline;
                    margin: 0 auto;
                    width: 40px;
                    height: 40px;
                    height: 100%;
                    min-width: 40px;
                }
            }
        }
    }
`
