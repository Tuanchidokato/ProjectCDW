package com.example.TestLogin.Database;

import com.example.TestLogin.Model.ProductManage.Categories;
import com.example.TestLogin.Model.ProductManage.Product;
import com.example.TestLogin.Model.UserModel.InformationUser;
import com.example.TestLogin.Model.UserModel.User;
import com.example.TestLogin.Repository.CategoriesRepository;
import com.example.TestLogin.Repository.InformationRepository;
import com.example.TestLogin.Repository.ProductRepository;
import com.example.TestLogin.Repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Date;
import java.util.Optional;

@Configuration
public class Database {

    private static final Logger logger = LoggerFactory.getLogger(Database.class);
    @Autowired
    UserRepository userRepository;

    @Autowired
    CategoriesRepository categoriesRepository;
    @Bean
    CommandLineRunner innitDatabase(InformationRepository informationRepository){
        return new CommandLineRunner() {
            @Override
            public void run(String... args) throws Exception {
//                Categories categories = new Categories("Detective");
//                Categories categories2 = new Categories("Novel");
//                Categories categories3 = new Categories("Science fiction books");
//
//                Product product = new Product("ShenLock Home","hinh ha",80000,new Date(2022,2,2),10,true,categories2);
//                Product product2 = new Product("Dune","haoua",1000000,new Date(2022,2,2),10,true,categories3);

//                 Categories categories = categoriesRepository.findById(9l).orElseThrow(
//                         ()-> new RuntimeException("not found")
//                 );
//                  Categories categories3 = new Categories("History");
//                  Product product2 = new Product("It","It",2000000,new Date(2022,2,2),10,true,categories);


//                User user = new User("Phuong","Phuwong@gmail.com","27012003");
//
//                User user2 = userRepository.findById(2l).orElseThrow(
//                        ()-> new RuntimeException("not found")
//                );
//                InformationUser informationUser3 = new InformationUser(user2,"Phương","Phạm Phương","Đội 1 Hướng Phương",9827349823l);
//                logger.info("insert data : "+informationRepository.save(informationUser3));
               // logger.info("insert data : "+user1.getId());
            }
        };
    }
}
