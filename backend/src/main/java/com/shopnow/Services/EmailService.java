package com.shopnow.Services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;
    @Async
    public void sendOtp(String email, String otp) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(email);
        message.setSubject("ShopNow Email Verification");
        message.setText("Your OTP is : " + otp);

        mailSender.send(message);
    }
}
