package com.example.TestLogin.Model.ShoppingCart;

import com.example.TestLogin.Model.ProductManage.Product;

import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.io.Serializable;

@Embeddable
public class ItemsID implements Serializable {

    @ManyToOne
    @JoinColumn(name = "cart_id", nullable = false, referencedColumnName = "cart_id")
    private ShoppingCart cart;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false, referencedColumnName = "id")
    private Product product;

    public ItemsID(ShoppingCart cart, Product product) {
        this.cart = cart;
        this.product = product;
    }

    public ItemsID() {

    }

    public ShoppingCart getCart() {
        return cart;
    }

    public void setCart(ShoppingCart cart) {
        this.cart = cart;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
}
