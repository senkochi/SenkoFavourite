package com.senko.SenkoFavourite.controller;

import com.senko.SenkoFavourite.dto.RecoverRequestDTO;
import com.senko.SenkoFavourite.dto.UserDTO;
import com.senko.SenkoFavourite.dto.UserInfoDTO;
import com.senko.SenkoFavourite.model.Users;
import com.senko.SenkoFavourite.service.UserService;
import jakarta.persistence.PostUpdate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<?> getCurrentUser(){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        UserDTO user = userService.getUserByUsername(username);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/avatar")
    public ResponseEntity<?> updateAvatar(@RequestBody String imgURL){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        try{
            return ResponseEntity.ok(userService.updateAvatar(username, imgURL));
        } catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/info-update")
    public ResponseEntity<?> updateInfo(@RequestBody UserInfoDTO dto){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        try{
            return ResponseEntity.ok(userService.updatePersonalInfo(username, dto));
        } catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody RecoverRequestDTO dto){
        try{
            return ResponseEntity.ok(userService.resetPassword(dto.getEmail(), dto.getPassword(), dto.getVerificationCode()));
        } catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }
}
