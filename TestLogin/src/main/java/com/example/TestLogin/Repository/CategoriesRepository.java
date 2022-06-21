package com.example.TestLogin.Repository;

import com.example.TestLogin.Model.ProductManage.Categories;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoriesRepository extends JpaRepository<Categories, Long> {
    Optional<Categories>  findById(Long id);

}
