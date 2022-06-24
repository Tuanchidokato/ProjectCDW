package com.example.TestLogin.Controller;

import com.example.TestLogin.Model.ResponseObject.ResponseObject;
import com.example.TestLogin.Model.UserModel.InformationUser;
import com.example.TestLogin.Model.UserModel.User;
import com.example.TestLogin.Repository.InformationRepository;
import com.example.TestLogin.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 300)
@RestController
@RequestMapping("/api/auth/")
public class InformationUserController {
    @Autowired
    InformationRepository informationRepository;

    @Autowired
    UserRepository userRepository;

    @GetMapping("getInfo/{id}")
    ResponseEntity<?> getInfo(@PathVariable Long id) {
        User user = userRepository.findById(id).orElseThrow(
                () -> new RuntimeException("not found")
        );
        Optional<InformationUser> informationUser = informationRepository.findByUser(user);
        if (informationUser.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("ok", "Find product successfully", informationUser)
            );
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("error", "not found", "")
            );
        }
    }


    @PostMapping("/edit/{id}")
    ResponseEntity<?> editInfo(@PathVariable Long id, @RequestBody InformationUser editInformationUser) {
        User user = userRepository.findById(id).orElseThrow(
                () -> new RuntimeException("not found")
        );
        InformationUser informationUser = informationRepository.findByUser(user).orElseThrow(
                () -> new RuntimeException("Not found")
        );
        if (informationUser != null) {
            informationUser.setPhoneNumber(editInformationUser.getPhoneNumber());
            informationUser.setAddress(editInformationUser.getAddress());
            informationUser.setFirstName(editInformationUser.getFirstName());
            informationUser.setLastName(editInformationUser.getLastName());
            informationRepository.save(informationUser);
            System.out.println("Edit information successfully");
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("ok", "Edit information successfully", informationUser)
            );
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("error", "Not Update", "")
            );
        }
    }
}
