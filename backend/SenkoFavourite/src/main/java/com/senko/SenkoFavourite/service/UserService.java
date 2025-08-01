package com.senko.SenkoFavourite.service;

import com.senko.SenkoFavourite.dto.UserDTO;
import com.senko.SenkoFavourite.dto.UserInfoDTO;
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
                .imgURL(user.getImgURL())
                .province(user.getAddress().getProvince())
                .district(user.getAddress().getDistrict())
                .ward(user.getAddress().getWard())
                .particular(user.getAddress().getParticular())
                .build();
    }

    public String updateAvatar(String username, String imgURL){
        Users user = repo.findByUsername(username);
        user.setImgURL(imgURL);
        repo.save(user);
        return "Avatar changed successfully!";
    }

    public String updatePersonalInfo(String username, UserInfoDTO dto){
        Users user = repo.findByUsername(username);
        user.setFullName(dto.getFullName());
        user.setPhoneNum(dto.getPhoneNum());
        user.getAddress().setProvince(dto.getProvince());
        user.getAddress().setDistrict(dto.getDistrict());
        user.getAddress().setWard(dto.getWard());
        user.getAddress().setParticular(dto.getParticular());
        repo.save(user);
        return "Information updated successfully!";
    }
}
