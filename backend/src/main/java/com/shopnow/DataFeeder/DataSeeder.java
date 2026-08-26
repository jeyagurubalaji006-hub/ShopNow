package com.shopnow.DataFeeder;

import com.shopnow.Model.Category;
import com.shopnow.Model.Product;
import com.shopnow.Repository.CategoryRepository;
import com.shopnow.Repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;

    @Override
    public void run(String... args) {

        if (categoryRepository.count() == 0) {
            categoryRepository.saveAll(List.of(
                    new Category(null, "Electronics", "images/electronics.png"),
                    new Category(null, "Fashion", "images/fashion.png"),
                    new Category(null, "Home", "images/home.png")
            ));
        }

        if (productRepository.count() == 0) {
            productRepository.saveAll(List.of(
                    new Product(null, "Wireless Headphones", "Noise-cancelling over-ear headphones", 59.99, "Electronics", "images/headphones.jpg", 50),
                    new Product(null, "Smart Watch", "Fitness tracking smart watch", 89.99, "Electronics", "images/watch.jpg", 30),
                    new Product(null, "Denim Jacket", "Classic blue denim jacket", 45.00, "Fashion", "images/jacket.jpg", 20),
                    new Product(null, "Running Shoes", "Lightweight running shoes", 65.50, "Fashion", "images/shoes.jpg", 40),
                    new Product(null, "Table Lamp", "Modern LED table lamp", 24.99, "Home", "images/lamp.jpg", 60)
            ));
        }
    }
}