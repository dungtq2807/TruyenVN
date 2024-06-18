package com.truyenvn.demo.service.impl;

import com.truyenvn.demo.dto.ImageResponse;
import com.truyenvn.demo.entity.Chapter;
import com.truyenvn.demo.entity.Comic;
import com.truyenvn.demo.entity.History;
import com.truyenvn.demo.entity.Image;
import com.truyenvn.demo.entity.User;
import com.truyenvn.demo.repository.ChapterRepository;
import com.truyenvn.demo.repository.ComicRepository;
import com.truyenvn.demo.repository.HistoryRepository;
import com.truyenvn.demo.repository.ImageRepository;
import com.truyenvn.demo.service.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ImageServiceImpl implements ImageService {

    private final ImageRepository repository;
    private final HistoryRepository historyRepository;
    private final ComicRepository comicRepository;
    private final ChapterRepository chapterRepository;


    @Override
    public List<ImageResponse> findAllImageByIdChapter(UUID id) {
        List<Image> images = repository.findAllImageByIdChapter(id);
        List<ImageResponse> imageResponses = new ArrayList<>();
        Chapter chapter = chapterRepository.findById(id).orElse(null);
        Comic comic = comicRepository.findById(chapter.getComic().getId()).orElse(null);

        for (Image image : images) {
            ImageResponse imageResponse = new ImageResponse();
            imageResponse.setCode(image.getCode());
            imageResponse.setCreatedAt(image.getCreatedAt());
            imageResponse.setDateCreatedAt(image.getDateCreatedAt());
            imageResponse.setUpdatedAt(image.getUpdatedAt());
            imageResponse.setDateUpdatedAt(image.getDateUpdatedAt());
            imageResponse.setStatus(image.getStatus());
            imageResponse.setId(image.getId());
            imageResponses.add(imageResponse);
        }
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        History history = historyRepository.findByComicAndUser(comic, user)
                .orElseGet(() -> {
                    History newHistory = new History();
                    newHistory.setComic(comic);
                    newHistory.setUser(user);
                    return newHistory;
                });

        // Cập nhật tên chương đọc
        history.setChapterReaded(chapter.getName());

        // Lưu vào cơ sở dữ liệu
        historyRepository.save(history);
        return imageResponses;
    }


    @Override
    public List<Image> addImages(MultipartFile[] images, Chapter chapter) throws IOException {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        // Lấy số thứ tự bắt đầu
        int startOrder = repository.countByChapter(chapter) + 1;

        List<Image> imageList = repository.findAllImageByIdChapter(chapter.getId());

        for (MultipartFile image : images) {
            Image img = new Image();
            img.setCode(String.valueOf(startOrder++)); // Đặt tên file theo số thứ tự và tăng dần
            img.setImage(image.getBytes());
            img.setCreatedAt(user.getFullName());
            img.setUpdatedAt(user.getFullName());
            img.setStatus(1);
            img.setDateUpdatedAt(new Date());
            img.setDateCreatedAt(new Date());
            img.setChapter(chapter);
            imageList.add(img);
        }
        return repository.saveAll(imageList); // Lưu tất cả các hình ảnh vào cơ sở dữ liệu
    }

    @Override
    public Image updateImage(Image image) {
        return null;
    }
}
