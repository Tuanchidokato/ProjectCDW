package com.example.TestLogin.Repository;

import com.example.TestLogin.Model.ShoppingCart.ShoppingCart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShoppingCartRepository extends JpaRepository<ShoppingCart , Long> {
}
