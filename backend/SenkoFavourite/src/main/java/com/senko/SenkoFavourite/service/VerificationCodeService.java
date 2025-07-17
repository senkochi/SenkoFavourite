package com.senko.SenkoFavourite.service;

import com.senko.SenkoFavourite.model.VerificationCode;
import com.senko.SenkoFavourite.repository.VerificationCodeRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Optional;
import java.util.Random;

@Service
public class VerificationCodeService {
    @Autowired
    private VerificationCodeRepository repo;

    @Autowired
    private EmailService emailService;

    private static final int CODE_LENGTH = 6;
    private static final int EXPIRATION_MINUTES = 5;

    // Phương thức tạo mã ngẫu nhiên
    private String generateRandomCode(int length) {
        Random random = new Random();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < length; i++) {
            sb.append(random.nextInt(10)); // Số ngẫu nhiên từ 0-9
        }
        return sb.toString();
    }

    @Transactional
    public void generateAndSendCode(String email){
        String code = generateRandomCode(CODE_LENGTH);

        Optional<VerificationCode> existingCode = repo.findByEmail(email);
        VerificationCode verificationCode;

        if(existingCode.isPresent()){
            verificationCode = existingCode.get();
            verificationCode.setCode(code);
            verificationCode.setExpiryDate(LocalDateTime.now().plusMinutes(EXPIRATION_MINUTES));
            verificationCode.setVerified(false);
        } else {
            verificationCode = VerificationCode.builder()
                    .email(email)
                    .code(code)
                    .expiryDate(LocalDateTime.now().plusMinutes(EXPIRATION_MINUTES))
                    .verified(false)
                    .build();
        }
        repo.save(verificationCode);

        emailService.sendVerificationMail(email, code);
        System.out.println("Mã xác nhận " + code + " đã được tạo và gửi cho " + email);
    }

    @Transactional
    public boolean verifyCode(String email, String code){
        Optional<VerificationCode> optionalCode = repo.findByEmailAndCode(email, code);

        if(optionalCode.isEmpty()){
            System.out.println("Mã xác nhận không tìm thấy cho email: " + email + " và code: " + code);
            return false;
        }

        VerificationCode verificationCode = optionalCode.get();

        if(verificationCode.getExpiryDate().isBefore(LocalDateTime.now())){
            System.out.println("Mã xác nhận đã hết hạn cho email: " + email);
            repo.delete(verificationCode);
            return false;
        }

        if(verificationCode.isVerified()){
            System.out.println("Mã xác nhận đã được sử dụng cho email: " + email);
            return false;
        }

        verificationCode.setVerified(true);
        repo.save(verificationCode);
        System.out.println("Mã xác nhận thành công cho email: " + email);
        return true;
    }
}
