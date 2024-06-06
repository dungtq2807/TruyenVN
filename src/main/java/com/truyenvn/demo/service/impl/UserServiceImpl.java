package com.truyenvn.demo.service.impl;

import com.truyenvn.demo.dto.UserResponse;
import com.truyenvn.demo.entity.User;
import com.truyenvn.demo.repository.UserRepository;
import com.truyenvn.demo.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository repository;


    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserResponse findByUserByID(UUID id) {
        User user = repository.findById(id).orElse(null);
        UserResponse userResponse = new UserResponse().builder()
                .id(user.getId())
                .username(user.getUsername())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .avatar(user.getAvatar())
                .build();
        return userResponse;
    }

    @Override
    public UserResponse saveUser(UserResponse userResponse) {
        User user1 = repository.findById(userResponse.getId()).orElse(null).builder()
                .id(userResponse.getId())
                .username(userResponse.getUsername())
                .firstName(userResponse.getFirstName())
                .lastName(userResponse.getLastName())
                .avatar(userResponse.getAvatar())
                .password(repository.findById(userResponse.getId()).orElse(null).getPassword())
                .role(repository.findById(userResponse.getId()).orElse(null).getRole())
                .build();
        repository.save(user1);
        return userResponse;
    }

    @Override
    public void changePassword(String username, String oldPassword, String newPassword) {
        User user = repository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        if (passwordEncoder.matches(oldPassword, user.getPassword())) {
            String encodedPassword = passwordEncoder.encode(newPassword);
            user.setPassword(encodedPassword);
            repository.save(user);
        } else {
            throw new IllegalArgumentException("Old password is incorrect");
        }
    }

}
