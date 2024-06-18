package com.truyenvn.demo.service;

import com.truyenvn.demo.entity.Comic;
import com.truyenvn.demo.entity.ComicDetail;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

public interface ComicDetailService {

    Page<Comic> getAll(Integer page);

    Comic findOneByIdComic(UUID id);

    ComicDetail findOneByIdComicDetail(UUID id);

    List<ComicDetail> findByIdComic(UUID id);

    List<ComicDetail> addComicDetail(List<ComicDetail> comicDetail);

    ComicDetail updateComicDetail(ComicDetail comicDetail);

    Comic addComic(String name, String description, MultipartFile file) throws IOException;

    Comic updateComic(UUID id, String name, String description, MultipartFile file, Integer viewed,Integer status) throws IOException;
}
