package com.shopnow.Services;
import java.util.HashMap;
import java.util.Map;
import com.shopnow.DTO.AuthResponse;
import com.shopnow.DTO.LoginRequest;
import com.shopnow.DTO.RegisterRequest;
import com.shopnow.Model.User;
import com.shopnow.Repository.UserRepository;
import com.shopnow.JWTSecurity.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final EmailService emailService;
    // Store OTPs temporarily
    private final Map<String, String> otpStorage = new HashMap<>();

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email is already registered");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setDob(request.getDob());
        user.setGender(request.getGender());

        userRepository.save(user);

        String token = jwtUtil.generateToken(user.getEmail());
        return new AuthResponse(token, user.getName(), user.getEmail());
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid email or password");
        }

        String token = jwtUtil.generateToken(user.getEmail());
        return new AuthResponse(token, user.getName(), user.getEmail());
    }
    public void sendEmailOtp(String email) {

        String otp = String.valueOf((int)((Math.random() * 900000) + 100000));

        otpStorage.put(email, otp);

        emailService.sendOtp(email, otp);
    }

    public boolean verifyOtp(String email, String otp) {

        String savedOtp = otpStorage.get(email);

        if (savedOtp != null && savedOtp.equals(otp)) {
            otpStorage.remove(email);
            return true;
        }

        return false;
    }
}


