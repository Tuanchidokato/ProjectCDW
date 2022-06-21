import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/cart";

class CartService {


       addItem(id) {
              return axios.get(API_URL + "/addProduct" + "/" + id, {
                     withCredentials: true,
                     headers: {
                            'Access-Control-Allow-Credentials': true
                     }
              });
       }

       getItemListCart() {
              return axios.get(API_URL + "/itemList", {
                     withCredentials: true,
                     headers: {
                            'Access-Control-Allow-Credentials': true
                     }
              });
       }

       handlingCart() {
              var user = JSON.parse(localStorage.getItem('user'));
              return axios.post(API_URL + "/handleCart", user, {
                     withCredentials: true,
                     headers: {
                            'Access-Control-Allow-Credentials': true
                     }
              });
       }

}

export default new CartService();