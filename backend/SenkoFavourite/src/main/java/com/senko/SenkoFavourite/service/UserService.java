package com.senko.SenkoFavourite.service;

import com.senko.SenkoFavourite.dto.UserDTO;
import com.senko.SenkoFavourite.dto.UserInfoDTO;
import com.senko.SenkoFavourite.model.Address;
import com.senko.SenkoFavourite.model.Users;
import com.senko.SenkoFavourite.model.VerificationCode;
import com.senko.SenkoFavourite.repository.UserRepository;
import com.senko.SenkoFavourite.repository.VerificationCodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository repo;

    @Autowired
    private BCryptPasswordEncoder encoder;

    @Autowired
    private VerificationCodeRepository verificationCodeRepository;

    public boolean isEmailExist(String email){
        Optional<Users> user = repo.findByEmail(email);
        return !user.isEmpty();
    }

    public UserDTO getUserByUsername(String username){
        Users user = repo.findByUsername(username);
        Address address = user.getAddress();
        return UserDTO.builder()
                .username(user.getUsername())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .phoneNum(user.getPhoneNum())
                .imgURL(user.getImgURL())
                .province(address != null ? address.getProvince() : null)
                .district(address != null ? address.getDistrict() : null)
                .ward(address != null ? address.getWard() : null)
                .particular(address != null ? address.getParticular() : null)
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

    public String resetPassword(String email, String password, String verificationCode){
        Users user = repo.findByEmail(email).orElse(null);
        VerificationCode code = verificationCodeRepository.findByEmail(email).orElse(null);
        if(code == null || !code.getCode().equals(verificationCode)){
            return "Can't change your password. Please try again!";
        }
        String newPassword = encoder.encode(password);
        user.setPassword(newPassword);
        repo.save(user);
        return "Password changes successfully!";
    }
}
