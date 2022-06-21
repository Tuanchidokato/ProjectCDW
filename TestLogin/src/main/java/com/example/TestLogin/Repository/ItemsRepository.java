package com.example.TestLogin.Repository;

import com.example.TestLogin.Model.ProductManage.Product;
import com.example.TestLogin.Model.ShoppingCart.Items;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemsRepository extends JpaRepository<Items , Long> {
}
