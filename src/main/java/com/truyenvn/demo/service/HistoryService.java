package com.truyenvn.demo.service;

import com.truyenvn.demo.entity.History;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.UUID;

public interface HistoryService {

    Page<History> getAllHistory(Integer page);

    void deleteHistoryById(UUID id);
}
