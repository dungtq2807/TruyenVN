package com.truyenvn.demo.controller;

import com.truyenvn.demo.dto.UserResponse;
import com.truyenvn.demo.entity.User;
import com.truyenvn.demo.service.impl.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/user/")
@RequiredArgsConstructor
public class UserController {

    private final UserServiceImpl userService;

    @GetMapping("{id}")
    private ResponseEntity getOne(@PathVariable UUID id) {
        return ResponseEntity.ok(userService.findByUserByID(id));
    }

    @PutMapping("update-info")
    private ResponseEntity updateInfo(@RequestBody UserResponse user) {
        return ResponseEntity.ok(userService.saveUser(user));
    }

    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(
            @RequestParam String oldPassword,
            @RequestParam String newPassword,
            @RequestParam String confirmPassword) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        if (!newPassword.equals(confirmPassword)) {
            return ResponseEntity.badRequest().body("New passwords do not match");
        }

        try {
            userService.changePassword(username, oldPassword, newPassword);
            return ResponseEntity.ok("Password changed successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
