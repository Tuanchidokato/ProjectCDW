import { Component } from "react";
import styled from "styled-components";
import book1 from "../../assets/bookStudent/image 2.png"
import {Link} from "react-router-dom"
import Information from "../../components/ProfileInformation/Information";
import informationUser from "../../services/InformationUser.service"
import authService from "../../services/auth.service";
import ChangePass from "../../components/ProfileInformation/ChangePass";
import { Route } from "react-router-dom";
class Profile extends Component{

    constructor(props){
        super(props)
        this.fileSelectedHandler= this.fileSelectedHandler.bind(this)
        this.state={
            selectedFiles: undefined,
            currentFile: undefined,
            progress: 0,
            message: "",
            fileInfos: [],

        }

    }
    fileSelectedHandler(e){
        
        let selectedFile=e.target.files[0];
       
        informationUser.insertImage(selectedFile).then(
            (response)=>{
                console.log(response.data)
            }
        )
    }
 


    render(){
        return(
            <Div>
                <div className="section_information">
                   <div className="container-fluid row">
                       <div className="control_option_main col-md-3">
                          <div className="control_option">
                            <div className="avatar">
                                <div className="avatar_edit">
                                    <img src={book1} alt="" />
                                </div>
                                <div>

                                <label htmlFor="change-img">
                                    <i type="file" className="fa fa-pencil"></i>
                                    <input 
                                        id="change-img" 
                                        hidden type="file" 
                                        accept="image/png, image/jpeg" 
                                        onChange={this.fileSelectedHandler}
                                    />
                                </label>
                                </div>
                                <h1>Cao Tuan</h1>
                            </div>

                            <div className="control">
                                <Link to="/home/profile">Xem trang cá nhân</Link>
                                <Link to="/home/profile/changePass">Đổi mật khẩu</Link>
                            </div>
                          </div>
                       </div>
                       <div className="information_ col-md-8">
                           <div className="form_profile">
                               <Route exact path={["/home/profile"]}>
                                   <Information />
                               </Route>
                               <Route exact path="/home/profile/changePass">
                                   <ChangePass />
                               </Route>
                           </div>
                       </div>
                   </div>
                </div>
            </Div>
        )
    }
}
export default Profile;
const Div=styled.div`
    background-color: #423a3a;
    .control_option{
            margin-top: 15px;
            border: 2px #FFFFFF !important;
            background-color: #ceb6b6;
            border-radius: 10px;
            max-width: 280px;
            height: 360px !important;
            margin-left: 30px;
            .avatar{
                text-align: center;
                padding-top: 20px;
                .avatar_edit{
                        border-image: none;
                        border-radius: 50% 50% 50% 50%;
                        border-style: solid;
                        border-width: 1px;
                        height: 150px;
                        width: 150px;
                        overflow: hidden;
                        margin: auto;
                        img{
                            height: 100%;
                            width: 100%;
                            
                        
                     }
                }
                i{
                    position: absolute;
                    color: #FFFFFF;
                    background-color: #423a3a;
                    border-radius: 50%;
                    padding: 7px;
                    font-size: 10px;
                    cursor: pointer;
                    margin-top: -45px;
                    margin-left: 31px;
                }
                input{
                    z-index: 999;
                }
                h1{
                    font-size: 30px;
                }
            }
            .control{
                margin-top: 20px;
                border-radius: 10px;
                right: 4px;
                background-color: #f1f1f1;
                min-width: 130px;
                box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
                z-index: 1;
                margin-bottom: 30px;
                a{
                    text-decoration: none;
                    display: block;
                    color: #000000;
                    font-size: 20px;
                    margin-left: 20px;
                    font-weight: 500;
                    padding-bottom: 10px;
                    padding-top: 10px;
                    :hover{
                        transition: 3s all;
                        text-decoration-line: underline;
                    }
                }
            }
        }
`;