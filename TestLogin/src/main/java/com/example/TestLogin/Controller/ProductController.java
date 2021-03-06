package com.example.TestLogin.Controller;

import com.example.TestLogin.Model.ProductManage.Categories;
import com.example.TestLogin.Model.ProductManage.Product;
import com.example.TestLogin.Repository.CategoriesRepository;
import com.example.TestLogin.Repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth/product")
public class ProductController {
    @Autowired
    ProductRepository productRepository;

    @Autowired
    CategoriesRepository categoriesRepository;


    @PostMapping("/insert")
    boolean insertProduct() {
        Categories categories = new Categories("Detective");
//        Product product = new Product("True Detective", "hai", 20000, "", new Date(2022, 04, 02), 5, true, categories);
//        productRepository.save(product);
        return true;
    }

    @GetMapping("/findAllCate")
    List<Categories> getCategories() {
        return categoriesRepository.findAll();
    }

    @GetMapping("/{id}")
    Optional<Categories> findById(@PathVariable Long id) {
        return categoriesRepository.findById(id);
    }

    @GetMapping("/list")
    ResponseEntity<Map<String, Object>> productList(@RequestParam(defaultValue = "0") int page
            , @RequestParam(defaultValue = "1") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Product> productPage = productRepository.findAll(pageable);
        List<Product> searchResults;
        searchResults = productPage.getContent();
        Map<String, Object> response = new HashMap<>();
        response.put("productList", searchResults);
        response.put("currentPage", productPage.getNumber());
        response.put("totalItems", productPage.getTotalElements());
        response.put("totalPages", productPage.getTotalPages());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/productDetail/{id}")
    ResponseEntity<?> getProductDetail(@PathVariable Long id) {
        Product product = productRepository.findById(id).orElseThrow(() -> new RuntimeException("not found"));
        return ResponseEntity.ok(product);
    }

    //Tim Kiem
    @GetMapping("/searchProduct/{searchText}")
    ResponseEntity<Map<String, Object>> searchProducts(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "1") int size
            , @PathVariable String searchText) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Product> searchProductByName = productRepository.searchProductByName(pageable, searchText);
        List<Product> searchResults;
        searchResults = searchProductByName.getContent();
        Map<String, Object> response = new HashMap<>();
        response.put("productList", searchResults);
        response.put("currentPage", searchProductByName.getNumber());
        response.put("totalItems", searchProductByName.getTotalElements());
        response.put("totalPages", searchProductByName.getTotalPages());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    //L???y 4 s???n ph???m b??n ch???y nh???t
    @GetMapping("/popularProducts")
    ResponseEntity<?> getPopularProducts() {
        return ResponseEntity.ok(productRepository.getItemsPopular()) ;
    }


    //get all product
    @GetMapping("/getAll")
    List<?> getAllProduct(){
        return productRepository.findAll();
    }
}
