//package com.example.TestLogin.Database;
//
//import com.example.TestLogin.Model.ProductManage.Categories;
//import com.example.TestLogin.Model.ProductManage.Product;
//import com.example.TestLogin.Model.UserModel.InformationUser;
//import com.example.TestLogin.Model.UserModel.User;
//import com.example.TestLogin.Repository.CategoriesRepository;
//import com.example.TestLogin.Repository.InformationRepository;
//import com.example.TestLogin.Repository.ProductRepository;
//import com.example.TestLogin.Repository.UserRepository;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//import java.text.SimpleDateFormat;
//import java.util.Calendar;
//import java.util.Date;
//import java.util.Optional;
//
//@Configuration
//public class Database {
//
//    private static final Logger logger = LoggerFactory.getLogger(Database.class);
//    @Autowired
//    UserRepository userRepository;
//
//    @Autowired
//    ProductRepository productRepository;
//
//    @Autowired
//    CategoriesRepository categoriesRepository;
//
//    @Bean
//    CommandLineRunner innitDatabase(InformationRepository informationRepository) {
//        return new CommandLineRunner() {
//            @Override
//            public void run(String... args) throws Exception {
//                Categories categories = new Categories("Detective");
//                Categories categories2 = new Categories("Novel");
//                Categories categories3 = new Categories("Science fiction");
//
////                categoriesRepository.save(categories);
////                categoriesRepository.save(categories2);
////                categoriesRepository.save(categories3);
//
//                Calendar d1 = Calendar.getInstance();
//                d1.set(2022,11,21);
//
//                Calendar d2 = Calendar.getInstance();
//                d2.set(2022,6,12);
//
//
//                Product product = new Product("ShenLock Home", "image 2.png", "Conan Doyle", "HighBridge Company", 80000, 50, "1894. The monstrous Hound of the Baskervilles has been dead for five years, along with its no less monstrous owner, the naturalist Jack Stapleton. Sir Henry Baskerville is living contentedly at Baskerville Hall with his new wife Audrey and their three-year-old son Harry.", d1, 10, true, categories);
//                Product product2 = new Product("Dune", "image 3.png", "Frank Herbert ", "Macmillan Audio", 1000000, 0, "Dune, Frank Herbert’s epic science-fiction masterpiece set in the far future amidst a sprawling feudal interstellar society, tells the story of Paul Atreides as he and his family accept control of the desert planet Arrakis. A stunning blend of adventure and mysticism, environmentalism, and politics, Dune is a powerful, fantastical tale that takes an unprecedented look into our universe, and is transformed by the graphic novel format. Brian Herbert and Kevin J. Anderson’s adaptation retains the integrity of the original novel, and Raúl Allén and Patricia Martín’s magnificent illustrations, along with cover art by Bill Sienkiewicz, bring the book to life for a new generation of readers.", d2 , 10, true, categories3);
//
//                productRepository.save(product);
//                productRepository.save(product2);
//
//
////                 Categories categories = categoriesRepository.findById(9l).orElseThrow(
////                         ()-> new RuntimeException("not found")
////                 );
////                  Categories categories3 = new Categories("History");
////                  Product product2 = new Product("It","It",2000000,new Date(2022,2,2),10,true,categories);
//
//
////                User user = new User("Phuong","Phuwong@gmail.com","27012003");
////
////                User user2 = userRepository.findById(2l).orElseThrow(
////                        ()-> new RuntimeException("not found")
////                );
////                InformationUser informationUser3 = new InformationUser(user2,"Phương","Phạm Phương","Đội 1 Hướng Phương",9827349823l);
////                logger.info("insert data : "+informationRepository.save(informationUser3));
////                 logger.info("insert data : "+user1.getId());
//            }
//        };
//    }
//}
