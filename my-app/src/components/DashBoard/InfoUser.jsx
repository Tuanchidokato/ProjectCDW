import { Component } from "react";
import { withRouter } from "react-router";
import styled from "styled-components";
import image from "../../assets/bookStudent/image 3.png"
import InformationUserService from "../../services/InformationUser.service";
import { withTranslation } from "react-i18next";
import { storage } from "../../config/firebase/firebase";
import {ToastContainer,toast} from "react-toastify";
import authService from "../../services/auth.service";

class InfoUser extends Component{

   constructor(props){
    super(props)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.fileSelectedHandler = this.fileSelectedHandler.bind(this)
    this.onChangeAddress=this.onChangeAddress.bind(this)
    this.onChangeEmail= this.onChangeEmail.bind(this)
    this.onChangeFirstName= this.onChangeFirstName.bind(this)
    this.onChangeLastName= this.onChangeLastName.bind(this)
    this.onChangePhoneNumber= this.onChangePhoneNumber.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.state={
        user:"",
        imageUrl:"",
        account:"",
        firstName:"",
        lastName:"",
        address:"",
        phoneNumber:""
    }
   }
    // Lấy thông tin từ form
    onChangeEmail(e){
        this.setState({
            email:e.target.value.replace(/\s\s+/g, ' ')
        })
    }
    onChangeAddress(e){
        this.setState({
            address:e.target.value.replace(/\s\s+/g, ' ')
        })
    }
    onChangeFirstName(e){
        //  const string =e.target.value
        //  var firstName =string.split(" ").pop()
        this.setState({
            lastName:e.target.value.replace(/\s\s+/g, '')
        })
        
    }
    onChangeLastName(e){
        //  const string =e.target.value
        //  var firstName =string.split(" ").pop()
        this.setState({
            firstName:e.target.value.replace(/\s\s+/g, '')
        })
        
    }
    onChangePhoneNumber(e){
    //    let value = e.target.value;
    //    if(!Number(value)){
    //         return;
    //         console.log(value)
    //    }else{
        this.setState({
            phoneNumber:e.target.value.replace(/\D/g, "")
        })
       

      

    }
    componentDidMount(){
        let {id} = this.props.match.params;
        InformationUserService.getInformationUser(id).then(
            res=>{
                 this.setState({
                    user:res.data.data,
                    imageUrl:res.data.data.user.imageUrl,
                    account:res.data.data.user,
                    firstName:res.data.data.firstName,
                    lastName:res.data.data.lastName,
                    address:res.data.data.address,
                    phoneNumber:res.data.data.phoneNumber

                })
                console.log(this.state.user)

            },
            err=>{
                console.log(err)
            }
        )
    }
    fileSelectedHandler=async(e)=>{
        
        const file=e.target.files[0];
        const today = new Date()
        const storageRef = storage.ref(`listImage/`)
        const fileRef = storageRef.child(file.name+":"+today.getMilliseconds()+":"+today.getMinutes())
        await fileRef.put(file)
        const fileUrl =await fileRef.getDownloadURL()
        console.log(fileUrl)
        let {id} = this.props.match.params;
        InformationUserService.insertImage(id,fileUrl).then(
            response=>{
                console.log(response)
                window.location.reload();
            },
            err=>{
                console.log(err)
            }
      )
    }

    // save information user
    handleSave(e){
        e.preventDefault();
        let {id}= this.props.match.params;
        InformationUserService.editInformation(
            id,
            this.state.firstName,
            this.state.lastName,
            this.state.address,
            this.state.phoneNumber
        ).then(
            response =>{
              //  window.location.reload()
                toast.success('🦄 Lưu thông tin thành công!');

                console.log(response)
            },
            error=>{
                toast.error("Lưu thất bại")
            }
        )   
        
        
    }
    render(){
        const {t,i18n}=this.props
        return(
            <Div>
                <ToastContainer />
                <div className="InfoUser">
                    <div className="managementUser">
                        <div className="infoUser1 image">
                            <div className="imageUser">
                                <img src={this.state.imageUrl} alt="" />
                            </div>
                            <label htmlFor="change-img">
                                <i type="file" className="fa fa-pencil"></i>
                                <input 
                                    id="change-img" 
                                    hidden type="file" 
                                    accept="image/png, image/jpeg" 
                                    onChange={this.fileSelectedHandler}
                                />
                            </label>
                            <div className="name">
                                <p>{this.state.user.lastName}</p>
                                <p>  </p>
                                <p>{this.state.user.firstName}</p>
                            </div>
                        </div>
                        <div className="infoUser1">
                            <div className="detailInfo">
                                <div className="title">
                                    <p>{t('infoUser.info')}</p>
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
                                            <p>{t('infoUser.username')}</p>
                                            <input 
                                                value={this.state.account.username}
                                                type="text" name="" id="" />
                                        </div>
                                        <div className="content_item email">
                                            <p>email</p>
                                            <input 
                                                value={this.state.account.email}
                                                type="text" name="" id="" />
                                        </div>
                                        <div className="content_item phoneNumber">
                                            <p>{t('infoUser.phoneNumber')}</p>
                                            <input 
                                                onChange={this.onChangePhoneNumber}
                                                defaultValue={this.state.user.phoneNumber}
                                                type="text" name="" id="" />
                                        </div>
                                    </div>
    
                                    <div className="content_1">
                                        <div className="content_item firstName">
                                            <p>{t('infoUser.firstName')}</p>
                                            <input 
                                                onChange={this.onChangeFirstName}
                                                defaultValue={this.state.user.firstName}
                                            type="text" name="" id="" />
                                        </div>
                                        <div className="content_item lastName">
                                            <p>{t('infoUser.lastName')}</p>
                                            <input 
                                                onChange={this.onChangeLastName}
                                                defaultValue={this.state.user.lastName}
                                                type="text" name="" id="" />
                                        </div>
                                        <div className="content_item address">
                                            <p>{t('infoUser.address')}</p>
                                            <input 
                                                onChange={this.onChangeAddress}
                                                defaultValue={this.state.user.address}
                                                type="text" name="" id="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="button_control">
                        <button
                            onClick={this.handleSave}
                        >
                            Lưu
                        </button>
                    </div>
                </div>
            </Div>
        )
    }
    }
  
export default withTranslation() (withRouter(InfoUser));
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
                
                i{
                    position: absolute;
                    margin-top: -10px;
                    background-color: #000;
                    font-size: 15px;
                    padding: 7px;
                    border-radius: 50% ;
                    margin-left: 98px;
                    margin-top: -43px;
                    cursor: pointer;
                }
                .imageUser{
                    display: flex;
                    width: 150px;
                    height: 150px;
                    position: relative;
                    overflow: hidden;
                    border-radius: 50%;
                    background-color: #919191;
                    img{
                        display: inline;
                        margin: 0 auto;
                        height: 110%;
                        width: auto;
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
        .button_control{
            display: flex;
            flex-direction: row-reverse;
            width: calc(100% - 35px);
            margin-top: 10px;
            button{
                background-color: #000;
                width: 100px;
            }
        }
    }
       
        
`