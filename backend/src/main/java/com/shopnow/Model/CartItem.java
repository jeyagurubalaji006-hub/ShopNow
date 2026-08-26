package com.shopnow.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartItem {

    private String productId;
    private String name;
    private double price;
    private String image;
    private int quantity;
}
