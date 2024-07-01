package com.truyenvn.demo.service;

import com.truyenvn.demo.dto.CommentResponse;
import com.truyenvn.demo.dto.CommentsResponse;
import com.truyenvn.demo.entity.Comments;
import org.springframework.data.domain.Page;

import java.util.UUID;

public interface CommentsService {

    Page<CommentsResponse> getAllCommentsByComic(UUID id, Integer page);

    Page<CommentResponse> searchComments(String code, String comments, Integer status, Integer page);

    CommentsResponse getOneComment(UUID id);

    Comments addComment(Comments comments);

    Comments updateComment(Comments comments);

    void deleteComment(UUID id);
}
