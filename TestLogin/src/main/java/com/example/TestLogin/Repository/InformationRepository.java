package com.example.TestLogin.Repository;

import com.example.TestLogin.Model.UserModel.InformationUser;
import com.example.TestLogin.Model.UserModel.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface InformationRepository extends JpaRepository<InformationUser, Long> {
    Optional<InformationUser> findByUser(User user);
}
