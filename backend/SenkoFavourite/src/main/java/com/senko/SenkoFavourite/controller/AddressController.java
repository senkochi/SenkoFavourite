package com.senko.SenkoFavourite.controller;

import com.senko.SenkoFavourite.dto.AddressDTO;
import com.senko.SenkoFavourite.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/address")
public class AddressController {
    @Autowired
    private AddressService addressService;

    @GetMapping
    public ResponseEntity<?> getAddressByUsername(){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        AddressDTO dto = addressService.getAddressByUsername(username);
        return ResponseEntity.ok(dto);
    }
}
