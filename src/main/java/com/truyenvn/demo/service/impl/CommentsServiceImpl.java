package com.truyenvn.demo.service.impl;

import com.truyenvn.demo.dto.CommentResponse;
import com.truyenvn.demo.dto.CommentsResponse;
import com.truyenvn.demo.dto.UserResponse;
import com.truyenvn.demo.entity.Comments;
import com.truyenvn.demo.entity.User;
import com.truyenvn.demo.repository.CommentsRepository;
import com.truyenvn.demo.service.CommentsService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Random;
import java.util.UUID;


@Service
@RequiredArgsConstructor
public class CommentsServiceImpl implements CommentsService {

    private final CommentsRepository repository;

    @Override
    public Page<CommentsResponse> getAllCommentsByComic(UUID id, Integer page) {
        Pageable pageable = PageRequest.of(page, 20);
        Page<Comments> commentsPage = repository.getAllCommentsByComic(id, pageable);

        // Lấy người dùng hiện tại từ ngữ cảnh bảo mật
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User loggedInUser = (User) authentication.getPrincipal();

        return commentsPage.map(comment -> {
            User commentUser = comment.getUser(); // Người dùng tạo ra bình luận
            UserResponse userResponse = new UserResponse(
                    commentUser.getId(),
                    commentUser.getUsername(),
                    commentUser.getFirstName(),
                    commentUser.getLastName(),
                    commentUser.getAvatar(),
                    commentUser.getRole()
            );

            // So sánh ID của người dùng bình luận với ID của người dùng đăng nhập
            boolean canEdit = commentUser.getId().equals(loggedInUser.getId());

            return new CommentsResponse(
                    userResponse,
                    comment.getId(),
                    comment.getCode(),
                    comment.getComments(),
                    comment.getStatus(),
                    comment.getCreatedAt(),
                    comment.getUpdatedAt(),
                    comment.getDateCreatedAt(),
                    comment.getDateUpdatedAt(),
                    canEdit
            );
        });
    }

    @Override
    public Page<CommentResponse> searchComments(String code, String comments, Integer status, Integer page) {
        Comments probe = Comments.builder()
                .code(code)
                .comments(comments)
                .status(status)
                .build();

        ExampleMatcher matcher = ExampleMatcher.matching()
                .withIgnoreNullValues()
                .withIgnoreCase()
                .withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING);

        Example<Comments> example = Example.of(probe, matcher);

        Pageable pageable = PageRequest.of(page, 20, Sort.by(Sort.Direction.ASC, "dateUpdatedAt"));

        Page<Comments> commentsPage = repository.findAll(example, pageable);

        return commentsPage.map(this::convertToCommentResponse);
    }

    private CommentResponse convertToCommentResponse(Comments comments) {
        return CommentResponse.builder()
                .id(comments.getId())
                .code(comments.getCode())
                .comments(comments.getComments())
                .status(comments.getStatus())
                .createdAt(comments.getCreatedAt())
                .updatedAt(comments.getUpdatedAt())
                .dateCreatedAt(comments.getDateCreatedAt())
                .dateUpdatedAt(comments.getDateUpdatedAt())
                .build();
    }


    @Override
    public CommentsResponse getOneComment(UUID id) {
        Comments comment = repository.findById(id).orElse(null);
        User commentUser = comment.getUser(); // Người dùng tạo ra bình luận
        UserResponse userResponse = new UserResponse(
                commentUser.getId(),
                commentUser.getUsername(),
                commentUser.getFirstName(),
                commentUser.getLastName(),
                commentUser.getAvatar(),
                commentUser.getRole()
        );

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User loggedInUser = (User) authentication.getPrincipal();
        // So sánh ID của người dùng bình luận với ID của người dùng đăng nhập
        boolean canEdit = commentUser.getId().equals(loggedInUser.getId());

        return new CommentsResponse(
                userResponse,
                comment.getId(),
                comment.getCode(),
                comment.getComments(),
                comment.getStatus(),
                comment.getCreatedAt(),
                comment.getUpdatedAt(),
                comment.getDateCreatedAt(),
                comment.getDateUpdatedAt(),
                canEdit
        );
    }

    @Override
    public Comments addComment(Comments comments) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        int code = new Random().nextInt(1000000000);
        comments.setCode("CM" + code);
        comments.setStatus(1);
        comments.setDateUpdatedAt(new Date());
        comments.setDateCreatedAt(new Date());
        comments.setCreatedAt(user.getFullName());
        comments.setUpdatedAt(user.getFullName());
        comments.setUser(user);
        return repository.save(comments);
    }

    @Override
    public Comments updateComment(Comments comments) {
        Comments comment = repository.findById(comments.getId()).orElse(null);
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        comment.setDateUpdatedAt(new Date());
        comment.setDateCreatedAt(new Date());
        comment.setUpdatedAt(user.getFullName());
        comment.setCreatedAt(user.getFullName());
        comment.setUser(comment.getUser());
        if (comments.getStatus() != null) {
            comment.setStatus(comments.getStatus());
        }
        if (comments.getComments() != null) {
            comment.setComments(comments.getComments());
        }
        return repository.save(comment);
    }

    @Override
    public void deleteComment(UUID id) {
        repository.deleteById(id);
    }
}
