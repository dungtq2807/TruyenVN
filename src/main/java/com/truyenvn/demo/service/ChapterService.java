package com.truyenvn.demo.service;

import com.truyenvn.demo.dto.ChapterResponse;
import com.truyenvn.demo.entity.Chapter;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.UUID;

public interface ChapterService {

    List<Chapter> findAllChapter(UUID id);

    Page<ChapterResponse> searchChapters(String code, String name, Integer status, Integer page);

    Chapter getOneChapter(UUID id);

    Chapter addChapter(Chapter chapter);

    Chapter updateChapter(Chapter chapter);
}
