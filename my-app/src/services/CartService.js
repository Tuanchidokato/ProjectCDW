import axios from "axios";
import authService from "./auth.service";

const API_URL = "http://localhost:8080/api/auth/cart";

class CartService {

    addItem(id, quantity) {
        axios.get(API_URL + "/addProduct" + "/" + id + "?quantity=" + quantity, {
            withCredentials: true,
            headers: {
                "Access-Control-Allow-Origin": "http://localhost:3000",
                'Access-Control-Allow-Credentials': true
            }
        }).then((response) => {
            console.log(JSON.stringify(response.data));
        }).catch((err) => {
            console.log("Something went wrong");
        });
    }

    getItemListCart() {
        return axios.get(API_URL + "/itemList", {
                withCredentials: true,
                headers: {
                    "Access-Control-Allow-Origin": "http://localhost:3000",
                    'Access-Control-Allow-Credentials': true
                }
            }
        );
    }

    handlingCart(address, typePayment) {
        const user = authService.getCurrentUser();
        return axios.post(API_URL + "/handleCart?address=" + address + "&typePayment=" + typePayment, user, {
            withCredentials: true,
            headers: {
                "Access-Control-Allow-Origin": "http://localhost:3000",
                'Access-Control-Allow-Credentials': true
            }
        });
    }

    removeItem(id) {
        // axios.defaults.withCredentials = true;
        axios.delete(API_URL + "/remove?id=" + id, {
            withCredentials: true,
            headers: {
                "Access-Control-Allow-Origin": "http://localhost:3000",
                'Access-Control-Allow-Credentials': true
            }
        });
        window.location.reload();
    }

    increaseItem(id) {
        axios.get(API_URL + "/increase?id=" + id, {
            withCredentials: true,
            headers: {
                "Access-Control-Allow-Origin": "http://localhost:3000",
                'Access-Control-Allow-Credentials': true
            }
        }).then(response => {
            window.location.reload();
        });

    }

    decreaseItem(id) {
        axios.get(API_URL + "/decrease?id=" + id, {
            withCredentials: true,
            headers: {
                "Access-Control-Allow-Origin": "http://localhost:3000",
                'Access-Control-Allow-Credentials': true
            }
        });
        window.location.reload();
    }

    clearCart() {
        axios.delete(API_URL + "/clear", {
            withCredentials: true,
            headers: {
                "Access-Control-Allow-Origin": "http://localhost:3000",
                'Access-Control-Allow-Credentials': true
            }
        });
        window.location.reload();
    }

}

export default new CartService();