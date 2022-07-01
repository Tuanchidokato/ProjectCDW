import axios from "axios";
import authService from "./auth.service";


const API_URL = "http://localhost:8080/api/auth/cart";
const headers = {
       'Content-Type': 'application/json',
       'Access-Control-Allow-Credentials': true
}

class CartService {

       addItem(id , quantity) {
              axios.defaults.withCredentials = true;
              axios.get(API_URL + "/addProduct" + "/" + id + "?quantity=" + quantity, headers).then((response) => {
                     console.log(JSON.stringify(response.data));
              }).catch((err) => {
                     console.log("Something went wrong");
              });
       }

       getItemListCart() {
              axios.defaults.withCredentials = true;
              return axios.get(API_URL + "/itemList", headers);
       }

       handlingCart(address , typePayment) {
              axios.defaults.withCredentials = true;
              const user = authService.getCurrentUser();
              return axios.post(API_URL + "/handleCart?address=" + address + "&typePayment=" + typePayment  , user  ,headers);
       }

       removeItem(id) {
              axios.defaults.withCredentials = true;
              axios.delete(API_URL + "/remove?id=" + id, headers);
              window.location.reload();
       }

       increaseItem(id) {
              axios.defaults.withCredentials = true;
              axios.get(API_URL + "/increase?id=" + id, headers);
              window.location.reload();
       }

       decreaseItem(id) {
              axios.defaults.withCredentials = true;
              axios.get(API_URL + "/decrease?id=" + id, headers);
              window.location.reload();
       }

       clearCart() {
              axios.defaults.withCredentials = true;
              axios.delete(API_URL + "/clear" , headers);
              window.location.reload();
       }

}

export default new CartService();