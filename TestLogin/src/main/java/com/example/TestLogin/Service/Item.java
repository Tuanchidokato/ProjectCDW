package com.example.TestLogin.Service;

import com.example.TestLogin.Model.ProductManage.Product;


public class Item implements IItem{

    private Product product;
    private int soLuong;

    public Item(Product product) {
        this.product = product;
        this.soLuong = 1;
    }

    @Override
    public String toString() {
        return "Item{" +
                "product=" + product.toString() +
                ", soLuong=" + soLuong +
                '}';
    }

    @Override
    public void giamSoLuong(){
        soLuong--;
    }

    @Override
    public void tangSoLuong(){
        soLuong++;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public int getSoLuong() {
        return soLuong;
    }

    public void setSoLuong(int soLuong) {
        this.soLuong = soLuong;
    }

}
