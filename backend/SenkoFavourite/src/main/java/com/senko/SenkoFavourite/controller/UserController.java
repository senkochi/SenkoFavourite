package com.senko.SenkoFavourite.controller;

import com.senko.SenkoFavourite.dto.LoginRequestDTO;
import com.senko.SenkoFavourite.model.Users;
import com.senko.SenkoFavourite.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class UserController {

    @Autowired
    private UserService service;

//    @PostMapping("/api/register")
//    public Users register(@RequestBody Users user){
//        return service.register(user);
//    }
//
    @PostMapping("/api/login")
    public String login(@RequestBody LoginRequestDTO loginRequest){
        return service.verify(loginRequest);
    }
//
//    @PostMapping("/api/login")
//    public ResponseEntity<?> login(@RequestBody LoginRequestDTO loginRequest) {
//        String token = service.verify(loginRequest);
//        if ("false".equals(token)) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login failed");
//        }
//        Map<String, String> response = new HashMap<>();
//        response.put("token", token);
//        return ResponseEntity.ok(response);
//    }
}
