package com.truyenvn.demo.controller;

import com.truyenvn.demo.entity.Category;
import com.truyenvn.demo.entity.Chapter;
import com.truyenvn.demo.service.impl.CategoryServiceImpl;
import com.truyenvn.demo.service.impl.ChapterServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/chapter")
@RequiredArgsConstructor
public class ChapterController {

    private final ChapterServiceImpl service;

    @GetMapping("getAll/{id}")
    private ResponseEntity getAllChapter(@PathVariable UUID id) {
        return new ResponseEntity<>(service.findAllChapter(id), HttpStatus.OK);
    }

    @GetMapping("get-one-chapter/{id}")
    private ResponseEntity getOneChapter(@PathVariable UUID id) {
        return new ResponseEntity<>(service.getOneChapter(id), HttpStatus.OK);
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
