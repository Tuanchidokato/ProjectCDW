package com.example.TestLogin.Controller;

import com.example.TestLogin.Model.ShoppingCart.ShoppingCart;
import com.example.TestLogin.Security.Service.UserDetailsImpl;
import com.example.TestLogin.Service.impl.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = {"http://localhost:3000"}, maxAge = 3600, allowedHeaders = "*", allowCredentials = "true")
@RestController
@RequestMapping("/api/auth/cart")
public class CartController {
    @Autowired
    private CartService cartService;

    @Autowired
    private ItemsService itemsService;

    @GetMapping("/addProduct/{id}")
    ResponseEntity<?> addProdcut(@PathVariable Long id, @RequestParam int quantity) {
        return new ResponseEntity<>(cartService.addProduct(id, quantity), HttpStatus.OK);
    }

    @GetMapping("/itemList")
    ResponseEntity<?> getAllItem() {
        return new ResponseEntity<>(cartService.getAllItems(), HttpStatus.OK);
    }

    @PostMapping("/handleCart")
    void handlingCart(@RequestBody UserDetailsImpl userDetail, @RequestParam String address, @RequestParam String typePayment) {
        cartService.handlingCart(userDetail, address, typePayment);
    }

    @GetMapping("/decrease")
    void decreaseQuantity(@RequestParam(name = "id") Long pro_id) {
        cartService.decreaseQuantity(pro_id);
    }

    @GetMapping("/increase")
    void increaseQuantity(@RequestParam(name = "id") Long pro_id) {
        cartService.increaseQuantity(pro_id);
    }

    @DeleteMapping("/remove")
    void removeItem(@RequestParam(name = "id") Long pro_id) {
        cartService.removeItem(pro_id);
    }

    @DeleteMapping("/clear")
    void clearCart() {
        cartService.clearCart();
    }

    @GetMapping("/CartContents/{id}")
    ResponseEntity<?> getCartContents(@PathVariable Long id) {
        return new ResponseEntity<>(itemsService.getCartContents(id), HttpStatus.OK);
    }

    @GetMapping("/ListCarts")
    ResponseEntity<?> getAllCart() {
        List<ShoppingCart> result = cartService.getAllCart();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PutMapping("/editCart/{id}")
    Boolean editCart(@PathVariable Long id, @RequestParam Boolean check) {
        return cartService.editCart(id, check);
    }


}
