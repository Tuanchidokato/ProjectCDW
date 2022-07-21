import { Component } from "react";
import { withRouter } from "react-router";
import styled from "styled-components";
import image from "../../assets/bookStudent/image 3.png"
import InformationUserService from "../../services/InformationUser.service";
class InfoUser extends Component{

   constructor(props){
    super(props)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.state={
        user:"",
        imageUrl:"",
        account:""
    }
   }
    componentDidMount(){
        let {id} = this.props.match.params;
        InformationUserService.getInformationUser(id).then(
            res=>{
                 this.setState({
                    user:res.data.data,
                    imageUrl:res.data.data.user.imageUrl,
                    account:res.data.data.user

                })
                console.log(this.state.user)

                // setImageUrl(user.user)
                // console.log(imageUrl)
            },
            err=>{
                console.log(err)
            }
        )
    }
    render(){
        return(
            <Div>
                <div className="InfoUser">
                    <div className="managementUser">
                        <div className="infoUser1 image">
                            <div className="imageUser">
                                <img src={this.state.imageUrl} alt="" />
                            </div>
                            <div className="name">
                                <p>Cao</p>
                                <p>  </p>
                                <p>Tuan</p>
                            </div>
                        </div>
                        <div className="infoUser1">
                            <div className="detailInfo">
                                <div className="title">
                                    <p>Thông tin cá nhân</p>
                                </div>
                                <div className="infoContent">
                                    <div className="content_1">
                                        <div className=" content_item id">
                                            <p>id</p>
                                            <input 
                                                value={this.state.user.id}
                                                type="text" name="" id="" />
                                        </div>
                                        <div className="content_item username">
                                            <p>Username</p>
                                            <input 
                                                defaultValue={this.state.account.username}
                                                type="text" name="" id="" />
                                        </div>
                                        <div className="content_item email">
                                            <p>email</p>
                                            <input 
                                                defaultValue={this.state.account.email}
                                                type="text" name="" id="" />
                                        </div>
                                        <div className="content_item phoneNumber">
                                            <p>Phone number</p>
                                            <input 
                                                defaultValue={this.state.user.phoneNumber}
                                            type="text" name="" id="" />
                                        </div>
                                    </div>
    
                                    <div className="content_1">
                                        <div className="content_item firstName">
                                            <p>First name</p>
                                            <input 
                                                defaultValue={this.state.user.firstName}
                                            type="text" name="" id="" />
                                        </div>
                                        <div className="content_item lastName">
                                            <p>Last name</p>
                                            <input 
                                                defaultValue={this.state.user.lastName}
                                                type="text" name="" id="" />
                                        </div>
                                        <div className="content_item address">
                                            <p>Address</p>
                                            <input 
                                                defaultValue={this.state.user.address}
                                                type="text" name="" id="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Div>
        )
    }
    }
  
export default withRouter(InfoUser);
const Div= styled.div`
    .InfoUser{

        padding-top: 90px;
        font-size: 20px;
        margin-left: 250px;
        width: calc(100% - 250px);
        transition: var(--tran-05);
        color: var(--text-color);
        .managementUser{
            display: flex;
            justify-content: space-around;
            .infoUser1{
                //background-color: beige;
                border: 1px solid var(--border-color);
                padding: 20px 20px;
                border-radius: 5px;
                .imageUser{
                    background-color: #adadad;
                    display: flex;
                    justify-content: center;
                    z-index: 0;
                    border-image: none;
                    border-style: solid;
                    border-width: 1px;
                    border: none;
                    height: 200px;
                    width: 200px;
                    border-radius: 50%;
                    overflow: hidden;
                    margin: auto;
                    border:  1px solid var(--border-color);
                    img{
                        margin-top: 4px;
                        height: 100%;
                        width: 100%;
                        display: block;
                    }
                }
                .name{
                    display: flex;
                    justify-content: center;
                }
                .detailInfo{
                    .infoContent{
                        display: flex;
                        justify-content: space-evenly;
                        .content_1{
                            display: flex;
                            flex-direction: column;
                            .content_item{
                                display: flex;
                                align-items: center;
                                margin-top: 20px;
                                margin-left: 10px;
                                p{
                                    display: flex;
                                    align-items: center;
                                    width: 120px;
                                    font-size: 15px;
                                }
                                input{
                                    height: 35px;
                                    width: 230px;
                                    outline: none;
                                    color: #000;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
       
        
`