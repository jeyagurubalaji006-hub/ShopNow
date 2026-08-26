package com.shopnow;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class ShopNowApplication {

    public static void main(String[] args) {
        SpringApplication.run(ShopNowApplication.class, args);
    }

}
