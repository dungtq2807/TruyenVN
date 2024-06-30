package com.truyenvn.demo.service;

import com.truyenvn.demo.entity.Category;
import org.springframework.data.domain.Page;

import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.UUID;

public interface CategoryService {

    Page<Category> searchCategories(String code, String category, Integer status, Integer page);

    List<Category> getAll();

    Category getOneCategory(UUID id);

    Category addCategory(Category category);

    Category updateCategory(Category category);
}
