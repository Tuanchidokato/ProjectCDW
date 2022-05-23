import { render } from "@testing-library/react";
import { Component } from "react";
import styled from "styled-components";
import authService from "../../services/auth.service";
import InformationUserService from "../../services/InformationUser.service";
import book1 from "../../assets/bookStudent/image 11.png"
class ChangePass extends Component{

    constructor(props){
        super(props)
        this.upLoadFile= this.upLoadFile.bind(this)
        this.changeImage= this.changeImage.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
        this.state={
            userInfo:"",
            imageUrl:"",
            image:"",
            getImage:"https://www.facebook.com/photo/?fbid=1101598927367026&set=gm.1162569590951832",
        }

    }
    changeImage(e){
        this.setState({
            imageUrl:e.target.files[0]
        })
    }
    upLoadFile(e){
        e.preventDefault()
       const imageData = new FormData()
       imageData.append("file",this.state.imageUrl)
       InformationUserService.insertImage(imageData).then(
           response =>{
               console.log(response.data.data.imageUrl)
               this.setState({
                   image:response.data.data.imageUrl
               })
           },error=>{
               console.log(error)
           }
       )
       const result =  InformationUserService.getImage(this.state.image).then(
        response =>{
            console.log(response.data)
           
        },error =>{
            console.log(error)
        }
    )

    }
    componentDidMount(e){
      
       
    }
    render(){
        return(
            <Div>
                <div>
                   <form action="">
                     <img
                        src={"http://localhost:8080/api/auth/FileUpLoad/file/ad70b7a1-dab4-4348-b971-7572c6eba3e7.jpg"} 
                     />
                    <input type="file" name="" 
                    onChange={this.changeImage}
                    id="" />
                    <button onClick={this.upLoadFile}>upload</button>
                    káhdaldhlkajshdlk
                   </form>
                </div>
            </Div>
        )
    }
}
export default ChangePass;
const Div = styled.div`
    color: #FFFF;
`;