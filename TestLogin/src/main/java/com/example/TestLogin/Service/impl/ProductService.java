package com.example.TestLogin.Service.impl;

import com.example.TestLogin.Model.ProductManage.Categories;
import com.example.TestLogin.Model.ProductManage.Product;
import com.example.TestLogin.ModelDTO.ProductMange.ProductDTO;
import com.example.TestLogin.Repository.CategoriesRepository;
import com.example.TestLogin.Repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class ProductService {
    @Autowired
    ProductRepository productRepository;

    @Autowired
    CategoriesRepository categoriesRepository;

    public boolean insertProduct(ProductDTO productDTO) throws ParseException {
        Product product = new Product();
        return SettingObject(productDTO, product);
    }

    public boolean editProduct(Long id, ProductDTO productDTO) throws ParseException {
        Product product = productRepository.findById(id).orElseThrow(() -> new RuntimeException("not found"));
        return SettingObject(productDTO, product);
    }

    public boolean deleteProduct(Long id) {
        Product product = productRepository.findById(id).orElseThrow(() -> new RuntimeException("not found"));
        productRepository.delete(product);
        return true;
    }

    public List<Categories> getCategories() {
        return categoriesRepository.findAll();
    }

    public Optional<Categories> findById(Long id) {
        return categoriesRepository.findById(id);
    }

    public Map<String, Object> productList(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Product> productPage = productRepository.findAll(pageable);
        return getStringObjectMap(productPage);
    }

    public Product getProductDetail(Long id) {
        Product product = productRepository.findById(id).orElseThrow(() -> new RuntimeException("not found"));
        return product;
    }

    //Tim Kiem
    public Map<String, Object> searchProducts(int page, int size
            , String searchText) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Product> searchProductByName = productRepository.searchProductByName(pageable, searchText);
        return getStringObjectMap(searchProductByName);
    }


    //Lấy 4 sản phẩm bán chạy nhất
    public List<?> getPopularProducts() {
        return productRepository.getItemsPopular();
    }

    //get all product
    public List<?> getAllProduct() {
        return productRepository.findAll();
    }


    private Map<String, Object> getStringObjectMap(Page<Product> searchProductByName) {
        List<Product> searchResults;
        searchResults = searchProductByName.getContent();
        Map<String, Object> response = new HashMap<>();
        response.put("productList", searchResults);
        response.put("currentPage", searchProductByName.getNumber());
        response.put("totalItems", searchProductByName.getTotalElements());
        response.put("totalPages", searchProductByName.getTotalPages());
        return response;
    }

    private boolean SettingObject(ProductDTO productDTO, Product product) throws ParseException {
        product.setName(productDTO.getName());
        product.setImage(productDTO.getImage());
        product.setAuthor(productDTO.getAuthor());
        product.setNxb(productDTO.getNxb());
        product.setPrice(productDTO.getPrice());
        product.setDiscount(productDTO.getDiscount());
        product.setDescription(productDTO.getDescription());
        product.setDate(productDTO.getDate());
        product.setQuantity(productDTO.getQuantity());
        product.setAvailable(productDTO.isAvailable());
        Long cate_id = (long) productDTO.getCategory();

        System.out.println(cate_id);
        Categories categories = categoriesRepository.findById(cate_id).get();
        product.setCategories(categories);

        productRepository.save(product);
        return true;
    }
}
