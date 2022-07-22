package com.example.TestLogin.Service.impl;

import com.example.TestLogin.Model.ShoppingCart.Items;
import com.example.TestLogin.Repository.ItemsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemsService {

    @Autowired
    private ItemsRepository itemsRepository;

    public void saveItems(Items items) {
        itemsRepository.save(items);
    }

    public List<Items> findAll() {
        return itemsRepository.findAll();
    }
}
