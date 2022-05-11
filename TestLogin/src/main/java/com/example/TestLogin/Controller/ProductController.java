package com.example.TestLogin.Controller;

import com.example.TestLogin.Model.ProductManage.Categories;
import com.example.TestLogin.Model.ProductManage.Product;
import com.example.TestLogin.Repository.CategoriesRepository;
import com.example.TestLogin.Repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/product")
public class ProductController {
    @Autowired
    ProductRepository productRepository;

    @Autowired
    CategoriesRepository categoriesRepository;

    @PostMapping("/insert")
    boolean insertProduct(){
        Categories categories = new Categories("Detective");


        Product product = new Product("True Detective","hai",20000,new Date(2022,04,02),5,true,categories);
        productRepository.save(product);
        return true;
    }

    @GetMapping("/findAllCate")
    List<Categories> getCategories(){

        return categoriesRepository.findAll();
    }

    @GetMapping("/{id}")
    Optional<Categories> findById(@PathVariable Long id){
        return categoriesRepository.findById(id);
    }
}
