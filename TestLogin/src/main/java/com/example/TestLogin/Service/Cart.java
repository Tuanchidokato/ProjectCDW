package com.example.TestLogin.Service;

import com.example.TestLogin.Model.ProductManage.Product;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class Cart implements ICart {
    private Map<Long , Item> items = null;
    int soluongSanPham = 0;

    public Cart() {
        items = new HashMap<>();
    }


    @Override
    public void add(Long productId, Product product , int soluong) {
        if (items.containsKey(productId)){
            if (soluong == items.get(productId).getSoLuong()) {
                Item scitem = items.get(productId);
                scitem.tangSoLuong();
            } else {
                Item scitem = items.get(productId);
                scitem.setSoLuong(soluong + scitem.getSoLuong());
            }
        } else {
            Item newProduct =  new Item(product);
            newProduct.setSoLuong(soluong);
            items.put(productId,newProduct);
        }
    }

    @Override
    public void remove(Long productId) {
        if (items.containsKey(productId)){
            Item scitem = items.get(productId);
            items.remove(productId);
            soluongSanPham = soluongSanPham - scitem.getSoLuong();
            System.out.println("Đã xóa "+ scitem.getProduct().getName());
        }
    }

    @Override
    public  void decreament(Long productId) {
        if (items.containsKey(productId)) {
            Item scitem =  items.get(productId);
            scitem.giamSoLuong();

            if (scitem.getSoLuong() <= 0) {
                items.remove(productId);
            }
            soluongSanPham--;
        }
    }

    @Override
    public List<Item> getItems() {
        List<Item> results = new ArrayList<Item>();
        results.addAll(this.items.values());
        return results;
    }

    @Override
    public int getNumberOfItems() {
        soluongSanPham = 0;
        Iterator<Item> i = getItems().iterator();
        while (i.hasNext()) {
            Item item = i.next();
            soluongSanPham += item.getSoLuong();
        }

        return soluongSanPham;
    }

    @Override
    public  float getTotal() {
        float amount = 0;

        Iterator<Item> iter = getItems().iterator();
        while (iter.hasNext()) {
            Item scit = iter.next();
            Product b = scit.getProduct();

            if (b.getDiscount() > 0) {
                amount += (b.getPrice() * ((100 - b.getDiscount())/100) * scit.getSoLuong());
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
