package com.example.TestLogin.Service.impl;

import com.example.TestLogin.Model.ShoppingCart.Items;
import com.example.TestLogin.Repository.ItemsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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

    public List<Items> getCartContents(Long id) {
        List<Items> itemsList = itemsRepository.findAll();
        List<Items> result = new ArrayList<>();
        for (Items item: itemsList) {
            if (item.getId().getCart().getId() == id) {
                result.add(item);
            }
        }
        return result;
    }

}
