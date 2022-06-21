package com.example.TestLogin.Model.ShoppingCart;

import com.example.TestLogin.Model.ProductManage.Product;
import com.example.TestLogin.Model.UserModel.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Date;
import java.util.Set;

@Entity
@Table(name = "cart")

public class ShoppingCart implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cart_id")
    private long id;

    @OneToOne(fetch=FetchType.LAZY)
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    private User user;

    private Date date;
    private String address;

    @OneToMany(mappedBy = "cart", cascade = {CascadeType.ALL})
    @JsonManagedReference
    private Set<Items> listItems;


}
