package com.senko.SenkoFavourite.service;

import com.senko.SenkoFavourite.dto.UserDTO;
import com.senko.SenkoFavourite.model.Users;
import com.senko.SenkoFavourite.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository repo;

    public boolean isEmailExist(String email){
        Optional<Users> user = repo.findByEmail(email);
        return !user.isEmpty();
    }

    public UserDTO getUserByUsername(String username){
        Users user = repo.findByUsername(username);
        return UserDTO.builder()
                .username(user.getUsername())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .phoneNum(user.getPhoneNum())
                .build();
    }
}
