package com.example.TestLogin.Repository;

import com.example.TestLogin.Model.UserModel.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findByUsername(String username);

    boolean existsByUsername(String username);

    Boolean existsByEmail(String email);
}
