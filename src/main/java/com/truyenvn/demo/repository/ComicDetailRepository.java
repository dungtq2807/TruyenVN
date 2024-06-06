package com.truyenvn.demo.repository;

import com.truyenvn.demo.entity.ComicDetail;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ComicDetailRepository extends JpaRepository<ComicDetail, UUID> {

    @Query("select d from ComicDetail d order by d.dateUpdatedAt desc")
    Page<ComicDetail> getAll(Pageable pageable);
}
