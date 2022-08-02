import axios from "axios";
import authHeader from './auth-header';
import authService from "./auth.service";


const API_URL = "http://localhost:8080/api/auth/";
const UPLOAD_IMAGE = "UPLOAD_IMAGE";
class InformationUser{


    getInformationUser(id){
        return axios.get(
            API_URL+"getInfo/"+id
 //           , { headers: authHeader() }
        )
    }

    editInformation(id,
            firstName,
            lastName,
            address,
            phoneNumber
        ){
            return axios.post(
                API_URL+"edit/"+id,
                {
                    firstName,
                    lastName,
                    address,
                    phoneNumber
                }
            )
        }
        insertImage(id,imageUrl){
            
            return axios.post(API_URL+"FileUpLoad/"+id,{imageUrl})
        }

         getImage(imageUrl){
            return axios.get(API_URL+"FileUpLoad/file/"+ imageUrl)
         }
         getAllUser(){
            return axios.get(API_URL+"getAllUser")
         }
}
export default new InformationUser;