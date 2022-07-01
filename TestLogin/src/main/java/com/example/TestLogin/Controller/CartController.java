package com.example.TestLogin.Controller;

import com.example.TestLogin.Model.ProductManage.Product;
import com.example.TestLogin.Model.ShoppingCart.Items;
import com.example.TestLogin.Model.ShoppingCart.ItemsID;
import com.example.TestLogin.Model.ShoppingCart.ShoppingCart;
import com.example.TestLogin.Model.UserModel.User;
import com.example.TestLogin.Repository.ItemsRepository;
import com.example.TestLogin.Repository.ProductRepository;
import com.example.TestLogin.Repository.ShoppingCartRepository;
import com.example.TestLogin.Repository.UserRepository;
import com.example.TestLogin.Security.Service.UserDetailsImpl;
import com.example.TestLogin.Service.Cart;
import com.example.TestLogin.Service.Item;
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

    @Autowired
    HttpSession session;

    @GetMapping("/addProduct/{id}")
    ResponseEntity<?> addProdcut(@PathVariable Long id , @RequestParam int quantity)  {
        Product product = productRepository.findById(id).orElseThrow(() -> new RuntimeException("not found"));
        cart = (Cart) session.getAttribute("giohang");
        if (cart == null) {
            cart = new Cart();
        }
        cart.add(id , product , quantity);
        session.setAttribute("giohang" , cart);
        return new ResponseEntity<>(cart, HttpStatus.OK);
    }

    @GetMapping("/itemList")
    ResponseEntity<?> getAllItem() {
        Cart c = (Cart) session.getAttribute("giohang");
        return new ResponseEntity<>(c, HttpStatus.OK);
    }

    @PostMapping("/handleCart")
    void handlingCart(@RequestBody UserDetailsImpl userDetail , @RequestParam String address , @RequestParam String typePayment) {
        System.out.println(userDetail.getId());
        Cart c = (Cart) session.getAttribute("giohang");
        User user = userRepository.findById(userDetail.getId()).orElseThrow(() -> new RuntimeException("not found"));

        //Set Date cho giỏ hàng
        Date date = new Date(System.currentTimeMillis());
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);

        //Thêm giỏ hàng vào CSDL
        ShoppingCart shoppingCart;
        if (typePayment.equalsIgnoreCase("cash on delivery")) {
            shoppingCart = new ShoppingCart(user , cal ,address , false , typePayment);
        } else {
            shoppingCart = new ShoppingCart(user , cal ,address , true , typePayment);
        }
        shoppingCartRepository.save(shoppingCart);

        for (Item item: c.getItems()) {
            ItemsID itemsID = new ItemsID(shoppingCart ,item.getProduct());
            Items items = new Items(itemsID ,item.getSoLuong());
            Product product = item.getProduct();
            int check_Quantiy = product.getQuantity() - item.getSoLuong();
            if (check_Quantiy > 0) {
                product.setQuantity(check_Quantiy);
            } else {
                product.setQuantity(check_Quantiy);
                product.setAvailable(false);
            }
            itemsRepository.save(items);
            productRepository.save(product);
        }

        session.invalidate();
    }


    
    @GetMapping("/decrease")
    void decreaseQuantity(@RequestParam(name = "id") Long pro_id) {
        Long id = Long.valueOf(pro_id);
        cart = (Cart) session.getAttribute("giohang");
        cart.decreament(id);
    }

    @GetMapping("/increase")
    void increaseQuantity(@RequestParam(name = "id") Long pro_id) {
        Long id = Long.valueOf(pro_id);
        cart = (Cart) session.getAttribute("giohang");
        Product product = productRepository.findById(id).orElseThrow(() -> new RuntimeException("not found"));
        cart.add(id  , product , 1);
    }

    @DeleteMapping("/remove")
    void removeItem(@RequestParam(name = "id") Long pro_id) {
        Long id = Long.valueOf(pro_id);
        cart = (Cart) session.getAttribute("giohang");
        cart.remove(id);
    }

    @DeleteMapping("/clear")
    void clearCart() {
        cart = (Cart) session.getAttribute("giohang");
        cart.clear();
    }

    @GetMapping("/CartContents/{id}")
    ResponseEntity<?> getCartContents(@PathVariable Long id) {
        List<Items> itemsList = itemsRepository.findAll();
        List<Items> result = new ArrayList<>();
        for (Items item: itemsList) {
            if (item.getId().getCart().getId() == id) {
                result.add(item);
            }
        }
        return new ResponseEntity<>(result , HttpStatus.OK);
    }

}
