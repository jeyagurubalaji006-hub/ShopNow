package com.shopnow.Repository;

import com.shopnow.Model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ProductRepository extends MongoRepository<Product, String> {
    List<Product> findByCategoryIgnoreCase(String category);
}
