package com.example.TestLogin.Service;

import com.example.TestLogin.Model.ProductManage.Product;

import java.util.List;

public interface ICart {
    public void add(Long productId, Product product , int soluong);

    public void remove(Long productId);

    public void decreament(Long productId);

    public List<Item> getItems();

    public int getNumberOfItems();

    public float getTotal();

    public void clear();
}
