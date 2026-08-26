package com.shopnow.Controller;
import com.shopnow.DTO.*;
import com.shopnow.DTO.EmailRequest;
import com.shopnow.DTO.VerifyOtpRequest;
import com.shopnow.Services.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        try {
            AuthResponse response = authService.register(request);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        try {
            AuthResponse response = authService.login(request);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", e.getMessage()));
        }
    }
    @PostMapping("/send-email-otp")
    public ResponseEntity<?> sendOtp(@RequestBody EmailRequest request) {
        authService.sendEmailOtp(request.getEmail());
        return ResponseEntity.ok("OTP Sent");
    }

    @PostMapping("/verify-email-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody VerifyOtpRequest request) {

        boolean ok = authService.verifyOtp(
                request.getEmail(),
                request.getOtp());

        if (ok) {
            return ResponseEntity.ok("Verified");
        }

        return ResponseEntity.badRequest().body("Invalid OTP");
    }
    @GetMapping("/user")
    public Map<String, Object> user(@AuthenticationPrincipal OAuth2User user) {
        return user.getAttributes();
    }
}