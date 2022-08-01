package com.example.TestLogin.Service.impl;

import com.example.TestLogin.Model.ShoppingCart.ShoppingCart;
import com.example.TestLogin.Repository.ShoppingCartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {

    @Autowired
    private ShoppingCartRepository shoppingCartRepository;

    public List<ShoppingCart> getAllCart() { return shoppingCartRepository.findAll(); }
    public void saveCart(ShoppingCart shoppingCart) {
        shoppingCartRepository.save(shoppingCart);
    }

    public Boolean editCart(Long id , Boolean check) {
        ShoppingCart shoppingCart = shoppingCartRepository.findById(id).orElseThrow(() -> new RuntimeException("not found"));
        shoppingCart.setPayStatus(check);
        shoppingCartRepository.save(shoppingCart);
        return true;
    }


}
