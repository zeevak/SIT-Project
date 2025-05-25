package org.example.fuel_management_system.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "Fuel Management System Backend is running!";
    }

    @GetMapping("/health")
    public String health() {
        return "OK";
    }
}
