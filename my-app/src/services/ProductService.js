import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/product";

class ProductService {
    
       getProductList(params) {
            return axios.get(API_URL + "/list", {params});  
       } 

       getProductDetail(id) {
              return axios.get(API_URL + "/productDetail" + "/" + id);
       }
       // get all the book category
       getCategory() {
              return axios.get(API_URL + "/findAllCate");
       }

       
}

export default new ProductService();