package com.example.TestLogin.Controller;


import com.example.TestLogin.Model.UserModel.ERole;
import com.example.TestLogin.Model.UserModel.Role;
import com.example.TestLogin.Model.UserModel.User;
import com.example.TestLogin.Payload.Request.LoginRequest;
import com.example.TestLogin.Payload.Request.SignupRequest;
import com.example.TestLogin.Payload.Response.JwtResponse;
import com.example.TestLogin.Payload.Response.MessageResponse;
import com.example.TestLogin.Repository.RoleRepository;
import com.example.TestLogin.Repository.UserRepository;
import com.example.TestLogin.Security.Jwt.JwtUtils;
import com.example.TestLogin.Security.Service.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;



    @PostMapping("signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest){

        Authentication authentication =authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(loginRequest.getUsername(),loginRequest.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateTwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(
                new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles));
    }

    @PostMapping("signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signupRequest){
        if(userRepository.existsByUsername(signupRequest.getUsername())){
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("error: Username is already taken!"));

        }
        if (userRepository.existsByEmail(signupRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }
        // create new account
        User user = new User(signupRequest.getUsername(),
                signupRequest.getEmail(),
                encoder.encode(signupRequest.getPassword()));
        Set<String> strRoles = signupRequest.getRole();
        Set<Role> roles=new HashSet<>();
        if(strRoles == null){
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(()->new RuntimeException("Error: role is not found"));
            roles.add(userRole);
        }else{
            strRoles.forEach(role->{
                switch (role){
                    case "admin":
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() ->new RuntimeException("Error: role is not found"));
                        roles.add(adminRole);
                        break;
                    case "mod":
                        Role modRole =roleRepository.findByName(ERole.ROLE_MODERATOR)
                                .orElseThrow(()-> new RuntimeException("Error: role is not found"));

                        roles.add(modRole);
                        break;
                    case "user":
                        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                                .orElseThrow(()-> new RuntimeException("Error:role is not found"));

                        roles.add(userRole);
                }
            });
        }
        user.setRoles(roles);
        userRepository.save(user);
        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));

    }
}
