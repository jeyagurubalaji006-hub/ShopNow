package com.shopnow.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Min;
import lombok.Data;

@Data
public class CartItemRequest {

    @NotBlank
    private String productId;

    @Min(1)
    private int quantity;
}
