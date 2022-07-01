package com.example.TestLogin.Model.ProductManage;

import com.example.TestLogin.Model.ShoppingCart.Items;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Calendar;
import java.util.Set;

@Data
@Entity
@Table(name = "product", uniqueConstraints = {
        @UniqueConstraint(
                columnNames = "name"
        )
})
public class Product implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String image;

    private String author;

    private String nxb;
    private float price;

    private float discount;
    private String description;

    @Temporal(TemporalType.DATE)
    @JsonFormat(pattern = "dd-MM-yyyy")
    private Calendar date;
    private int quantity;
    private boolean available;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "categories_id")
    private Categories categories;


    public Product() {
    }

    public Product(String name, String image, String author, String nxb, float price, float discount, String description, Calendar date, int quantity, boolean available, Categories categories) {
        this.name = name;
        this.image = image;
        this.author = author;
        this.nxb = nxb;
        this.price = price;
        this.discount = discount;
        this.description = description;
        this.date = date;
        this.quantity = quantity;
        this.available = available;
        this.categories = categories;
    }

    @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", image='" + image + '\'' +
                ", author='" + author + '\'' +
                ", nxb='" + nxb + '\'' +
                ", price=" + price +
                ", discount=" + discount +
                ", description='" + description + '\'' +
                ", date=" + date +
                ", quantity=" + quantity +
                ", available=" + available +
                ", categories=" + categories +
                '}';
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

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getNxb() {
        return nxb;
    }

    public void setNxb(String nxb) {
        this.nxb = nxb;
    }

    public float getDiscount() {
        return discount;
    }

    public void setDiscount(float discount) {
        this.discount = discount;
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

    public Calendar getDate() {
        return date;
    }

    public void setDate(Calendar date) {
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
