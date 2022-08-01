package com.example.TestLogin.Controller;

import com.example.TestLogin.Model.ProductManage.Categories;
import com.example.TestLogin.ModelDTO.ProductMange.ProductDTO;
import com.example.TestLogin.Service.impl.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth/product")
public class ProductController {
    @Autowired
    ProductService productService;

    @PostMapping("/insert")
    boolean insertProduct(@RequestBody ProductDTO productDTO) throws ParseException {
        productService.insertProduct(productDTO);
        return true;
    }

    @PutMapping("/edit/{id}")
    boolean editProduct (@PathVariable Long id , @RequestBody ProductDTO productDTO) throws ParseException {
        productService.editProduct(id , productDTO);
        return true;
    }

    @DeleteMapping("/delete/{id}")
    boolean deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return true;
    }

    @GetMapping("/findAllCate")
    List<Categories> getCategories() {
        return productService.getCategories();
    }

    @GetMapping("/{id}")
    Optional<Categories> findById(@PathVariable Long id) {
        return productService.findById(id);
    }

    @GetMapping("/list")
    ResponseEntity<Map<String, Object>> productList(@RequestParam(defaultValue = "0") int page
            , @RequestParam(defaultValue = "1") int size) {
        return new ResponseEntity<>(productService.productList(page, size), HttpStatus.OK);
    }

    @GetMapping("/productDetail/{id}")
    ResponseEntity<?> getProductDetail(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductDetail(id));
    }

    //Tim Kiem
    @GetMapping("/searchProduct/{searchText}")
    ResponseEntity<Map<String, Object>> searchProducts(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "1") int size
            , @PathVariable String searchText) {
        return new ResponseEntity<>(productService.searchProducts(page, size, searchText), HttpStatus.OK);
    }

    //Lấy 4 sản phẩm bán chạy nhất
    @GetMapping("/popularProducts")
    ResponseEntity<?> getPopularProducts() {
        return ResponseEntity.ok(productService.getPopularProducts()) ;
    }


    //get all product
    @GetMapping("/getAll")
    List<?> getAllProduct(){
        return productService.getAllProduct();
    }
}
