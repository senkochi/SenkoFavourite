package com.senko.SenkoFavourite.service;

import com.senko.SenkoFavourite.dto.LoginRequestDTO;
import com.senko.SenkoFavourite.dto.RegisterRequestDTO;
import com.senko.SenkoFavourite.model.Users;
import com.senko.SenkoFavourite.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AuthService {
    @Autowired
    private UserRepository repo;

    @Autowired
    private AuthenticationManager manager;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private BCryptPasswordEncoder encoder;



    public Users register(RegisterRequestDTO registerRequest){
        registerRequest.setPassword(encoder.encode(registerRequest.getPassword()));
        if(registerRequest.getEmail() == null || registerRequest.getEmail().isEmpty()){

        }
        Users user = Users.builder()
                .username(registerRequest.getUsername())
                .password(registerRequest.getPassword())
                .email(registerRequest.getEmail())
                .createAt(LocalDateTime.now())
                .role("user")
                .build();
        return repo.save(user);
    }

    public String verify(LoginRequestDTO loginRequest) {
        Authentication authentication =
                manager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        if(authentication.isAuthenticated())
            return jwtService.generateToken(loginRequest.getUsername());

        return "fail";

    }
}
