package com.truyenvn.demo.service.impl;

import com.truyenvn.demo.entity.Follow;
import com.truyenvn.demo.entity.User;
import com.truyenvn.demo.repository.FollowRepository;
import com.truyenvn.demo.service.FollowService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FollowServiceImpl implements FollowService {

    private final FollowRepository repository;

    @Override
    public Page<Follow> getAllComicFollow(Integer page) {
        Pageable pageable = PageRequest.of(page, 20);
        return repository.findAll(pageable);
    }

    @Override
    public Follow followComic(Follow follow) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        follow.setUser(user);
        return repository.save(follow);
    }

    @Override
    public Follow updateChapterHadRead(Follow follow) {
        Follow follow1 = repository.findById(follow.getId()).orElse(null);
        follow1.setChapterReaded(follow.getChapterReaded());
        return repository.save(follow1);
    }

    @Override
    public void unfollowComic(UUID id) {
        repository.deleteById(id);
    }
}
