package com.example.TestLogin.Repository;

import com.example.TestLogin.Model.ProductManage.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product,Long>{

}
