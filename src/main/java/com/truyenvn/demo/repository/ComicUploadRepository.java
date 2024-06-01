package com.truyenvn.demo.repository;

import com.truyenvn.demo.entity.ComicUpload;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ComicUploadRepository extends JpaRepository<ComicUpload, UUID> {
}
