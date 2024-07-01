package com.truyenvn.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentResponse {
    private UUID id;
    private String code;
    private String comments;
    private Integer status;
    private String createdAt;
    private String updatedAt;
    private Date dateCreatedAt;
    private Date dateUpdatedAt;
}
