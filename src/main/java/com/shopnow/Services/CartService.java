package com.shopnow.Services;

import com.shopnow.Model.Cart;
import com.shopnow.Model.CartItem;
import com.shopnow.Model.Product;
import com.shopnow.Model.User;
import com.shopnow.Repository.CartRepository;
import com.shopnow.Repository.ProductRepository;
import com.shopnow.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    private String resolveUserId(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return user.getId();
    }

    private Cart getOrCreateCart(String userId) {
        return cartRepository.findByUserId(userId)
                .orElseGet(() -> {
                    Cart cart = new Cart();
                    cart.setUserId(userId);
                    return cartRepository.save(cart);
                });
    }

    public Cart getCart(String email) {
        return getOrCreateCart(resolveUserId(email));
    }

    public Cart addItem(String email, String productId, int quantity) {
        String userId = resolveUserId(email);
        Cart cart = getOrCreateCart(userId);

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Product not found"));

        Optional<CartItem> existing = cart.getItems().stream()
                .filter(i -> i.getProductId().equals(productId))
                .findFirst();

        if (existing.isPresent()) {
            existing.get().setQuantity(existing.get().getQuantity() + quantity);
        } else {
            CartItem item = new CartItem(product.getId(), product.getName(), product.getPrice(), product.getImage(), quantity);
            cart.getItems().add(item);
        }

        return cartRepository.save(cart);
    }

    public Cart updateItem(String email, String productId, int quantity) {
        String userId = resolveUserId(email);
        Cart cart = getOrCreateCart(userId);

        cart.getItems().stream()
                .filter(i -> i.getProductId().equals(productId))
                .findFirst()
                .ifPresentOrElse(
                        item -> item.setQuantity(quantity),
                        () -> { throw new IllegalArgumentException("Item not in cart"); }
                );

        if (quantity <= 0) {
            cart.getItems().removeIf(i -> i.getProductId().equals(productId));
        }

        return cartRepository.save(cart);
    }

    public Cart removeItem(String email, String productId) {
        String userId = resolveUserId(email);
        Cart cart = getOrCreateCart(userId);
        cart.getItems().removeIf(i -> i.getProductId().equals(productId));
        return cartRepository.save(cart);
    }

    public Cart clearCart(String email) {
        String userId = resolveUserId(email);
        Cart cart = getOrCreateCart(userId);
        cart.getItems().clear();
        return cartRepository.save(cart);
    }
}