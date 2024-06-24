package com.truyenvn.demo.service;

import com.truyenvn.demo.dto.ImageResponse;
import com.truyenvn.demo.entity.Chapter;
import com.truyenvn.demo.entity.Image;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

public interface ImageService {

    List<ImageResponse> findAllImageByIdChapter(UUID id);

    List<Image> addImages(MultipartFile[] image, Chapter chapter) throws IOException;

    ImageResponse getOneImage(UUID id);

    Image updateImage(MultipartFile image, UUID id) throws IOException;

    void deleteImage(UUID id);
}
