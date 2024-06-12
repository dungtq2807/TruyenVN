package com.truyenvn.demo.dto;

import com.truyenvn.demo.entity.Comic;
import com.truyenvn.demo.entity.ComicDetail;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ComicDetailResponse {

    private Comic comic;
    private List<ComicDetail> listCategory;
    private String imageUrl;
}
