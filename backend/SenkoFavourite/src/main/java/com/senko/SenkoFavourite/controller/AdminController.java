package com.senko.SenkoFavourite.controller;

import com.senko.SenkoFavourite.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    @Autowired
    private AdminService adminService;

    @GetMapping("/statistics")
    public ResponseEntity<?> getStatistics(){
        return ResponseEntity.ok(adminService.getStatistics());
    }
}
