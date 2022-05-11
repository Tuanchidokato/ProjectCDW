//package com.example.TestLogin.Model.ProductManage;
//
//import com.example.TestLogin.Model.ShoppingCart.ShoppingCart;
//
//import javax.persistence.*;
//import java.io.Serializable;
//
//@Entity
//@Table(name = "orderDetail")
//public class OrderDetail implements Serializable {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private long id;
//
//    @Id
//    @ManyToOne(fetch=FetchType.LAZY)
//    @JoinColumn(name = "order_id")
//    private ShoppingCart orderID;
//
//    @Id
//    @ManyToOne(fetch=FetchType.LAZY)
//    @JoinColumn (columnDefinition = "product_id")
//    private Product productID;
//    private float price;
//    private int quantity;
//
//}
