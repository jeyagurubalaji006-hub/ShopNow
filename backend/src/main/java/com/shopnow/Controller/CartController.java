package com.shopnow.Controller;

import com.shopnow.DTO.CartItemRequest;
import com.shopnow.Model.Cart;
import com.shopnow.Services.CartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    // Authentication.getName() returns the email set as the JWT subject
    @GetMapping
    public Cart getCart(Authentication auth) {
        return cartService.getCart(auth.getName());
    }

    @PostMapping("/add")
    public ResponseEntity<?> addItem(Authentication auth, @Valid @RequestBody CartItemRequest request) {
        try {
            Cart cart = cartService.addItem(auth.getName(), request.getProductId(), request.getQuantity());
            return ResponseEntity.ok(cart);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateItem(Authentication auth, @Valid @RequestBody CartItemRequest request) {
        try {
            Cart cart = cartService.updateItem(auth.getName(), request.getProductId(), request.getQuantity());
            return ResponseEntity.ok(cart);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/remove/{productId}")
    public Cart removeItem(Authentication auth, @PathVariable String productId) {
        return cartService.removeItem(auth.getName(), productId);
    }

    @DeleteMapping("/clear")
    public Cart clearCart(Authentication auth) {
        return cartService.clearCart(auth.getName());
    }
}
