package com.example.TestLogin.ModelDTO.ProductMange;

import java.util.Calendar;

public class ProductDTO {

    private String name;
    private String image;
    private String author;
    private String nxb;
    private float price;
    private float discount;
    private String description;
    private String date;
    private int quantity;
    private boolean available;
    private int category;



    public ProductDTO(String name, String image, String author, String nxb, float price, float discount, String description, String date, int quantity, boolean available, int category) {
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
        this.category = category;
    }



    public String getName() {
        return name;
    }

    public String getImage() {
        return image;
    }

    public String getAuthor() {
        return author;
    }

    public String getNxb() {
        return nxb;
    }

    public float getPrice() {
        return price;
    }

    public float getDiscount() {
        return discount;
    }

    public String getDescription() {
        return description;
    }

    public String getDate() {
        return date;
    }

    public int getQuantity() {
        return quantity;
    }

    public boolean isAvailable() {
        return available;
    }

    public int getCategory() {
        return category;
    }


}
