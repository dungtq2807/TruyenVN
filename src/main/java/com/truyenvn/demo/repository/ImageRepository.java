package com.truyenvn.demo.repository;

import com.truyenvn.demo.entity.Chapter;
import com.truyenvn.demo.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ImageRepository extends JpaRepository<Image, UUID> {

    @Query("select i from Image i where i.chapter.id = ?1 order by i.code asc")
    List<Image> findAllImageByIdChapter(UUID id);

    int countByChapter(Chapter chapter);
}
