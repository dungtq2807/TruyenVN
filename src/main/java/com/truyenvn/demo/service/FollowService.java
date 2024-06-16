package com.truyenvn.demo.service;

import com.truyenvn.demo.entity.Follow;
import org.springframework.data.domain.Page;

import java.util.UUID;

public interface FollowService {

    Page<Follow> getAllComicFollow(Integer page);

    Follow followComic(Follow follow);

    Follow updateChapterHadRead(Follow follow);

    void unfollowComic(UUID id);
}
