package com.truyenvn.demo.dto;

import com.truyenvn.demo.entity.ComicDetail;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ComicDetailResponse {

    private ComicDetail comicDetail;
    private String imageUrl;
}
