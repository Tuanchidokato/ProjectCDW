import Logo from "../../assets/Logo.svg"
import styled from "styled-components"
import {Link, Route, useHistory} from "react-router-dom"
import {useEffect, useState} from "react"
import InformationUserService from "../../services/InformationUser.service"
import authService from "../../services/auth.service"
import ColDashBoard from "./ColDashBoard"
import InfoPro from "./InforPro"
import ProductService from "../../services/ProductService"
import UserManagement from "./UserManagement"
import InfoUser from "./InfoUser"
<<<<<<< HEAD
import { useTranslation } from "react-i18next"
function Navbar(props){
=======
import AddPro from "./AddPro";
import CartManagement from "./CartManagement";
import InfoCart from "./InfoCart";
>>>>>>> 2505cddd3eff2c653248ab2e9ccacb8e3ef57c85

function Navbar(props) {

    const [imageUrl, setImageUrl] = useState("")
    const [products, setProducts] = useState([])
    const [infoSearch, setInfoSearch] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [size, setSize] = useState(5)
    const [page, setPage] = useState(1)
    const history = useHistory();
<<<<<<< HEAD
    const {t, i18n}=useTranslation()
    const toggleHandlerChange = ()=>{
        const nav= document.getElementById('dark')
=======

    const toggleHandlerChange = () => {
        const nav = document.getElementById('dark')
>>>>>>> 2505cddd3eff2c653248ab2e9ccacb8e3ef57c85
        nav.classList.toggle('dark')
    }

    const sidebarHandler = () => {
        const nav = document.querySelector('nav')
        nav.classList.toggle('close')

    }

    const getRequestParams = (page, size) => {
        let params = {};
        if (page) {
            params["page"] = page - 1;
        }
        if (size) {
            params["size"] = size;
        }
        return params;
    }

    const changePage = (event) => {
        setPage(event.currentTarget.value);
    }

    // function search product
    const searchHandler = () => {
        //const onChangeSearch= 
        history.push("/adminDashBoard")
        const onChangeSearch = document.getElementById("infoSearch").value;

        if (onChangeSearch !== "") {
            const newListProduct = products.filter(product => {
                return Object.values(product)
                    .join(" ")
                    .toLowerCase()
                    .includes(onChangeSearch.toLowerCase()
                    )
            })
            setInfoSearch(onChangeSearch)
            setSearchResult(newListProduct)
        }

    }

    const handleKeypress = (e) => {
        if (e.keyCode === 13) {
            searchHandler()
        }
    }

    useEffect(() => {
        const currentUser = authService.getCurrentUser();
        InformationUserService.getInformationUser(currentUser.id).then(
            res => {
                setImageUrl(res.data.data.user.imageUrl)
            }
        )

        let params = getRequestParams(page, size);
        ProductService.getProductList(params).then(res => {
            setProducts([...res.data.productList]);
            setTotalPages(res.data.totalPages);
        })

        setInfoSearch("")

    }, [page])

    return (
        <Div>
            <div id="dark">
                <nav>
                    <Link to="/" className="logo-name">
                        <div className="logo-image">
                            <img src={Logo} alt=""/>
                        </div>
                        <span className="logo_name">KeanZon</span>
                    </Link>

                    <div className="menu-items">
                        <ul className="nav-links">
                            <li>
                                <Link to="/adminDashBoard">
                                    <i className="fa fa-home"></i>
                                    <span className="link-name">Dashboard</span>
                                </Link>
                            </li>

<<<<<<< HEAD
                                <li>
                                    <Link to="/adminDashBoard/UserManagement">
                                        <i className="fa fa-user"></i>
                                        <span className="link-name">{t('DashBoard.user')} </span>
                                    </Link>
                                </li>
=======
                            <li>
                                <Link to="/adminDashBoard/UserManagement">
                                    <i className="fa fa-user"></i>
                                    <span className="link-name">Nguời dùng</span>
                                </Link>
                            </li>
>>>>>>> 2505cddd3eff2c653248ab2e9ccacb8e3ef57c85

                            <li>
                                <Link to={"/adminDashBoard/CartManagement"}>
                                    <i className="fa fa-cart-shopping"></i>
                                    <span className="link-name">Đơn hàng</span>
                                </Link>
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

<<<<<<< HEAD
                            <ul className="logout-mode">
                                <li>
                                    <a href="#">
                                        <i className="fa fa-sign-out"></i>
                                        <span className="link-name">{t('DashBoard.logOut')} </span>
                                    </a>
                                </li>
                                <li className="mode">
                                    <a href="#">
                                        <i class="fa-solid fa-moon"></i>
                                        <span className="link-name">{t('DashBoard.mod')} </span>
                                    </a>
                                    <div
=======
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
>>>>>>> 2505cddd3eff2c653248ab2e9ccacb8e3ef57c85
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
                            onKeyPress={handleKeypress}
                            className="fa fa-bars sidebar-toggle"
                        ></i>
                        <div className="search-box">
                            <i
                                onClick={searchHandler}
                                className="fa fa-search"></i>
                            <input
                                type="text"
                                id="infoSearch"
<<<<<<< HEAD
                                placeholder={t('DashBoard.searchHere')}  
=======
                                placeholder="Search here..."
>>>>>>> 2505cddd3eff2c653248ab2e9ccacb8e3ef57c85
                            />
                        </div>

                        <div className="user-img">
                            <img src={imageUrl} alt=""/>
                        </div>
                    </div>


                    <Route exact path="/adminDashBoard/informationProduct/:id">
                        <InfoPro/>
                    </Route>
                    <Route exact path="/adminDashBoard">
                        <ColDashBoard totalPage={totalPages} onPageChange={(event) => changePage(event)}
                                      pages={page} listProduct={infoSearch.length < 1 ? products : searchResult}
                        />
                    </Route>
                    <Route exact path="/adminDashBoard/CartManagement">
                        <CartManagement/>
                    </Route>
                    <Route exact path="/adminDashBoard/CartManagement/CartContents/:id">
                        <InfoCart/>
                    </Route>
                    <Route exact path="/adminDashBoard/UserManagement">
                        <UserManagement/>
                    </Route>
                    <Route exact path="/adminDashBoard/UserManagement/infoUser/:id">
                        <InfoUser></InfoUser>
                    </Route>
                    <Route exact path="/adminDashBoard/AddProduct">
                        <AddPro/>
                    </Route>
                </section>
            </div>
        </Div>
    )
}

export default Navbar;

const Div = styled.div`
  /* ================ Colors ============= */
  --primary-color: #3a3b3c;
  --panel-color: #242526;
  --text-color: #ccc;
  --black-light-color: #ccc;
  --border-color: #4d4c4c;
  --toggle-color: #fff;
  --box1-color: #3a3b3c;
  --box2-color: #3a3b3c;
  --box3-color: #3a3b3c;
  --title-icon-color: #ccc;


  /* ============ Trasition =============== */
  --tran-05: all 0.5s ease;
  --tran-03: all 0.5s ease;
  --tran-03: all 0.5s ease;

  #dark {
    background-color: var(--panel-color);
  }

  nav {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 250px;
    background-color: var(--panel-color) !important;
    padding: 10px 14px;
    transition: var(--tran-05);
    border-right: 2px solid var(--border-color);

    .logo-name {
      display: flex;
      position: fixed;
      text-decoration: none;

      .logo-image {
        min-width: 45px;
        display: flex;
        justify-content: center;

        img {
          width: 50px;
          object-fit: cover;
          // border-radius: 50%;
        }
      }

      .logo_name {
        margin-left: 14px;
        font-size: 22px;
        font-weight: 600;
        color: var(--text-color);
      }
    }

    .menu-items {
      margin-top: 40px;
      height: calc(100% - 90px);
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .logout-mode {
        border-top: 2px solid var(--border-color);

      }

      ul {
        padding-left: 0;

        li {
          list-style: none;

          a {
            display: flex;
            align-items: center;
            height: 50px;
            text-decoration: none;

            i {
              min-width: 45px;
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              color: var(--black-light-color);
              font-size: 23px;
            }

            .link-name {
              font-size: 18px;
              font-weight: 400;
              color: var(--black-light-color);
            }

            :hover i, :hover .link-name {
              color: var(--primary-color);
            }
          }

        }

        .mode {
          display: flex;
          align-items: center;
          white-space: nowrap;

          .mode-toggle {
            position: absolute;
            height: 50px;
            right: 14px;
            min-width: 45px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;

            .switch {
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
  .close {
    width: 73px;

    li {
      a {
        .link-name {
          opacity: 0;
          pointer-events: none;
        }
      }
    }

    .logo_name {
      opacity: 0;
    }
  }

  .close ~ .dashboard {
    left: 73px;
    width: calc(100% - 73px);

    .top {
      left: 73px;
      width: calc(100% - 73px);
    }

    .dash-content {
      margin-left: 180px;
    }

    .Information_Detail {
      margin-left: 170px;
    }
  }

  .dark {


    --primary-color: #0e4bf1;
    --panel-color: #FFF;
    --text-color: #000;
    --black-light-color: #707070;
    --border-color: #e6e5e5;
    --toggle-color: #DDD;
    --box1-color: #4da3ff;
    --box2-color: #FFe6ac;
    --box3-color: #e7d1fc;
    --title-icon-color: #FFF;

    .switch::before {
      left: 20px !important;
    }
  }

  .dashboard {
    // position: relative;
    background-color: var(--panel-color);
    min-height: 100vh;
    width: calc(100%);
    left: 250px !important;
    transition: var(--tran-05);
    padding: 10px 14px;

    .top {
      position: fixed;
      top: 0;
      left: 250px;
      padding: 10px 14px;
      width: calc(100% - 250px);
      display: flex;
      justify-content: space-between;
      background-color: var(--panel-color);
      transition: var(--tran-05);
      align-items: center;
      z-index: 999;

      .sidebar-toggle {
        font-size: 26px;
        color: var(--text-color);
        cursor: pointer;
      }

      .search-box {
        position: relative;
        height: 45px;
        max-width: 600px;
        width: 100%;
        margin: 0 30px;

        input {
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

        i {
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

      .user-img {
        position: fixed;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
        cursor: pointer;
        position: relative;
        min-width: 40px;

        img {
          display: inline;
          margin: 0 auto;
          width: 40px;
          height: 40px;
          height: 100%;
          min-width: 40px;
        }
      }
    }

    .dash-content {
      padding-top: 60px;
      font-size: 20px;
      margin-left: 250px;
      width: calc(100% - 250px);
      transition: var(--tran-05);

      .title {
        display: flex;
        align-items: center;
        margin: 70px 0 30px 0;

        i {
          position: relative;
          height: 35px;
          width: 35px;
          background-color: var(--primary-color);
          border-radius: 6px;
          color: var(--title-icon-color);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
        }

        .text {
          font-size: 20px;
          font-weight: 500;
          color: var(--text-color);
          margin-left: 10px;
        }
      }

      .boxes {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .box {
          display: flex;
          flex-direction: column;
          align-items: center;
          border-radius: 12px;
          width: calc(100% / 3 - 15px);
          padding: 15px 20px;
          background-color: var(--box1-color);

          .text {
            white-space: nowrap;
            font-size: 18px;
            font-weight: 500;
            color: var(--text-color);
          }

          .number {
            font-size: 40px;
            font-weight: 500;
            color: var(--text-color);
          }

          i {
            font-size: 35px;
            color: var(--text-color);
          }
        }

        .box2 {
          background-color: var(--box2-color);
        }

        .box3 {
          background-color: var(--box3-color);
        }
      }

      .activity {
        .activity-data {
          display: flex;
          justify-content: space-between;
          width: 100%;
          //width: calc(100% / 5 - 15px);
          .data {
            display: flex;
            flex-direction: column;
            margin: 0 15px;
          }

          .data-title {
            font-size: 20px;
            font-weight: 500;
          }
        }
      }
    }
  }
`
