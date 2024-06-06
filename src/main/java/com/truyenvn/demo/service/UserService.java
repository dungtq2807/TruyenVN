package com.truyenvn.demo.service;

import com.truyenvn.demo.dto.UserResponse;
import com.truyenvn.demo.entity.User;

import java.util.UUID;

public interface UserService {

    UserResponse findByUserByID(UUID id);

    UserResponse saveUser(UserResponse userResponse);

    void changePassword(String username, String oldPassword, String newPassword);
}
