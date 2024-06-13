package com.truyenvn.demo.service.impl;

import com.truyenvn.demo.entity.Comic;
import com.truyenvn.demo.entity.ComicDetail;
import com.truyenvn.demo.entity.Image;
import com.truyenvn.demo.repository.ComicDetailRepository;
import com.truyenvn.demo.repository.ComicRepository;
import com.truyenvn.demo.repository.ImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GetImageServiceImpl {

    private final ComicRepository comicRepository;
    private final ImageRepository repository;

    public Optional<Comic> findById(UUID id) {
        return comicRepository.findById(id);
    }

    public Optional<Image> findImageChapterById(UUID id) {
        return repository.findById(id);
    }

}
