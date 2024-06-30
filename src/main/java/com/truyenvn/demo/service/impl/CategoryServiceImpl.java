package com.truyenvn.demo.service.impl;

import com.truyenvn.demo.entity.Category;
import com.truyenvn.demo.entity.User;
import com.truyenvn.demo.repository.CategoryRepository;
import com.truyenvn.demo.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Random;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository repository;

    @Override
    public Page<Category> searchCategories(String code, String category, Integer status, Integer page) {
        Category probe = Category.builder()
                .code(code)
                .category(category)
                .status(status)
                .build();

        ExampleMatcher matcher = ExampleMatcher.matching()
                .withIgnoreNullValues()
                .withIgnoreCase()
                .withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING);

        Example<Category> example = Example.of(probe, matcher);
        Pageable pageable = PageRequest.of(page, 10, Sort.by(Sort.Direction.ASC, "dateUpdatedAt"));
        return repository.findAll(example, pageable);
    }

    @Override
    public List<Category> getAll() {
        return repository.findAll();
    }

    @Override
    public Category getOneCategory(UUID id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public Category addCategory(Category category) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        int code = new Random().nextInt(1000000000);
        category.setDateUpdatedAt(new Date());
        category.setDateCreatedAt(new Date());
        category.setStatus(1);
        category.setCode("CTGR" + code);
        category.setCreatedAt(user.getFullName());
        category.setUpdatedAt(user.getFullName());
        return repository.save(category);
    }

    @Override
    public Category updateCategory(Category category) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Category existingCategory = repository.findById(category.getId()).orElse(null);

        if (existingCategory != null) {
            existingCategory.setDateUpdatedAt(new Date());
            existingCategory.setUpdatedAt(user.getFullName());
            if (category.getStatus() != null) {
                existingCategory.setStatus(category.getStatus());
            }
            if (category.getCategory() != null) {
                existingCategory.setCategory(category.getCategory());
            }
            return repository.save(existingCategory);
        } else {
            return null;
        }
    }
}
