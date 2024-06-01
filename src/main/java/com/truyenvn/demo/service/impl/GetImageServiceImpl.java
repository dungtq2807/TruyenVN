package com.truyenvn.demo.service.impl;

import com.truyenvn.demo.entity.Comic;
import com.truyenvn.demo.entity.ComicDetail;
import com.truyenvn.demo.repository.ComicDetailRepository;
import com.truyenvn.demo.repository.ComicRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GetImageServiceImpl {

    private final ComicRepository comicRepository;
    private final ComicDetailRepository repository;

    public Optional<ComicDetail> findById(UUID id) {
        return repository.findById(id);
    }

}
