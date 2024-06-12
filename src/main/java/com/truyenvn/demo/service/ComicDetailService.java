package com.truyenvn.demo.service;

import com.truyenvn.demo.entity.ComicDetail;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

public interface ComicDetailService {

    Page<ComicDetail> getAll(Integer page);

    ComicDetail add(String name, String description, MultipartFile file) throws IOException;

    ComicDetail update(UUID id, String name, String description, MultipartFile file, Integer status) throws IOException;
}
