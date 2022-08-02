import React from "react";
import {Link, withRouter} from "react-router-dom";
import styled from "styled-components";
import CartService from "../../services/CartService";

class CartManagement extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            carts: []
        }
    }

    componentDidMount() {
        CartService.getAllCarts().then(r => {
            this.setState({
                carts: r.data
            })
        });
    }

    handlerfilter = (e) => {
        e.preventDefault();
        if (e.target.value !== "All") {
            CartService.getAllCarts().then(r => {
                const newListCart = r.data.filter(cart => {
                    return cart.typePayment === e.target.value;
                });
                this.setState({}, () => {
                    this.setState({
                        carts: newListCart
                    })
                })
            })

        } else {
            this.setState({}, () => {
                this.componentDidMount();
            })
        }
    }

    render() {
        return (
            <Div>
                <div className="dash-content">
                    <div style={{justifyContent: "center"}} className="title">
                        <h1>Danh sách các đơn hàng</h1>
                    </div>
                    <div className="overview">

                    </div>
                    <div className={"boxes"}>
                        <div></div>
                        <select name="" id="" onChange={event => this.handlerfilter(event)}>
                            <option value="All">All</option>
                            <option value="paypal">Paypal</option>
                            <option value="cash on delivery">Cash on delivery</option>
                        </select>
                    </div>
                    <div class="table">
                        <ul className="responsive-table">
                            <li className="table-header">
                                <div className="col col-1">id</div>
                                <div className="col col-1">User_id</div>
                                <div className="col col-2">Địa chỉ</div>
                                <div className="col col-4">Ngày đăng</div>
                                <div className="col col-5">Hình thức thanh toán</div>
                                <div className="col col-6">Trạng thái</div>
                            </li>

                            {
                                this.state.carts.map(cart =>
                                    <Link
                                        to={"/adminDashBoard/CartManagement/CartContents/" + cart.id}
                                        class="table-row">
                                        <div className="col col-1" data-label="id">{cart.id}</div>
                                        <div className="col col-1" data-label="userName">{cart.user.id}</div>
                                        <div className="col col-2" data-label="Email">{cart.address} </div>
                                        <div className="col col-4" data-label="Email">{cart.date}</div>
                                        <div className="col col-5" data-label="roles">{cart.typePayment}</div>
                                        <div className="col col-6"
                                             data-label="image">{cart.payStatus ? "Đã thanh toán" : "Đang chờ"}</div>
                                    </Link>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </Div>

        );
    }
}

export default withRouter(CartManagement);
const Div = styled.div`
  .dash-content {
    padding-top: 60px;
    font-size: 20px;
    margin-left: 250px;
    width: calc(100% - 250px);
    transition: var(--tran-05);
    color: var(--text-color);

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
      color: var(--text-color);
      display: flex;
      justify-content: space-evenly !important;

      .filterInfo {
        display: flex;
        flex-direction: column;

        .button_search {
          margin-top: 40px;
          background-color: var(--box1-color);
          display: flex;
          justify-content: center;
          padding: 5px 5px;
          border-radius: 5px;
          border: 1px solid var(--border-color);
          transition: var(--tran-05);
          cursor: pointer;

          a {
            color: var(--text-color);
            text-decoration: none;
          }

          :hover {
            background-color: #7a7a7a;
          }
        }
      }

      input {
        outline: none;
        border: 1px solid #7a7a7a;
        color: #000;
      }

      select {
        width: 248px;
        min-height: 36px;
        color: #000;
      }
    }

    .table {
      margin-top: 20px;

      .responsive-table {
        li {
          border-radius: 3px;
          padding: 25px 30px;
          display: flex;
          justify-content: space-between;
          margin-bottom: 25px;
        }

        a {
          border-radius: 3px;
          padding: 25px 30px;
          display: flex;
          justify-content: space-between;
          margin-bottom: 25px;
          text-decoration: none;
          color: #000;
        }

        .table-header {
          background-color: #95A5A6;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }

        .table-row {
          background-color: #ffffff;
          box-shadow: 0px 0px 9px 0px #0c050519;
          cursor: pointer;
        }

        .col-1 {
          flex-basis: 10%;
          border-right: 1px solid #6C7A89;
        }

        .col-2 {
          flex-basis: 20%;
          border-right: 1px solid #6C7A89;

        }

        .col-3 {
          flex-basis: 30%;
          border-right: 1px solid #6C7A89;

        }

        .col-4 {
          flex-basis: 20%;
          border-right: 1px solid #6C7A89;

          select {
            border: 1px solid #4b4b4b;
            outline: none;
          }

        }

        .col-5 {
          flex-basis: 20%;
          border-right: 1px solid #6C7A89;

        }

        .image_row {
          display: flex;
          justify-content: center;
          align-items: center;

          .image {
            position: absolute;
            z-index: 0;
            border-image: none;
            border-style: solid;
            border-width: 1px;
            height: 60px;
            width: 60px;
            overflow: hidden;
            margin: auto;

            img {
              height: 100%;
              width: 100%;
              display: block;
            }
          }
        }

      }
    }
  }
`