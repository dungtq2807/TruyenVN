package com.truyenvn.demo.controller;

import com.truyenvn.demo.dto.ImageResponse;
import com.truyenvn.demo.entity.Chapter;
import com.truyenvn.demo.service.impl.ImageServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/image")
@RequiredArgsConstructor
public class ImageController {

    private final ImageServiceImpl service;

    @GetMapping("getAll")
    private ResponseEntity getAllImageByIdChapter(@RequestParam UUID id) {
        List<ImageResponse> list = service.findAllImageByIdChapter(id);
        List<ImageResponse> responses = list.stream().map(comicDetail -> {
            String imageUrl = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("imgChapter/")
                    .path(comicDetail.getId().toString())
                    .toUriString();
            return new ImageResponse(comicDetail.getId(), comicDetail.getCode(), imageUrl, comicDetail.getStatus(), comicDetail.getCreatedAt(),
                    comicDetail.getUpdatedAt(), comicDetail.getDateUpdatedAt(), comicDetail.getDateCreatedAt());
        }).collect(Collectors.toList());
        return new ResponseEntity<>(responses, HttpStatus.OK);
    }

    @GetMapping("get-one-image/{id}")
    private ResponseEntity getOneImage(@PathVariable UUID id) {
        return new ResponseEntity<>(service.getOneImage(id), HttpStatus.OK);
    }

    @PostMapping("add-image")
    private ResponseEntity addImage(@RequestParam MultipartFile[] image, @RequestParam Chapter chapter) throws IOException {
        return new ResponseEntity<>(service.addImages(image, chapter), HttpStatus.OK);
    }

    @PutMapping("update-image")
    private ResponseEntity updateImage(@RequestParam MultipartFile image, @RequestParam UUID id) throws IOException {
        return new ResponseEntity<>(service.updateImage(image, id), HttpStatus.OK);
    }

    @DeleteMapping("delete-image/{id}")
    private ResponseEntity deleteImage(@PathVariable UUID id) {
        service.deleteImage(id);
        return new ResponseEntity<>("Success", HttpStatus.OK);
    }
}
