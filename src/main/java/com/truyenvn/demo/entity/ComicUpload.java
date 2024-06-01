package com.truyenvn.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name = "Comic_Upload")
public class ComicUpload {

    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "id_users", referencedColumnName = "id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "id_comic", referencedColumnName = "id")
    private ComicDetail comicDetail;

    @Column(name = "created_at")
    private String createdAt;

    @Column(name = "updated_at")
    private String updatedAt;

    @Column(name = "date_updated_at")
    private Date dateUpdatedAt;

    @Column(name = "date_created_at")
    private Date dateCreatedAt;
}
