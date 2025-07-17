package com.senko.SenkoFavourite.service;

import com.senko.SenkoFavourite.dto.AddressDTO;
import com.senko.SenkoFavourite.model.Address;
import com.senko.SenkoFavourite.model.Users;
import com.senko.SenkoFavourite.repository.AddressRepository;
import com.senko.SenkoFavourite.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AddressService {
    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private UserRepository userRepository;

    public AddressDTO getAddressByUsername(String username){
        Users user = userRepository.findByUsername(username);
        Address address = addressRepository.findByUser(user).orElse(null);

        if(address == null){
            return null;
        }

        return AddressDTO.builder()
                .particular(address.getParticular())
                .ward(address.getWard())
                .district(address.getDistrict())
                .province(address.getProvince())
                .build();
    }
}
