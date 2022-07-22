package com.example.TestLogin.Service.impl;

import com.example.TestLogin.Model.ProductManage.Product;
import com.example.TestLogin.Service.ICart;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class Cart_Handling implements ICart {

    private Map<Long, Item_Handling> items = null;
    int soluongSanPham = 0;

    public Cart_Handling() {
        items = new HashMap<>();
    }


    @Override
    public void add(Long productId, Product product, int soluong) {
        if (items.containsKey(productId)) {
            if (soluong == items.get(productId).getSoLuong()) {
                Item_Handling scitem = items.get(productId);
                scitem.tangSoLuong();
            } else {
                Item_Handling scitem = items.get(productId);
                scitem.setSoLuong(soluong + scitem.getSoLuong());
            }
        } else {
            Item_Handling newProduct = new Item_Handling(product);
            newProduct.setSoLuong(soluong);
            items.put(productId, newProduct);
        }
    }

    @Override
    public void remove(Long productId) {
        if (items.containsKey(productId)) {
            Item_Handling scitem = items.get(productId);
            items.remove(productId);
            soluongSanPham = soluongSanPham - scitem.getSoLuong();
            System.out.println("Đã xóa " + scitem.getProduct().getName());
        }
    }

    @Override
    public void decreament(Long productId) {
        if (items.containsKey(productId)) {
            Item_Handling scitem = items.get(productId);
            scitem.giamSoLuong();

            if (scitem.getSoLuong() <= 0) {
                items.remove(productId);
            }
            soluongSanPham--;
        }
    }

    @Override
    public List<Item_Handling> getItems() {
        List<Item_Handling> results = new ArrayList<Item_Handling>();
        results.addAll(this.items.values());
        return results;
    }

    @Override
    public int getNumberOfItems() {
        soluongSanPham = 0;
        Iterator<Item_Handling> i = getItems().iterator();
        while (i.hasNext()) {
            i.next();
            soluongSanPham += 1;
        }

        return soluongSanPham;
    }

    @Override
    public float getTotal() {
        float amount = 0;

        Iterator<Item_Handling> iter = getItems().iterator();
        while (iter.hasNext()) {
            Item_Handling scit = iter.next();
            Product b = scit.getProduct();

            if (b.getDiscount() > 0) {
                amount += (b.getPrice() * ((100 - b.getDiscount()) / 100) * scit.getSoLuong());
            } else {
                amount += (b.getPrice() * scit.getSoLuong());
            }

        }

        return amount;
    }

    @Override
    public void clear() {
        System.out.println("Clearing cart.");
        items.clear();
        soluongSanPham = 0;
    }


}
