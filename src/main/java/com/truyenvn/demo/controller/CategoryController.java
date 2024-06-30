package com.truyenvn.demo.controller;

import com.truyenvn.demo.dto.ErrorResponse;
import com.truyenvn.demo.entity.Category;
import com.truyenvn.demo.service.impl.CategoryServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/category")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryServiceImpl service;

    @GetMapping("getAll")
    private ResponseEntity getAllCategory() {
        try {
            return new ResponseEntity<>(service.getAll(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new ErrorResponse("Error", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/search")
    public ResponseEntity searchCategories(
            @RequestParam(required = false) String code,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) Integer status,
            @RequestParam(defaultValue = "0", required = false) Integer page) {
        try {
            return new ResponseEntity<>(service.searchCategories(code, category, status, page), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new ErrorResponse("Error", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("get-one-category/{id}")
    private ResponseEntity getOneCategory(@PathVariable UUID id) {
        try {
            return new ResponseEntity<>(service.getOneCategory(id), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new ErrorResponse("Error", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("add-category")
    private ResponseEntity addCategory(@RequestBody Category category) {
        try {
            return new ResponseEntity<>(service.addCategory(category), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new ErrorResponse("Error", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("update-category")
    private ResponseEntity updateCategory(@RequestBody Category category) {
        try {
            return new ResponseEntity<>(service.updateCategory(category), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new ErrorResponse("Error", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
