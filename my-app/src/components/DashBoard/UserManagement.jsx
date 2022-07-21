import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import InformationUserService from "../../services/InformationUser.service";


function UserManagement(){

    const [users,setUsers]=useState([])
    const [username,setUsername] =useState("")
    const [email,setEmail] =useState("")
    const [role,setRole] =useState("")

    

    useEffect(()=>{
        InformationUserService.getAllUser().then(
            res=>{
                setUsers(res.data)
            }
        )
    },[])

    const onchangeUsername=(e)=>{

        setUsername(e.target.value)
    }
    const onChangeEmail=(e)=>{

        setEmail(e.target.value)
    }
    
    const onChangeRole =(e)=>{
        setRole(e.target.value)
    }
    // check role
    const check=(arr,role)=>{
        for (let index = 0; index < arr.length; index++) {
            if(arr[index].name===role){
                return true
            }else{
                return false
            }
        }
    }
    const handlerFilter=(e)=>{
        e.preventDefault()
        // const m= 'PhamPhuong'
         const n= 'caotuan01042000@gmail.com'
        // const b=['PhamPhuong','caotuan01042000@gmail.com']
        const newList = users.filter(user=>{
            return  user.email.toLowerCase() === email.toLowerCase()
                || 
                user.username.toLowerCase() === username.toLowerCase()

                // || 
                // check(user.roles,role)

        })
        setUsers(newList)
        console.log(newList)
    }
    return (
        <Div>
            <div className="dash-content">
                <div className="overview">
                    <div className="title">
                        <i class="fa-solid fa-gauge"></i>
                        <span className="text">DashBoard</span>
                    </div>

                    <div className="boxes">
                       <div className="filterInfo">
                            <div className="user">
                                <p>Username</p>
                                <input
                                    onChange={onchangeUsername}
                                    type="text"
                                 />
                            </div>
                            <div className="email">
                                <p>Email</p>
                                <input 
                                    onChange={onChangeEmail}
                                    type="text" />
                            </div>
                       </div>
                       <div className="filterInfo">
                            <div className="Roles">
                                <p>Roles</p>
                                <select 
                                    onChange={onChangeRole}
                                    name="" id="">
                                    <option value="Role">choose role</option>
                                    <option value="ROLE_USER">ROLE_USER</option>
                                    <option value="ROLE_MODERATOR">ROLE_MODERATOR</option>
                                    <option value="ROLE_ADMIN">ROLE_ADMIN</option>
                                </select>
                            </div>
                            <div 
                                onClick={handlerFilter}
                                className="button_search">
                                <a href="">Tìm kiếm</a>
                            </div>
                       </div>
                    </div>
                </div>

                <div class="table">
                    <ul class="responsive-table">
                        <li class="table-header">
                            <div class="col col-1">id</div>
                            <div class="col col-2">Tên</div>
                            <div class="col col-3"> Email</div>
                            <div class="col col-4">Quyền</div>
                            <div class="col col-5">Ảnh đại diện</div>

                        </li>
                    
                            {
                                users.map(user=>
                                    <Link
                                        to={"/adminDashBoard/UserManagement/infoUser/"+user.id}
                                        class="table-row">
                                        <div class="col col-1" data-label="id">{user.id}</div>
                                        <div class="col col-2" data-label="userName">{user.username}</div>
                                        <div class="col col-3" data-label="Email">{user.email} </div>
                                        <div class="col col-4" data-label="roles">
                                            <select name="" id="">
                                                {
                                                    user.roles.map(role=>
                                                        <option value={role.name}>{role.name}</option>    
                                                    )
                                                }   
                                                
                                            </select>    
                                        </div>
                                        <div class="col col-5 image_row" data-label="image">
                                            <div className="image">
                                                <img src={user.imageUrl} alt="" />
                                            </div>
                                        </div>
                                    </Link>
                                )
                            }
                    </ul>
                </div>
            </div>
        </Div>
    )
}
export default UserManagement;
const Div =styled.div`
           .dash-content{
            padding-top: 60px;
            font-size: 20px;
            margin-left: 250px;
            width: calc(100% - 250px);
            transition: var(--tran-05);
            .title{
                display: flex;
                align-items: center;
                margin: 70px 0 30px 0;
                i{
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
                .text{
                    font-size: 20px;
                    font-weight: 500;
                    color: var(--text-color);
                    margin-left: 10px;
                }
            }
            .boxes{
                color:var(--text-color);
                display: flex;
                justify-content: space-evenly !important;
                
                .filterInfo{
                    display: flex;
                    flex-direction: column;
                    .button_search{
                        margin-top: 40px;
                        background-color: var(--box1-color);
                        display: flex;
                        justify-content: center;
                        padding: 5px 5px ;
                        border-radius: 5px;
                        border: 1px solid var(--border-color);
                        transition: var(--tran-05);
                        cursor: pointer;
                        a{
                            color: var(--text-color);
                            text-decoration: none;
                        }
                        :hover{
                            background-color: #7a7a7a;
                        }
                    }
                }
                input{
                    outline: none;
                    border: 1px solid #7a7a7a;
                    color: #000;
                }
                select{
                    width: 248px;
                    min-height: 36px;
                    color: #000;
                }
            }

            .table{                  
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
                        select{
                            border: 1px solid #4b4b4b;
                            outline: none;
                        }

                    }
                    .col-5 {
                        flex-basis: 20%;
                        border-right: 1px solid #6C7A89;
                       
                    }
                    .image_row{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        .image{
                            position: absolute;
                            z-index: 0;
                            border-image: none;
                            border-style: solid;
                            border-width: 1px;
                            height: 60px;
                            width: 60px;
                            overflow: hidden;
                            margin: auto;
                            img{
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