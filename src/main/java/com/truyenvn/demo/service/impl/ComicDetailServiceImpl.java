package com.truyenvn.demo.service.impl;

import com.truyenvn.demo.entity.Comic;
import com.truyenvn.demo.entity.ComicDetail;
import com.truyenvn.demo.entity.User;
import com.truyenvn.demo.repository.ComicDetailRepository;
import com.truyenvn.demo.repository.ComicRepository;
import com.truyenvn.demo.service.ComicDetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ComicDetailServiceImpl implements ComicDetailService {

    private final ComicDetailRepository repository;
    private final ComicRepository comicRepository;
    private final UserDetailsService userDetailsService;

    @Override
    public Page<ComicDetail> getAll(Integer page) {
        Pageable comicDetails = PageRequest.of(page, 20);
        return repository.getAll(comicDetails);
    }

    @Override
    public ComicDetail add(String name, String description, MultipartFile file) throws IOException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        Comic comic = new Comic().builder()
                .name(name)
                .image(file.getBytes())
                .description(description)
                .status(1)
                .createdAt(user.getFullName())
                .updatedAt(user.getFullName())
                .dateCreatedAt(new Date())
                .dateUpdatedAt(new Date())
                .build();
        comicRepository.save(comic);
        ComicDetail comicDetail = new ComicDetail();
        comicDetail.setComic(comic);
        comicDetail.setStatus(1);
        comicDetail.setViewed(0);
        comicDetail.setCreatedAt(user.getFullName());
        comicDetail.setUpdatedAt(user.getFullName());
        comicDetail.setDateCreatedAt(new Date());
        comicDetail.setDateUpdatedAt(new Date());
        return repository.save(comicDetail);
    }
}
