package com.truyenvn.demo.controller;

import com.truyenvn.demo.dto.ErrorResponse;
import com.truyenvn.demo.entity.Category;
import com.truyenvn.demo.entity.Chapter;
import com.truyenvn.demo.service.impl.CategoryServiceImpl;
import com.truyenvn.demo.service.impl.ChapterServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/chapter")
@RequiredArgsConstructor
public class ChapterController {

    private final ChapterServiceImpl service;

    @GetMapping("getAll/{id}")
    private ResponseEntity getAllChapter(@PathVariable UUID id) {
        try {
            return new ResponseEntity<>(service.findAllChapter(id), HttpStatus.OK);
        }catch (Exception e) {
            return new ResponseEntity<>(new ErrorResponse("Error", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/search")
    public ResponseEntity searchChapters(
            @RequestParam(required = false) String code,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) Integer status,
            @RequestParam(defaultValue = "0") Integer page) {
        try {
            return new ResponseEntity<>(service.searchChapters(code, name, status, page), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new ErrorResponse("Error", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("get-one-chapter/{id}")
    private ResponseEntity getOneChapter(@PathVariable UUID id) {
        try {
            return new ResponseEntity<>(service.getOneChapter(id), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new ErrorResponse("Error", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("add-chapter")
    private ResponseEntity addChapter(@RequestBody Chapter chapter) {
        try {
            return new ResponseEntity<>(service.addChapter(chapter), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new ErrorResponse("Error", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("update-chapter")
    private ResponseEntity updateChapter(@RequestBody Chapter chapter) {
        try {
            return new ResponseEntity<>(service.updateChapter(chapter), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new ErrorResponse("Error", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
