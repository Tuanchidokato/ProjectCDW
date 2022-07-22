package com.example.TestLogin.Repository;

import com.example.TestLogin.Model.ProductManage.Product;
import com.example.TestLogin.Model.ShoppingCart.Items;
import com.example.TestLogin.Model.ShoppingCart.ItemsID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ItemsRepository extends JpaRepository<Items, ItemsID> {

}
