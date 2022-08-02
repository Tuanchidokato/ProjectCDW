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

       getPopularProducts() {
              return axios.get(API_URL + "/popularProducts");
       }

       getAllProduct() {
              return axios.get(API_URL + "/getAll");
       }

       searchProducts(params , searchText) {
              return axios.get(API_URL + "/searchProduct" + "/" + searchText , {params})
       }

       addProduct(product) {
              return axios.post(API_URL + "/insert" , product)
       }

       editProduct(id , product) {
              return axios.put(API_URL  + "/edit/" + id , product);
       }

       removeProduct(id) {
              return axios.delete(API_URL + "/delete/" + id);
       }


}

export default new ProductService();