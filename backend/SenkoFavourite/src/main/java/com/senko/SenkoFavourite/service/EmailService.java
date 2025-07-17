package com.senko.SenkoFavourite.service;

import com.senko.SenkoFavourite.repository.VerificationCodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

//    @Autowired
//    private JavaMailSender mailSender;
//
//    public void sendVerificationMail(String email, String code){
//        SimpleMailMessage message = new SimpleMailMessage();
//        message.setFrom("senkosannanoja@gmail.com");
//        message.setTo(email);
//        message.setSubject("Mã xác nhận SenkoFavourite của bạn");
//        message.setText("Mã xác nhận của bạn là: " + code + "\n\nMã này sẽ hết hạn sau 5 phút.");
//
//        try{
//            mailSender.send(message);
//            System.out.println("Email đã gửi tới " + email);
//        } catch (MailException me){
//            System.err.println("Lỗi khi gửi email xác nhận đến " + email + ": " + me.getMessage());
//            throw new RuntimeException("Không thể gửi email xác nhận. Vui lòng thử lại sau.", me);
//        }
//    }

    @Autowired
    private JavaMailSender mailSender;

    public void sendVerificationMail(String email, String code) {
        System.out.println("=== BẮT ĐẦU GỬI EMAIL ===");
        System.out.println("Email nhận: " + email);
        System.out.println("Mã xác nhận: " + code);

        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("senkosannanoja@gmail.com");
            message.setTo(email);
            message.setSubject("Mã xác nhận SenkoFavourite của bạn");
            message.setText("Mã xác nhận của bạn là: " + code + "\n\nMã này sẽ hết hạn sau 5 phút.");
            mailSender.send(message);

        } catch (MailException me) {
            System.err.println("Lỗi MailException: " + me.getClass().getSimpleName());
            System.err.println("Chi tiết lỗi: " + me.getMessage());
            me.printStackTrace();

            // Kiểm tra các lỗi thường gặp
            if (me.getMessage().contains("Authentication failed")) {
                System.err.println("LỖI XÁC THỰC: Kiểm tra username/password");
            }
            if (me.getMessage().contains("Connection refused") || me.getMessage().contains("timeout")) {
                System.err.println("LỖI KẾT NỐI: Kiểm tra network/firewall");
            }
            if (me.getMessage().contains("535")) {
                System.err.println("LỖI 535: Sai username/password hoặc chưa bật App Password");
            }

            throw new RuntimeException("Không thể gửi email xác nhận: " + me.getMessage(), me);
        } catch (Exception e) {
            System.err.println("Lỗi không mong muốn: " + e.getClass().getSimpleName());
            System.err.println("Chi tiết: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Lỗi hệ thống khi gửi email", e);
        }
    }

}
