package com.example.TestLogin.Model.ProductManage;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.io.Serializable;

@Entity
@Table(name = "categories",
            uniqueConstraints ={
                @UniqueConstraint(columnNames = "name")
            }
        )

public class Categories implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long category_id;

    @NotBlank
    @Size(max = 100)
    private String name;


    public Categories() {
    }

    public Categories(String name) {
        this.name = name;
    }

    public Long getCategory_id() {
        return category_id;
    }

    public void setCategory_id(Long category_id) {
        this.category_id = category_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Categories{" +
                "category_id=" + category_id +
                ", name='" + name + '\'' +
                '}';
    }
}
