package com.senko.SenkoFavourite.service;

import com.senko.SenkoFavourite.dto.LoginRequestDTO;
import com.senko.SenkoFavourite.model.Users;
import com.senko.SenkoFavourite.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository repo;

    @Autowired
    private AuthenticationManager manager;

    @Autowired
    private JwtService jwtService;





//    public Users register(Users user){
//        user.setPassword(encoder.encode(user.getPassword()));
//        return repo.save(user);
//    }
//
    public String verify(LoginRequestDTO loginRequest) {
        Authentication authentication =
                manager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        if(authentication.isAuthenticated())
            return jwtService.generateToken(loginRequest.getUsername());

        return "fail";

    }
}
