package com.truyenvn.demo.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChapterResponse {

    private UUID id;

    private String code;

    private String name;

    private Integer status;

    private String createdAt;

    private String updatedAt;

    private Date dateUpdatedAt;

    private Date dateCreatedAt;
}
