package com.truyenvn.demo.repository;

import com.truyenvn.demo.dto.CommentsResponse;
import com.truyenvn.demo.entity.Comments;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface CommentsRepository extends JpaRepository<Comments, UUID> {

    @Query("select c from Comments c where c.comic.id = ?1 order by c.dateUpdatedAt desc " )
    Page<Comments> getAllCommentsByComic(UUID id, Pageable pageable);
}
