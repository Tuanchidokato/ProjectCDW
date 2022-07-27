import styled from "styled-components";
import Logo from "../../assets/Logo.svg"
import Bell from "../../assets/fluent_premium-person-20-regular.svg"
import {Component} from "react";
import authService from "../../services/auth.service";
import {Link, withRouter} from "react-router-dom";
import InformationUser from "../../services/InformationUser.service"
import { withTranslation } from "react-i18next";
import { Dropdown } from "react-bootstrap";
import PopularBook from "../Elements/PopularBook";
import CartService from "../../services/CartService";
import CartPreview from "./CartPreview";


const lngs = {
    en: {nativeName: 'English'},
    vi: {nativeName: 'Vietnamese'}
};

class Navbar extends Component {


    constructor(props) {
        super(props)
        this.Logout = this.Logout.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this)
        this.state = {
            currentUser: true,
            imageUrl: "",
            checkRoles: true,
            search: "",
            numberOfItems: 0,
            visible: false,

        }

    }


    componentDidMount(e) {
        const currentUser = authService.getCurrentUser();
        if(currentUser ==null){
            this.setState({
                currentUser: false
            })

        }else{
            const checkRole = this.checkRoles()
            this.setState({checkRoles:checkRole})
            
            // lấy thông tin địa chỉ hình ảnh
            InformationUser.getInformationUser(currentUser.id).then(
                res=>{
                    this.setState({
                        imageUrl:res.data.data.user.imageUrl
                    })
                },
                err=>{
                    console.log(err)
                }
            )
       
            this.setState({
                currentUser: true
            })
        }


        CartService.getItemListCart().then((response) => {
            this.setState({
                numberOfItems: response.data.numberOfItems,
            });
        });

    }
  
     
    Logout(){
       authService.logout();

    }

    // Checl role
    checkRoles() {
        const currentUser = authService.getCurrentUser();
        let role = currentUser.roles
        return role.includes("ROLE_ADMIN");
    }

    searchChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    search(searchText) {
        this.props.history.push("/Search/" + searchText);
        window.location.reload();
    }
    setVisible = (event, check) => {
        event.preventDefault();
        this.setState({
            visible: check
        });
    }

    render() {
        const {t, i18n} = this.props;
        return (
            <Nav>
                <div class="my_navbar ">
                    <header
                        class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 ">
                        <a href="/" class="d-flex align-items-center col-md-3 mb-2 mb-md-0 Logo_section">
                            <img src={Logo} alt=""/>
                            <p className="title_logo"><span className="title_logo_1">KeazoN</span><span
                                className="title_logo_2">BOOKS</span></p>
                        </a>

                        <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0 search_section">

                            <i className="fa fa-search"></i>

                            <input type="text" name={"search"} onChange={event => {
                                this.searchChange(event)
                            }} name={"search"} ref={node => (this.inputNode = node)}
                                   placeholder="Search for the book you want and read it now... Sherlock Holmes..."/>
                            <button type={"button"}  className={"fhs_btn_default active button-search"} title="Search" disabled={this.state.search === ""} onClick={() => this.search(this.state.search)}>
                                <span className={"ico_search_white"}></span>
                            </button>


                        </ul>

                        <div class="col-md-3 text-end login_section">

                            <a href="/Cart" onMouseEnter={event => this.setVisible(event, true)}
                               onMouseLeave={event => this.setVisible(event, false)}>
                                <div className={"heading-custom"}>
                                    <div className={"fhs_center_center"}>

                                        <div className={"icon_cart_white"}>
                                            {
                                                this.state.numberOfItems > 0 || (this.state.items && this.state.items.length > 0) ?
                                                    <div className={"top_menu_unseen fhs_center_center"}
                                                         style={{visibility: "visible"}}>
                                                        <span className={""}
                                                              style={{visibility: "visible"}}>{this.state.numberOfItems}</span>
                                                    </div>
                                                    :
                                                    <></>
                                            }

                                            {
                                                this.state.visible && this.state.visible === true ?
                                                    <CartPreview/>
                                                    :
                                                    <></>

                                            }

                                        </div>
                                    </div>
                                </div>
                            </a>


                            <Dropdown id="changeLanguage" className="changeLanguage">
                                <Dropdown.Toggle variant="none" id="dropdown-basic">
                                    <i className="language fa-solid fa-language"></i>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="languages">


                                    {
                                        Object.keys(lngs).map((lng) => (
                                            <Dropdown.Item className="language_item" type="submit" key={lng}
                                                           onClick={() => i18n.changeLanguage(lng)}
                                                           disabled={i18n.resolvedLanguage === lng}
                                            >
                                                {lngs[lng].nativeName}
                                            </Dropdown.Item>
                                        ))
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                            <a href="/"><img src={Bell} alt=""/></a>
                            {
                                this.state.currentUser ?
                                    <a className="dropbtn">
                                        <div className="image-user">
                                            <img src={this.state.imageUrl} alt=""/>
                                        </div>
                                        <div class="dropdown-content">
                                            <Link to="/home/profile">{t('menu_selection.profile')}</Link>
                                            {
                                                this.state.checkRoles ?
                                                    <Link
                                                        to="/adminDashBoard">{t('menu_selection.system_management')}</Link>
                                                    : null
                                            }
                                            <Link>{t('menu_selection.account')}</Link>
                                            <Link onClick={this.Logout} to="/Login">{t('menu_selection.signOut')}</Link>
                                            <Link>{t('menu_selection.my_wallet')}</Link>
                                        </div>
                                    </a>
                                    :
                                    <Link to="/Login" className="Login_">Đăng nhập</Link>

                            }

                        </div>
                    </header>
                </div>
                <nav class="navbar navbar-expand-sm justify-content-center">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link" href="#">{t('menu_selection.detective')}</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">{t('menu_selection.love')}</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">{t('menu_selection.novel')}</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">{t('menu_selection.history')}</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">{t('menu_selection.science')}</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">{t('menu_selection.fantastic')}</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">{t('menu_selection.more')}</a>
                        </li>

                    </ul>
                </nav>
            </Nav>
        )
    }

}

export default withTranslation()(withRouter(Navbar));

const Nav = styled.nav`
  background-color: #2C2828;

  .my_navbar {
    margin: auto;
    background: #292828;
  }

  .Logo_section {
    color: #D2D2D2;
    text-decoration: none;
    margin-left: 40px;

    img {
      width: 100px;
      height: 54.92px;

    }

    p {
      .title_logo_1 {
        font-family: 'Varela';
        font-style: normal;
        font-weight: 400;
        font-size: 35px;
        line-height: 46px;
        color: #FFFFFF;
      }

      .title_logo_2 {
        font-family: 'Roboto', sans-serif;
        font-style: normal;
        font-weight: 100;
        font-size: 20px;
        line-height: 23px;
        color: #FFFFFF;


      }
    }
  }

  .search_section {
    color: #242121;

    i {
      font-size: 25px;
      margin-top: 3px;
      position: absolute;
      margin-right: 450px;
      color: #808080;

    }

    input {
      width: 500px;
      height: 33px;
      border: none;
      border-radius: 5px;
      //opacity: 30%;
      background-color: #3d3c3c;
      padding-left: 50px;
      color: #000000;

      ::placeholder {
        color: #D2D2D2;

        font-size: 14px;
      }
    }
  }

  .login_section {
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    .language {
      color: #D2D2D2;
      font-size: 30px;
      cursor: pointer;
    }


    .languages {
      padding-bottom: 0%;
      padding-top: 0%;

      .language_item {
        text-decoration: none;
        color: #000000;
        border: 1px solid #000000;
        width: 160px;
        height: 40px;
        border-top: none;
        right: 100px;
        padding-right: 90px;
      }
    }

    .image-user {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      min-width: 40px;
      overflow: hidden;
      cursor: pointer;

      img {
        display: inline;
        margin: 0 auto;
        width: 40px;
        height: 40px;
        height: 100%;
        min-width: 40px;
      }
    }

    .Login_ {
      color: #FFFFFF;
      text-decoration: none;
      margin-right: 20px;
      font-size: 20px;
      padding: 5px 5px 8px 5px;
      background-color: #808080;
      border-radius: 5px;

      :hover {
        background-color: #f1f1f1;
        color: #000000;
      }
    }


    .dropbtn {
      :hover {
        .dropdown-content {
          display: block;

        }
      }


    .dropdown-content {
      display: none;
      margin-top: 4px;
      border-radius: 10px;
      right: 4px;
      position: absolute;
      background-color: #f1f1f1;
      min-width: 130px;
      box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
      z-index: 1;

      a {
        color: black;
        padding: 12px 16px;
        text-decoration: none;
        display: block;
        border-bottom: 1px solid #000000;

        :hover {
          background-color: #000000;
          color: #FFFFFF;
          transition: cubic-bezier(0.165, 0.84, 0.44, 1);
        }
      }
    }
  }

  .nav-link {
    font-size: 20px;
    color: #FFFFFF;
    margin-top: -20px;


  }

  .heading-custom {
    display: flex;
    flex-direction: column;
  }

  .fhs_center_center {
    display: flex;
    display: -webkit-box;
    display: -webkit-flex;
    align-items: center;
    -webkit-align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
    text-align: center;
  }

  .heading-custom div {
    text-align: center;
  }

  .icon_cart_white {
    background: url(https://cdn0.fahasa.com/skin/frontend/base/default/images/ico_shopping_cart_white.svg) no-repeat center center;
    -webkit-background-size: contain;
    background-size: contain;
    height: 35px;
    width: 35px;
    position: relative;
  }


  .top_menu_unseen {
    background-color: #C92127;
    -webkit-border-radius: 10px;
    border-radius: 15px;
    vertical-align: top;
    position: absolute;
    top: -10px;
    right: -10px;
    width: 24px;
    height: 24px;
    color: white;
    font-size: 1.0em;
    font-weight: bold;
    line-height: 0;
    border: 1px solid #fff;
  }

  .fhs_btn_default.active {
    color: #fff;
    background-color: #C92127;
    border: 2px solid #C92127;
  }

  .ico_search_white {
    background: url(https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/ico_search_white.svg) no-repeat center center;
    -webkit-background-size: contain;
    -moz-background-size: contain;
    -o-background-size: contain;
    background-size: contain;
    height: 20px;
    width: 20px;
    fill: #fff;
  }

  .fhs_header_desktop .fhs-header-top-second-bar > div:nth-of-type(3) .form-search > span{
    position: absolute;
    top: calc(50% - 2px);
    right: 4px;
    -webkit-transform: translate(0, -50%);
    transform: translate(0, -50%);
    font-weight: normal;
    font-size: 21px;
    z-index: 3;
    width: 72px;
    height: 30px;
  }




`;