package com.truyenvn.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ImageResponse {
    private UUID id;
    private String code;
    private String image;
    private Integer status;
    private String createdAt;
    private String updatedAt;
    private Date dateUpdatedAt;
    private Date dateCreatedAt;

}
