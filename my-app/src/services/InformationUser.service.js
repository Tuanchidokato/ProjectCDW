import axios from "axios";
import authHeader from './auth-header';


const API_URL = "http://localhost:8080/api/v2/information/";
class InformationUser{


    getInformationUser(id){
        return axios.get(
            API_URL+"getInfo/"+id
            , { headers: authHeader() }
        )
    }

    editInformation(
            id,
            firstName,
            lastName,
            address,
            phoneNumber
        ){
            return axios.put(
                API_URL+"edit/"+id,
                { headers: authHeader() }
            )
        }
}
export default new InformationUser;