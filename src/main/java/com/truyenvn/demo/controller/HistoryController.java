package com.truyenvn.demo.controller;

import com.truyenvn.demo.entity.Follow;
import com.truyenvn.demo.service.impl.FollowServiceImpl;
import com.truyenvn.demo.service.impl.HistoryServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/history")
@RequiredArgsConstructor
public class HistoryController {

    private final HistoryServiceImpl service;

    @GetMapping("getAll")
    private ResponseEntity getAllComicFollow(@RequestParam(defaultValue = "0") Integer page) {
        return new ResponseEntity<>(service.getAllHistory(page), HttpStatus.OK);
    }

    @DeleteMapping("delete-history/{id}")
    private ResponseEntity unfollow(@PathVariable UUID id) {
        service.deleteHistoryById(id);
        return new ResponseEntity<>("Success",HttpStatus.OK);
    }
}
