import { render } from "@testing-library/react";
import { Component, useState , useEffect} from "react";
import styled from "styled-components";
import authService from "../../services/auth.service";
import InformationUserService from "../../services/InformationUser.service";
import book1 from "../../assets/bookStudent/image 11.png"
import { storage } from "../../config/firebase/firebase";
const  ChangePass =()=>{

    const [user,setUser]=useState(null)
   
    const changeImage=async(e)=>{
      const file = e.target.files[0];
      const storageRef = storage.ref(`listImage/`)
      const fileRef = storageRef.child(file.name)
      await fileRef.put(file)
      const fileUrl =await fileRef.getDownloadURL()
      console.log(fileUrl)
      InformationUserService.insertImage(fileUrl).then(
          response=>{
              console.log(response)
              setUser(response.data.data)
              console.log(user.imageUrl)
          },
          err=>{
              console.log(err)
          }
      )
    }
    const  upLoadFile=(e)=>{
        e.preventDefault()
     
    

    }
    useEffect(()=>{
      // const user = authService.getCurrentUser()
       console.log("jhasgd")
    },[])
     
        return(
            <Div>
                <div>
                   <form action="">
                   
                    <input type="file" name="" 
                    onChange={changeImage}
                    id="" />
                    <button onClick={upLoadFile}>upload</button>
                    káhdaldhlkajshdlk
                   </form>
                </div>
            </Div>
        )
}
export default ChangePass;
const Div = styled.div`
    color: #FFFF;
`;