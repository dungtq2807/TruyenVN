package com.truyenvn.demo.service.impl;

import com.truyenvn.demo.dto.UserResponse;
import com.truyenvn.demo.entity.Role;
import com.truyenvn.demo.entity.User;
import com.truyenvn.demo.repository.UserRepository;
import com.truyenvn.demo.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
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
        new UserResponse();
        UserResponse userResponse = UserResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .avatar(user.getAvatar())
                .build();
        return userResponse;
    }

    @Override
    public Page<UserResponse> searchUsers(String firstName, String lastName, String username, Role role, Integer page) {
        // Tạo đối tượng User mẫu (probe)
        User probe = User.builder()
                .firstName(firstName)
                .lastName(lastName)
                .username(username)
                .role(role)
                .build();

        // Tạo ExampleMatcher để bỏ qua giá trị null và chuỗi trống
        ExampleMatcher matcher = ExampleMatcher.matching()
                .withIgnoreNullValues()
                .withIgnoreCase()
                .withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING);

        Example<User> example = Example.of(probe, matcher);

        // Tạo đối tượng Pageable
        Pageable pageable = PageRequest.of(page, 20, Sort.by(Sort.Direction.ASC, "username"));

        // Tìm tất cả các User theo điều kiện và phân trang
        Page<User> userPage = repository.findAll(example, pageable);

        // Chuyển đổi Page<User> thành Page<UserResponse>
        return userPage.map(this::convertToUserResponse);
    }

    private UserResponse convertToUserResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .username(user.getUsername())
                .avatar(user.getAvatar())
                .role(user.getRole())
                .build();
    }

    @Override
    public UserResponse saveUser(UserResponse userResponse) {
        repository.findById(userResponse.getId());
        User user1 = User.builder()
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
