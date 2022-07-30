import React from "react";
import {withRouter} from "react-router";
import styled from "styled-components";
import CartService from "../../services/CartService";
import {Link} from "react-router-dom";


class InfoCart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            check: false
        }
    }

    componentDidMount() {
        let {id} = this.props.match.params;
        CartService.getCartContens(id).then(r => {
            this.setState({
                items: r.data,
            })
            console.log(JSON.stringify(this.state.items));
        })
    }

    setPayStatus = (e) => {
        this.setState({
            check: e.target.checked
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let {id} = this.props.match.params;
        const payment = this.state.check;
        CartService.editCart(id, payment);
        this.props.history.push("/adminDashBoard/CartManagement");
        window.location.reload();
    }


    render() {
        return (
            <Div>
                <div className="dash-content">
                    <div className="overview">
                        <div style={{justifyContent: "center" , whiteSpace: "nowrap"}} className="title">
                            <h1>Chỉnh sửa đơn hàng</h1>
                        </div>
                    </div>

                    <div style={{justifyContent: "center", display: "flex"}}>
                        <p style={{marginRight: "10px" , marginTop: "5px"}}>Đã thanh toán:</p>
                        <input style={{marginRight: "10px"}}
                            type={"checkbox"} value={true} onChange={event => this.setPayStatus(event)}/>
                        <button className={"w3-btn-insert"} onClick={event => this.handleSubmit(event)}> Edit </button>
                        <Link to={"/adminDashBoard/CartManagement"}>
                            <button className={"w3-btn-cancel"}>Cancel</button>
                        </Link>
                    </div>

                    <div class="table">
                        <ul className="responsive-table">
                            <li className="table-header">
                                <div className="col col-1">Id</div>
                                <div className="col col-2">Tên sách</div>
                                <div className="col col-3">Giá</div>
                                <div className="col col-4">Ảnh</div>
                                <div className="col col-5">Số lượng</div>
                            </li>

                            {
                                this.state.items.map(item =>
                                    <Link class="table-row">
                                        <div className="col col-1" data-label="id">{item.id.product.id}</div>
                                        <div className="col col-2" data-label="userName">{item.id.product.name}</div>
                                        <div className="col col-3" data-label="Email">{item.id.product.price} </div>
                                        <div className="col col-4 image_row" data-label="image">
                                            <div className="image">
                                                <img src={item.id.product.image} alt=""/>
                                            </div>
                                        </div>
                                        <div className="col col-5">{item.quantityItem}</div>
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

export default withRouter(InfoCart);
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

  .w3-btn-insert {
    background-color: #4CAF50;
  !important;
    border-radius: 5px;
    font-size: 17px;
    font-family: 'Source Sans Pro', sans-serif;
    padding: 6px 10px;
    color: #FFFFFF;
  }

  .w3-btn-cancel {
    background-color: #bb2d3b;
  !important;
    border-radius: 5px;
    font-size: 17px;
    font-family: 'Source Sans Pro', sans-serif;
    padding: 6px 15px;
    color: #FFFFFF;
    margin-left: 16px !important;
  }

  input[type=checkbox] {
    transform: scale(1.5);
  }


`