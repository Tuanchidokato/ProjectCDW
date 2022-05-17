package com.example.TestLogin.Model.ProductManage;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Data
@Entity
@Table(name = "product", uniqueConstraints = {
        @UniqueConstraint(
                columnNames = "name"
        )
})
public class Product  implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String image;
    private float price;
    private String description;
    private Date date;
    private int quantity;
    private boolean available;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "categories_id")
    private Categories categories;


    public Product() {
    }

    public Product(String name, String image, float price, String description, Date date, int quantity, boolean available, Categories categories) {
        this.name = name;
        this.image = image;
        this.price = price;
        this.description = description;
        this.date = date;
        this.quantity = quantity;
        this.available = available;
        this.categories = categories;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public boolean isAvailable() {
        return available;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }

    public Categories getCategories() {
        return categories;
    }

    public void setCategories(Categories categories) {
        this.categories = categories;
    }

}
