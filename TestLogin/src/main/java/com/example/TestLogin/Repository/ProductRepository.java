package com.example.TestLogin.Repository;

import com.example.TestLogin.Model.ProductManage.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query(value = "SELECT * FROM testlogin.product p  inner join (SELECT product_id , SUM(quantity_item) as sumofQuantity FROM testlogin.items i group by " +
            "product_id HAVING SUM(quantity_item) >= 2 ) tmep on tmep.product_id = p.id ORDER BY tmep.sumofQuantity DESC LIMIT 4;\n ", nativeQuery = true)
    List<Product> getItemsPopular();

    @Query("FROM Product p WHERE p.name LIKE %:searchText% OR p.author LIKE %:searchText%")
    Page<Product> searchProductByName(Pageable pageable, @Param("searchText") String searchText);
}
