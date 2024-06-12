package com.truyenvn.demo.entity;

import jakarta.persistence.Column;
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
@Table(name = "Comic")
public class Comic {

    @Id
    @GeneratedValue
    private UUID id;

    private String name;

    private byte[] image;

    private String description;

    private Integer viewed;

    private Integer status;

    @Column(name = "created_at")
    private String createdAt;

    @Column(name = "updated_at")
    private String updatedAt;

    @Column(name = "date_updated_at")
    private Date dateUpdatedAt;

    @Column(name = "date_created_at")
    private Date dateCreatedAt;
}
