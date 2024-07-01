package com.truyenvn.demo.dto;

import com.truyenvn.demo.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponse {

    private UUID id;

    private String firstName;

    private String lastName;

    private String username;

    private String avatar;

    private Role role;

}
