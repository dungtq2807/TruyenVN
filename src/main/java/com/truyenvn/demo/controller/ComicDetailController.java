package com.truyenvn.demo.controller;

import com.truyenvn.demo.dto.ComicDetailResponse;
import com.truyenvn.demo.dto.ErrorResponse;
import com.truyenvn.demo.entity.Comic;
import com.truyenvn.demo.entity.ComicDetail;
import com.truyenvn.demo.service.impl.ComicDetailServiceImpl;
import com.truyenvn.demo.service.impl.GetImageServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/comic_detail")
@RequiredArgsConstructor
public class ComicDetailController {

    private final ComicDetailServiceImpl comicDetailService;
    private final GetImageServiceImpl getComicDetail;

    @GetMapping("getAll")
    private ResponseEntity getAllComic(@RequestParam(defaultValue = "0") Integer page) {
        try {
            Page<Comic> comic = comicDetailService.getAll(page);
            List<ComicDetailResponse> responses = comic.stream().map(comicDetail -> {
                List<ComicDetail> comicDetails = comicDetailService.findByIdComic(comicDetail.getId());
                String imageUrl = ServletUriComponentsBuilder.fromCurrentContextPath()
                        .path("img/")
                        .path(comicDetail.getId().toString())
                        .toUriString();
                return new ComicDetailResponse(comicDetail, comicDetails, imageUrl);
            }).collect(Collectors.toList());
            return new ResponseEntity<>(responses, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new ErrorResponse("Error", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/search")
    public ResponseEntity searchComics(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) Integer status,
            @RequestParam(required = false) Integer viewed,
            @RequestParam(defaultValue = "0") Integer page) {
        try {
            return new ResponseEntity<>(comicDetailService.searchComics(name, status, viewed, page), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new ErrorResponse("Error", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/{id}")
    public ResponseEntity<?> getOneComic(@PathVariable UUID id) {
        Optional<Comic> comicDetailOptional = getComicDetail.findById(id);
        if (comicDetailOptional.isPresent()) {
            Comic comic = comicDetailOptional.get();
            // Tạo URL ảnh
            List<ComicDetail> comicDetails = comicDetailService.findByIdComic(comic.getId());
            String imageUrl = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("img/")
                    .path(id.toString())
                    .toUriString();
            ComicDetailResponse response = new ComicDetailResponse(comic, comicDetails, imageUrl);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("get-one-comic-detail/{id}")
    public ResponseEntity<?> getOneComicDetail(@PathVariable UUID id) {
        try {
            return new ResponseEntity<>(comicDetailService.findOneByIdComicDetail(id), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new ErrorResponse("Error", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("post-comic")
    private ResponseEntity postComic(@RequestParam String name,
                                     @RequestParam String description,
                                     @RequestParam MultipartFile file
    ) {
        try {
            return ResponseEntity.ok(comicDetailService.addComic(name, description, file));
        } catch (IOException e) {
            return new ResponseEntity<>(new ErrorResponse("Error", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("update-comic")
    private ResponseEntity updateComic(@RequestParam(required = false) String name,
                                       @RequestParam(required = false) String description,
                                       @RequestParam(required = false) MultipartFile file,
                                       @RequestParam(required = false) Integer viewed,
                                       @RequestParam UUID id,
                                       @RequestParam(required = false) Integer status
    ) {
        try {
            return ResponseEntity.ok(comicDetailService.updateComic(id, name, description, file,viewed, status));
        } catch (IOException e) {
            return new ResponseEntity<>(new ErrorResponse("Error", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("post-comic-detail")
    private ResponseEntity postComicDetail(@RequestBody List<ComicDetail> comicDetails) {
        return ResponseEntity.ok(comicDetailService.addComicDetail(comicDetails));
    }

    @PutMapping("update-comic-detail")
    private ResponseEntity updateComicDetail(@RequestBody ComicDetail comicDetail) {
        return ResponseEntity.ok(comicDetailService.updateComicDetail(comicDetail));
    }
}
