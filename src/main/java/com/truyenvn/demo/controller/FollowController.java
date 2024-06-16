package com.truyenvn.demo.controller;

import com.truyenvn.demo.entity.Follow;
import com.truyenvn.demo.service.impl.FollowServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/follow")
@RequiredArgsConstructor
public class FollowController {

    private final FollowServiceImpl service;

    @GetMapping("getAll")
    private ResponseEntity getAllComicFollow(@RequestParam(defaultValue = "0") Integer page) {
        return new ResponseEntity<>(service.getAllComicFollow(page), HttpStatus.OK);
    }

    @PostMapping("follow-comic")
    private ResponseEntity followComic(@RequestBody Follow follow) {
        return new ResponseEntity<>(service.followComic(follow), HttpStatus.OK);
    }

    @DeleteMapping("unfollow/{id}")
    private ResponseEntity unfollow(@PathVariable UUID id) {
        service.unfollowComic(id);
        return new ResponseEntity<>("Success",HttpStatus.OK);
    }
}
