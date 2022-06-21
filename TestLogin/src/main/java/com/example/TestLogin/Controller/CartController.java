package com.example.TestLogin.Controller;

import com.example.TestLogin.Model.ProductManage.Product;
import com.example.TestLogin.Model.ShoppingCart.Items;
import com.example.TestLogin.Model.ShoppingCart.ShoppingCart;
import com.example.TestLogin.Model.UserModel.User;
import com.example.TestLogin.Repository.ItemsRepository;
import com.example.TestLogin.Repository.ProductRepository;
import com.example.TestLogin.Repository.ShoppingCartRepository;
import com.example.TestLogin.Repository.UserRepository;
import com.example.TestLogin.Security.Service.UserDetailsImpl;
import com.example.TestLogin.Service.Cart;
import com.example.TestLogin.Service.Item;
import org.apache.tomcat.util.json.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.*;

@CrossOrigin(origins = {"http://localhost:3000"}, maxAge = 3600 ,  allowedHeaders = "*", allowCredentials = "true" )
@RestController
@RequestMapping("/api/auth/cart")
public class CartController {

    @Autowired
    private Cart cart;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ShoppingCartRepository shoppingCartRepository;

    @Autowired
    private ItemsRepository itemsRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/addProduct/{id}")
    ResponseEntity<?> addProdcut( @PathVariable Long id , HttpSession session)  {
        Product product = productRepository.findById(id).orElseThrow(() -> new RuntimeException("not found"));
        cart = (Cart) session.getAttribute("giohang");
        if (cart == null) {
            cart = new Cart();
        }
        cart.add(id , product);
        session.setAttribute("giohang" , cart);
        return new ResponseEntity<>((Cart) session.getAttribute("giohang"), HttpStatus.OK);
    }

    @GetMapping("/itemList")
    ResponseEntity<?> getAllItem(HttpSession session) {
        Cart c = (Cart) session.getAttribute("giohang");
        return new ResponseEntity<>(c, HttpStatus.OK);
    }

    @PostMapping("/handleCart")
    void handlingCart(HttpSession session , @RequestBody UserDetailsImpl userDetail) {
        System.out.println(userDetail.getId());
        Cart c = (Cart) session.getAttribute("giohang");
        User user = userRepository.findById(userDetail.getId()).orElseThrow(() -> new RuntimeException("not found"));
        Date date = new Date(System.currentTimeMillis());
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        ShoppingCart shoppingCart = new ShoppingCart(user , cal ,"");
        List<Item> itemList = c.getItems();
        Set<Items> itemsSet = new HashSet<>();
        for (Item item: itemList) {
            Items items = new Items(item.getProduct() , item.getSoLuong(), shoppingCart);
            Product product = productRepository.findById(item.getProduct().getId()).orElseThrow(() -> new RuntimeException("not found"));
            int check_Quantiy = product.getQuantity() - item.getSoLuong();
            if (check_Quantiy > 0) {
                product.setQuantity(check_Quantiy);
            } else {
                product.setQuantity(check_Quantiy);
                product.setAvailable(false);
            }
            itemsSet.add(items);
//            itemsRepository.save(items);
            productRepository.save(product);
        }
        shoppingCart.setListItems(itemsSet);
        shoppingCartRepository.save(shoppingCart);
    }

    @GetMapping("/decrease/{id}")
    ResponseEntity<?> decreaseQuantity(@PathVariable Long id , HttpSession session) {
        cart = (Cart) session.getAttribute("giohang");
        cart.decreament(id);
        return new ResponseEntity<>(cart.getItems() , HttpStatus.OK);
    }




}
