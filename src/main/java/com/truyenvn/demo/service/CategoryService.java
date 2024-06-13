package com.truyenvn.demo.service;

import com.truyenvn.demo.entity.Category;

import java.util.List;
import java.util.UUID;

public interface CategoryService {

    List<Category> getAll();

    Category getOneCategory(UUID id);

    Category addCategory(Category category);

    Category updateCategory(Category category);
}
