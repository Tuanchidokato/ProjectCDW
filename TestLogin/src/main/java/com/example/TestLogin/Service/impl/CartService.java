package com.example.TestLogin.Service.impl;

import com.example.TestLogin.Model.ShoppingCart.Items;
import com.example.TestLogin.Model.ShoppingCart.ShoppingCart;
import com.example.TestLogin.Repository.ItemsRepository;
import com.example.TestLogin.Repository.ShoppingCartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {

    @Autowired
    private ShoppingCartRepository shoppingCartRepository;



    public void saveCart(ShoppingCart shoppingCart) {
        shoppingCartRepository.save(shoppingCart);
    }


}
