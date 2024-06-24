package com.truyenvn.demo.service.impl;

import com.truyenvn.demo.entity.Chapter;
import com.truyenvn.demo.entity.User;
import com.truyenvn.demo.repository.ChapterRepository;
import com.truyenvn.demo.service.ChapterService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Random;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ChapterServiceImpl implements ChapterService {

    private final ChapterRepository repository;

    @Override
    public List<Chapter> findAllChapter(UUID id) {
        return repository.findAllByComicId(id);
    }

    @Override
    public Chapter getOneChapter(UUID id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public Chapter addChapter(Chapter chapter) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        int code = new Random().nextInt(1000000000);
        chapter.setCode("CT" + code);
        chapter.setCreatedAt(user.getFullName());
        chapter.setUpdatedAt(user.getFullName());
        chapter.setDateCreatedAt(new Date());
        chapter.setDateUpdatedAt(new Date());
        chapter.setStatus(1);
        return repository.save(chapter);
    }

    @Override
    public Chapter updateChapter(Chapter chapter) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(chapter.getId() == null){
            throw new IllegalArgumentException("Không tìm thấy id");
        }
        Chapter newChaper = repository.findById(chapter.getId()).orElse(null);
        newChaper.setUpdatedAt(user.getFullName());
        newChaper.setDateUpdatedAt(new Date());
        if(chapter.getStatus() != null){
            newChaper.setStatus(chapter.getStatus());
        }
        if(chapter.getComic() != null){
            newChaper.setComic(chapter.getComic());
        }
        if(chapter.getName() != null){
            newChaper.setName(chapter.getName());
        }
        return repository.save(newChaper);
    }
}
