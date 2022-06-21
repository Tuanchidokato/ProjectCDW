package com.example.TestLogin.Model.ShoppingCart;

import com.example.TestLogin.Model.ProductManage.Product;
import com.example.TestLogin.Model.UserModel.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Date;
import java.util.Calendar;
import java.util.Set;

@Entity
@Table(name = "cart")

public class ShoppingCart implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cart_id")
    private long id;

    @OneToOne(fetch=FetchType.LAZY)
    @JoinColumn(name = "user_id", updatable = false)
    private User user;

    @Temporal(TemporalType.DATE)
    @JsonFormat(pattern = "dd-MM-yyyy")
    private Calendar date;

    private String address;

    @OneToMany(mappedBy = "cart", cascade = {CascadeType.MERGE})
    @JsonManagedReference
    private Set<Items> listItems;

    public ShoppingCart(User user, Calendar date, String address) {
        this.user = user;
        this.date = date;
        this.address = address;
    }

    public ShoppingCart() {

    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Calendar getDate() {
        return date;
    }

    public void setDate(Calendar date) {
        this.date = date;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Set<Items> getListItems() {
        return listItems;
    }

    public void setListItems(Set<Items> listItems) {
        this.listItems = listItems;
    }
}
