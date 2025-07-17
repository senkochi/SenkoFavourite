package com.senko.SenkoFavourite.controller;

import com.senko.SenkoFavourite.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmailController {

    @Autowired
    private EmailService emailService;

    @GetMapping("/api/test-email")
    public String testEmail(@RequestParam String email) {
        try {
            emailService.sendVerificationMail(email, "123456");
            return "✅ Email sent successfully to " + email;
        } catch (Exception e) {
            return "❌ Error: " + e.getMessage();
        }
    }
}

// Test bằng cách gọi: http://localhost:8080/test-email?email=your-email@gmail.com
