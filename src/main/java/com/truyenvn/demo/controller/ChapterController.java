package com.truyenvn.demo.controller;

import com.truyenvn.demo.entity.Category;
import com.truyenvn.demo.entity.Chapter;
import com.truyenvn.demo.service.impl.CategoryServiceImpl;
import com.truyenvn.demo.service.impl.ChapterServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/chapter")
@RequiredArgsConstructor
public class ChapterController {

    private final ChapterServiceImpl service;

    @GetMapping("getAll")
    private ResponseEntity getAllCategory() {
        return new ResponseEntity<>(service.findAllChapter(), HttpStatus.OK);
    }

    @PostMapping("add-chapter")
    private ResponseEntity addChapter(@RequestBody Chapter chapter) {
        return new ResponseEntity<>(service.addChapter(chapter), HttpStatus.OK);
    }

    @PutMapping("update-chapter")
    private ResponseEntity updateChapter(@RequestBody Chapter chapter) {
        return new ResponseEntity<>(service.updateChapter(chapter), HttpStatus.OK);
    }
}
