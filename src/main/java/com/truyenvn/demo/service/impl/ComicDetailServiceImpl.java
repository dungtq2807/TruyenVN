package com.truyenvn.demo.service.impl;

import com.truyenvn.demo.entity.Comic;
import com.truyenvn.demo.entity.ComicDetail;
import com.truyenvn.demo.entity.User;
import com.truyenvn.demo.repository.ComicDetailRepository;
import com.truyenvn.demo.repository.ComicRepository;
import com.truyenvn.demo.service.ComicDetailService;
import jakarta.persistence.EntityNotFoundException;
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
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ComicDetailServiceImpl implements ComicDetailService {

    private final ComicDetailRepository repository;
    private final ComicRepository comicRepository;
    private final UserDetailsService userDetailsService;

    @Override
    public Page<Comic> getAll(Integer page) {
        Pageable comicDetails = PageRequest.of(page, 20);
        Page<Comic> details = comicRepository.findAll(comicDetails);
        return details;
    }

    @Override
    public Comic findOneByIdComic(UUID id) {
        return comicRepository.findById(id).orElse(null);
    }

    @Override
    public List<ComicDetail> findByIdComic(UUID id) {
        return repository.findAllByIdComic(id);
    }

    @Override
    public List<ComicDetail> addComicDetail(List<ComicDetail> comicDetails) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        comicDetails.forEach(comicDetail -> {
            comicDetail.setComic(comicDetail.getComic());
            comicDetail.setCategory(comicDetail.getCategory());
            comicDetail.setStatus(1);
            comicDetail.setCreatedAt(user.getFullName());
            comicDetail.setUpdatedAt(user.getFullName());
            comicDetail.setDateCreatedAt(new Date());
            comicDetail.setDateUpdatedAt(new Date());
        });
        return repository.saveAll(comicDetails);
    }


    @Override
    public ComicDetail updateComicDetail(ComicDetail comicDetail) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        ComicDetail comicDetail1 = repository.findById(comicDetail.getId()).orElse(null);
        if (comicDetail == null) {
            throw new EntityNotFoundException("ComicDetail not found");
        }
        if(comicDetail.getComic() != null){
            comicDetail1.setComic(comicDetail.getComic());
        }
        if(comicDetail.getCategory() != null){
            comicDetail1.setCategory(comicDetail.getCategory());
        }
        if(comicDetail.getStatus() != null){
            comicDetail1.setStatus(comicDetail.getStatus());
        }
        comicDetail1.setUpdatedAt(user.getFullName());
        comicDetail1.setDateUpdatedAt(new Date());
        return repository.save(comicDetail1);
    }

    @Override
    public Comic addComic(String name, String description, MultipartFile file) throws IOException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        Comic comic = new Comic().builder()
                .user(user)
                .name(name)
                .image(file.getBytes())
                .description(description)
                .viewed(0)
                .status(1)
                .createdAt(user.getFullName())
                .updatedAt(user.getFullName())
                .dateCreatedAt(new Date())
                .dateUpdatedAt(new Date())
                .build();
        return comicRepository.save(comic);
    }

    @Override
    public Comic updateComic(UUID id, String name, String description, MultipartFile file,Integer viewed, Integer status) throws IOException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        Comic comic = comicRepository.findById(id).orElse(null);
        if (comic == null) {
            throw new EntityNotFoundException("Comic not found");
        }
        if(name != null){
            comic.setName(name);
        }
        if (file != null && !file.isEmpty()) {
            comic.setImage(file.getBytes());
        }
        if(description != null){
            comic.setDescription(description);
        }
        if(status != null){
            comic.setStatus(status);
        }
        if(viewed != null){
            comic.setViewed(viewed);
        }
        comic.setUpdatedAt(user.getFullName());
        comic.setDateUpdatedAt(new Date());
        return comicRepository.save(comic);
    }

}
