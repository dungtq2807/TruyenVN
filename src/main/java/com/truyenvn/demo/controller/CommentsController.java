package com.truyenvn.demo.controller;

import com.truyenvn.demo.dto.ErrorResponse;
import com.truyenvn.demo.dto.SuccessResponse;
import com.truyenvn.demo.entity.Comments;
import com.truyenvn.demo.service.impl.CommentsServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/comments")
@RequiredArgsConstructor
public class CommentsController {

    private final CommentsServiceImpl service;

    @GetMapping("getAll/{id}")
    private ResponseEntity getAllCommentsByComic(@PathVariable UUID id, @RequestParam(defaultValue = "0") Integer page) {
        try {
            return new ResponseEntity<>(new SuccessResponse("Success", service.getAllCommentsByComic(id, page)), HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(new ErrorResponse("Error", ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("get-one-comment/{id}")
    private ResponseEntity getOneComment(@PathVariable UUID id) {
        try {
            return new ResponseEntity<>(new SuccessResponse("Success", service.getOneComment(id)), HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(new ErrorResponse("Error", ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("add-comment")
    private ResponseEntity addComment(@RequestBody Comments comments) {
        try {
            return new ResponseEntity<>(new SuccessResponse("Success", service.addComment(comments)), HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(new ErrorResponse("Error", ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("update-comment")
    private ResponseEntity<?> updateComment(@RequestBody Comments comments) {
        try {
            Comments updatedComment = service.updateComment(comments);
            return new ResponseEntity<>(new SuccessResponse("Success", updatedComment), HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(new ErrorResponse("Error", ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("delete-comment/{id}")
    private ResponseEntity deleteComment(@PathVariable UUID id) {
        try {
            service.deleteComment(id);
            return new ResponseEntity<>(new SuccessResponse().builder().status("Success").build(), HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(new ErrorResponse("Error", ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
