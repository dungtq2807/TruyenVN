package com.truyenvn.demo.repository;

import com.truyenvn.demo.entity.Comic;
import com.truyenvn.demo.entity.History;
import com.truyenvn.demo.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface HistoryRepository extends JpaRepository<History, UUID> {

    @Query("select h from History h order by h.chapterReaded desc")
    Page<History> findAll(Pageable pageable);

    Optional<History> findByComicAndUser(Comic comic, User user);
}
