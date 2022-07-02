package com.example.TestLogin.Model.ShoppingCart;

import com.example.TestLogin.Model.ProductManage.Product;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "items")
public class Items  implements Serializable {

    @EmbeddedId
    private ItemsID id;

    private int quantityItem;

    public Items(ItemsID id , int quantityItem) {
        this.id = id;
        this.quantityItem = quantityItem;
    }

    public Items() {

    }

    public int getQuantityItem() {
        return quantityItem;
    }

    public void setQuantityItem(int quantityItem) {
        this.quantityItem = quantityItem;
    }

    public ItemsID getId() {
        return id;
    }

    public void setId(ItemsID id) {
        this.id = id;
    }
}
