package com.truyenvn.demo.service;

import com.truyenvn.demo.dto.UserResponse;
import com.truyenvn.demo.entity.Role;
import com.truyenvn.demo.entity.User;
import org.springframework.data.domain.Page;

import java.util.UUID;

public interface UserService {

    UserResponse findByUserByID(UUID id);

    Page<UserResponse> searchUsers(String firstName, String lastName, String username, Role role, Integer page);

    UserResponse saveUser(UserResponse userResponse);

    void changePassword(String username, String oldPassword, String newPassword);
}
