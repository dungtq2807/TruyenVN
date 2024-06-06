package com.truyenvn.demo.controller;

import com.truyenvn.demo.dto.ComicDetailResponse;
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
        Page<ComicDetail> comicDetails = comicDetailService.getAll(page);
        List<ComicDetailResponse> responses = comicDetails.stream().map(comicDetail -> {
            String imageUrl = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path(comicDetail.getId().toString())
                    .toUriString();
            return new ComicDetailResponse(comicDetail, imageUrl);
        }).collect(Collectors.toList());
        return new ResponseEntity<>(responses, HttpStatus.OK);
    }


    @GetMapping("/{id}")
    public ResponseEntity<?> getOneComicDetail(@PathVariable UUID id) {
        Optional<ComicDetail> comicDetailOptional = getComicDetail.findById(id);
        if (comicDetailOptional.isPresent()) {
            ComicDetail comicDetail = comicDetailOptional.get();
            // Tạo URL ảnh
            String imageUrl = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path(id.toString())
                    .toUriString();
            ComicDetailResponse response = new ComicDetailResponse(comicDetail, imageUrl);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("post")
    private ResponseEntity post(@RequestParam String name,
                                @RequestParam String description,
                                @RequestParam String updateAt,
                                @RequestParam String createdAt,
                                @RequestParam MultipartFile file
    ) {
        try {
            return ResponseEntity.ok(comicDetailService.add(name, description, updateAt, createdAt, file));
        } catch (IOException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
