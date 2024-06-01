package com.truyenvn.demo.service;

import com.truyenvn.demo.entity.ComicDetail;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ComicDetailService {

    List<ComicDetail> getAll();

    ComicDetail add(String name, String description, String updateAt, String createdAt, MultipartFile file) throws IOException;
}
