package com.truyenvn.demo.repository;

import com.truyenvn.demo.entity.History;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface HistoryRepository extends JpaRepository<History, UUID> {
}