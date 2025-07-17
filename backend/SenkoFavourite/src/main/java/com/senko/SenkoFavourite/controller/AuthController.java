package com.senko.SenkoFavourite.controller;

import com.senko.SenkoFavourite.dto.LoginRequestDTO;
import com.senko.SenkoFavourite.dto.RegisterRequestDTO;
import com.senko.SenkoFavourite.dto.SendCodeRequestDTO;
import com.senko.SenkoFavourite.dto.VerifyCodeRequestDTO;
import com.senko.SenkoFavourite.model.Users;
import com.senko.SenkoFavourite.service.AuthService;
import com.senko.SenkoFavourite.service.UserService;
import com.senko.SenkoFavourite.service.VerificationCodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private UserService userService;

    @Autowired
    private VerificationCodeService verificationCodeService;

    @PostMapping("/api/register")
    public Users register(@RequestBody RegisterRequestDTO registerRequest){
        return authService.register(registerRequest);
    }

    @PostMapping("/api/login")
    public String login(@RequestBody LoginRequestDTO loginRequest){
        return authService.verify(loginRequest);
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

    @PostMapping("/api/send-register-code")
    public ResponseEntity<?> sendRegisterCode(@RequestBody SendCodeRequestDTO request){
        try {
            if(!userService.isEmailExist(request.getEmail())){
                verificationCodeService.generateAndSendCode(request.getEmail());
                return ResponseEntity.ok(Map.of("message", "Mã xác nhận đã được gửi đến email của bạn."));
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", "Email already existed."));
            }

        } catch (RuntimeException e) {
            // Bắt lỗi khi gửi email hoặc lỗi khác từ service
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", "Lỗi khi gửi mã xác nhận."));
        }
    }

    @PostMapping("/api/send-recovery-code")
    public ResponseEntity<?> sendRecoveryCode(@RequestBody SendCodeRequestDTO request){
        try {
            if(userService.isEmailExist(request.getEmail())){
                verificationCodeService.generateAndSendCode(request.getEmail());
                return ResponseEntity.ok(Map.of("message", "Mã xác nhận đã được gửi đến email của bạn."));
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", "Email unverified."));
            }

        } catch (RuntimeException e) {
            // Bắt lỗi khi gửi email hoặc lỗi khác từ service
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", "Lỗi khi gửi mã xác nhận."));
        }
    }

    @PostMapping("/api/verify-code")
    public ResponseEntity<?> verifyCode(@RequestBody VerifyCodeRequestDTO request){
        try{
            boolean isEmailVerified = verificationCodeService.verifyCode(request.getEmail(), request.getCode());
            if(isEmailVerified){
                return ResponseEntity.ok(Map.of("message", "Mã xác nhận thành công!"));
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", "Mã xác nhận không hợp lệ hoặc đã hết hạn."));
            }
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", "Lỗi khi xác minh mã."));
        }
    }
}
