package com.truyenvn.demo.service;

import com.truyenvn.demo.entity.Category;

import java.util.List;

public interface CategoryService {

    List<Category> getAll();

    Category addCategory(Category category);

    Category updateCategory(Category category);
}
