//package com.example.TestLogin.Database;
//
//import com.example.TestLogin.Model.ProductManage.Categories;
//import com.example.TestLogin.Model.ProductManage.Product;
//import com.example.TestLogin.Repository.CategoriesRepository;
//import com.example.TestLogin.Repository.ProductRepository;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//import java.util.Date;
//
//@Configuration
//public class Database {
//
//    private static final Logger logger = LoggerFactory.getLogger(Database.class);
//    @Bean
//    CommandLineRunner innitDatabase(ProductRepository productRepository){
//        return new CommandLineRunner() {
//            @Override
//            public void run(String... args) throws Exception {
//                Categories categories = new Categories("Detective");
//                Categories categories2 = new Categories("Novel");
//                Categories categories3 = new Categories("Science fiction books");
//
//                Product product = new Product("ShenLock Home","hinh ha",80000,new Date(2022,2,2),10,true,categories2);
//                Product product2 = new Product("Dune","haoua",1000000,new Date(2022,2,2),10,true,categories3);
//
//                logger.info("insert data : "+productRepository.save(product2));
//
//            }
//        };
//    }
//}
