package com.truyenvn.demo.service.impl;

import com.truyenvn.demo.entity.History;
import com.truyenvn.demo.repository.HistoryRepository;
import com.truyenvn.demo.service.HistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class HistoryServiceImpl implements HistoryService {

    private final HistoryRepository historyRepository;

    @Override
    public Page<History> getAllHistory(Integer page) {
        Pageable pageable = PageRequest.of(page, 20);
        return historyRepository.findAll(pageable);
    }

    @Override
    public void deleteHistoryById(UUID id) {
        historyRepository.deleteById(id);
    }
}
