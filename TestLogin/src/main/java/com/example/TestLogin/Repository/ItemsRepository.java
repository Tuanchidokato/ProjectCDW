package com.example.TestLogin.Repository;

import com.example.TestLogin.Model.ShoppingCart.Items;
import com.example.TestLogin.Model.ShoppingCart.ItemsID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemsRepository extends JpaRepository<Items , ItemsID> {
}
