package com.truyenvn.demo.controller;

import com.truyenvn.demo.entity.Comic;
import com.truyenvn.demo.entity.ComicDetail;
import com.truyenvn.demo.service.impl.GetImageServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
public class GetImageController {

    private final GetImageServiceImpl getComicDetail;

    @GetMapping("img/{id}")
    public ResponseEntity<byte[]> getComicImage(@PathVariable UUID id) {
        Optional<ComicDetail> comicDetailOptional = getComicDetail.findById(id);
        if (comicDetailOptional.isPresent()) {
            ComicDetail comicDetail = comicDetailOptional.get();
            Comic comic = comicDetail.getComic();
            if (comic != null && comic.getImage() != null) {
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG)
                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + comic.getName() + ".jpg\"")
                        .body(comic.getImage());
            }
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
