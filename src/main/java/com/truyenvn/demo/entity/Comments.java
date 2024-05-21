package com.truyenvn.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
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
@Entity
@Table(name = "Comments")
public class Comments {

    @Id
    @GeneratedValue
    private UUID id;

    private String code;

    private String comments;

    private Integer status;

    private String createdAt;

    private String updatedAt;

    private Date dateUpdatedAt;

    private Date dateCreatedAt;
}
