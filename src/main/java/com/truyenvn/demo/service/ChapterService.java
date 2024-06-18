package com.truyenvn.demo.service;

import com.truyenvn.demo.entity.Chapter;

import java.util.List;
import java.util.UUID;

public interface ChapterService {

    List<Chapter> findAllChapter();

    Chapter getOneChapter(UUID id);

    Chapter addChapter(Chapter chapter);

    Chapter updateChapter(Chapter chapter);
}
