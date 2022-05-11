package com.example.TestLogin.Repository;

import com.example.TestLogin.Model.UserModel.ERole;
import com.example.TestLogin.Model.UserModel.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role,Long> {
    Optional<Role> findByName (ERole name);
}
