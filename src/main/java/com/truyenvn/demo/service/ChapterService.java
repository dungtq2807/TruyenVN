package com.truyenvn.demo.service;

import com.truyenvn.demo.entity.Chapter;

import java.util.List;

public interface ChapterService {

    List<Chapter> findAllChapter();

    Chapter addChapter(Chapter chapter);

    Chapter updateChapter(Chapter chapter);
}
