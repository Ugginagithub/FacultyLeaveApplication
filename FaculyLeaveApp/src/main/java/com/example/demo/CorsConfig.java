package com.example.demo;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer webMvcConfigurer() {
        return new CustomCorsConfigurer();
    }

    // Custom class that implements WebMvcConfigurer
    public static class CustomCorsConfigurer implements WebMvcConfigurer {

        @Override
        public void addCorsMappings(CorsRegistry registry) {
            registry.addMapping("/**")  // Apply CORS to all endpoints
                    .allowedMethods("GET", "POST", "PUT", "DELETE")  // Allow these HTTP methods
                    .allowedOrigins("*");  // Allow requests from all origins
        }
    }
}
