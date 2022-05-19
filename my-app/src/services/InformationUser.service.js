import axios from "axios";
import authHeader from './auth-header';
import authService from "./auth.service";


const API_URL = "http://localhost:8080/api/auth/";
class InformationUser{


    getInformationUser(id){
        return axios.get(
            API_URL+"getInfo/"+id
 //           , { headers: authHeader() }
        )
    }

    editInformation(
            firstName,
            lastName,
            address,
            phoneNumber
        ){
            const id= authService.getCurrentUser().id;
            return axios.put(
                API_URL+"edit/"+id,
                {
                    firstName,
                    lastName,
                    address,
                    phoneNumber
                }
            )
        }
}
export default new InformationUser;