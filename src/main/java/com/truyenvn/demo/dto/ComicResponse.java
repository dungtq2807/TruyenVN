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
public class ComicResponse {
    private UUID id;
    private String name;
    private String description;
    private Integer viewed;
    private Integer status;
    private String createdAt;
    private String updatedAt;
    private Date dateCreatedAt;
    private Date dateUpdatedAt;
}
