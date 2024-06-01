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

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "History_Detail")
public class History {

    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "id_users", referencedColumnName = "id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "id_comic_detail", referencedColumnName = "id")
    private ComicDetail comicDetail;

    @Column(name = "chapter_readed")
    private String chapterReaded;
}
