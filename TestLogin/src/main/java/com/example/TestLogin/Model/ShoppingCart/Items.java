package com.example.TestLogin.Model.ShoppingCart;

import com.example.TestLogin.Model.ProductManage.Product;
import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "items")
public class Items  implements Serializable{

    @Id
    @OneToOne()
    @JoinColumn(name = "product_id")
    private Product product;

    private int quantityItem;

    @ManyToOne(cascade = {CascadeType.ALL})
    @JoinColumn(name = "cart_id",nullable = false,referencedColumnName = "cart_id")
    @JsonBackReference
    private ShoppingCart cart;
}
