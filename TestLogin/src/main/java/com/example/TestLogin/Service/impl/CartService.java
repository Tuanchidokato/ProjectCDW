package com.example.TestLogin.Service.impl;

import com.example.TestLogin.Model.ProductManage.Product;
import com.example.TestLogin.Model.ShoppingCart.Items;
import com.example.TestLogin.Model.ShoppingCart.ItemsID;
import com.example.TestLogin.Model.ShoppingCart.ShoppingCart;
import com.example.TestLogin.Model.UserModel.User;
import com.example.TestLogin.Repository.ProductRepository;
import com.example.TestLogin.Repository.ShoppingCartRepository;
import com.example.TestLogin.Repository.UserRepository;
import com.example.TestLogin.Security.Service.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
public class CartService {

    @Autowired
    private ShoppingCartRepository shoppingCartRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private Cart_Handling cartHandling;

    @Autowired
    private ItemsService itemsService;


    @Autowired
    HttpSession session;

    public List<ShoppingCart> getAllCart() { return shoppingCartRepository.findAll(); }
    public void saveCart(ShoppingCart shoppingCart) {
        shoppingCartRepository.save(shoppingCart);
    }

    public ResponseEntity<?> addProduct(Long id , int quantity) {
        Product product = productRepository.findById(id).orElseThrow(() -> new RuntimeException("not found"));
        cartHandling = (Cart_Handling) session.getAttribute("giohang");
        if (cartHandling == null) {
            cartHandling = new Cart_Handling();
        }
        cartHandling.add(id , product , quantity);
        session.setAttribute("giohang" , cartHandling);
        return new ResponseEntity<>(cartHandling , HttpStatus.OK);
    }

    public Cart_Handling getAllItems() {
        Cart_Handling c = (Cart_Handling) session.getAttribute("giohang");
        return c;
    }

    public void handlingCart(UserDetailsImpl userDetail ,  String address ,  String typePayment) {
        System.out.println(userDetail.getId());
        Cart_Handling c = (Cart_Handling) session.getAttribute("giohang");
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
        saveCart(shoppingCart);

        for (Item_Handling itemHandling : c.getItems()) {
            ItemsID itemsID = new ItemsID(shoppingCart , itemHandling.getProduct());
            Items items = new Items(itemsID , itemHandling.getSoLuong());
            Product product = itemHandling.getProduct();
            int check_Quantiy = product.getQuantity() - itemHandling.getSoLuong();
            if (check_Quantiy > 0) {
                product.setQuantity(check_Quantiy);
            } else {
                product.setQuantity(0);
                product.setAvailable(false);
            }
            itemsService.saveItems(items);
            productRepository.save(product);
        }

        session.invalidate();
    }

    public void clearCart() {
        cartHandling = (Cart_Handling) session.getAttribute("giohang");
        cartHandling.clear();
    }

    public void removeItem(Long pro_id) {
        Long id = Long.valueOf(pro_id);
        cartHandling = (Cart_Handling) session.getAttribute("giohang");
        cartHandling.remove(id);
    }

    public void decreaseQuantity( Long pro_id) {
        Long id = Long.valueOf(pro_id);
        cartHandling = (Cart_Handling) session.getAttribute("giohang");
        cartHandling.decreament(id);
    }


    public void increaseQuantity( Long pro_id) {
        Long id = Long.valueOf(pro_id);
        cartHandling = (Cart_Handling) session.getAttribute("giohang");
        Product product = productRepository.findById(id).orElseThrow(() -> new RuntimeException("not found"));
        cartHandling.add(id  , product , 1);
    }


    public Boolean editCart(Long id , Boolean check) {
        ShoppingCart shoppingCart = shoppingCartRepository.findById(id).orElseThrow(() -> new RuntimeException("not found"));
        shoppingCart.setPayStatus(check);
        shoppingCartRepository.save(shoppingCart);
        return true;
    }


}
