package com.truyenvn.demo.service.impl;

import com.truyenvn.demo.entity.Comic;
import com.truyenvn.demo.entity.ComicDetail;
import com.truyenvn.demo.repository.ComicDetailRepository;
import com.truyenvn.demo.repository.ComicRepository;
import com.truyenvn.demo.service.ComicDetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ComicDetailServiceImpl implements ComicDetailService {

    private final ComicDetailRepository repository;
    private final ComicRepository comicRepository;

    @Override
    public List<ComicDetail> getAll() {
        return repository.findAll();
    }

    @Override
    public ComicDetail add(String name, String description, String updateAt, String createdAt, MultipartFile file) throws IOException {
        Comic comic = new Comic().builder()
                .name(name)
                .image(file.getBytes())
                .description(description)
                .status(1)
                .createdAt(createdAt)
                .updatedAt(updateAt)
                .dateCreatedAt(new Date())
                .dateUpdatedAt(new Date())
                .build();
        comicRepository.save(comic);
        ComicDetail comicDetail = new ComicDetail();
        comicDetail.setComic(comic);
        comicDetail.setStatus(1);
        comicDetail.setViewed(0);
        comicDetail.setCreatedAt(createdAt);
        comicDetail.setUpdatedAt(updateAt);
        comicDetail.setDateCreatedAt(new Date());
        comicDetail.setDateUpdatedAt(new Date());
        return repository.save(comicDetail);
    }
}
