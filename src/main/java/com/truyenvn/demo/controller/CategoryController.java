package com.truyenvn.demo.controller;

import com.truyenvn.demo.entity.Category;
import com.truyenvn.demo.service.impl.CategoryServiceImpl;
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
@RequestMapping("/api/v1/category")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryServiceImpl service;

    @GetMapping("getAll")
    private ResponseEntity getAllCategory() {
        return new ResponseEntity<>(service.getAll(), HttpStatus.OK);
    }

    @GetMapping("get-one-category/{id}")
    private ResponseEntity getOneCategory(@PathVariable UUID id) {
        return new ResponseEntity<>(service.getOneCategory(id), HttpStatus.OK);
    }

    @PostMapping("add-category")
    private ResponseEntity addCategory(@RequestBody Category category) {
        return new ResponseEntity<>(service.addCategory(category), HttpStatus.OK);
    }

    @PutMapping("update-category")
    private ResponseEntity updateCategory(@RequestBody Category category) {
        return new ResponseEntity<>(service.updateCategory(category), HttpStatus.OK);
    }
}
