package com.example.TestLogin.Model.ShoppingCart;

import com.example.TestLogin.Model.ProductManage.Product;
import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "items")
public class Items  implements Serializable{


    @Id
    @Column(name = "product_id")
    private Long id;


    @OneToOne
    @MapsId
    @PrimaryKeyJoinColumn(name = "product_id" )
    private Product product;

    private int quantityItem;

    @ManyToOne(cascade = {CascadeType.MERGE})
    @JoinColumn(name = "cart_id",nullable = false,referencedColumnName = "cart_id")
    @JsonBackReference
    private ShoppingCart cart;

    public Items(Product product, int quantityItem, ShoppingCart cart) {
        this.product = product;
        this.quantityItem = quantityItem;
        this.cart = cart;
    }

    public Items() {

    }

    public Product getProduct() {
        return product;
    }

    public int getQuantityItem() {
        return quantityItem;
    }

    public ShoppingCart getCart() {
        return cart;
    }
}
