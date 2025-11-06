package com.senko.SenkoFavourite.controller;

import com.senko.SenkoFavourite.dto.BlogDTO;
import com.senko.SenkoFavourite.dto.BlogRequestDTO;
import com.senko.SenkoFavourite.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/blog")
public class BlogController {
    @Autowired
    private BlogService blogService;

    @GetMapping
    public ResponseEntity<?> getAllBlog(){
        try {
            return ResponseEntity.ok(blogService.getAllBlog("Approved"));
        } catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/admin")
    public ResponseEntity<?> getAllUnapprovedBlog(){
        try {
            return ResponseEntity.ok(blogService.getAllBlog("Unapproved"));
        } catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{slug}")
    public ResponseEntity<?> getBlogBySlug(@PathVariable String slug){
        try {
            return ResponseEntity.ok(blogService.getBlogBySlug(slug));
        } catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> postBlog(@RequestBody BlogRequestDTO dto){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        try {
            blogService.createBlog(dto, username);
            return ResponseEntity.ok("Blog posted successfully!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/admin/approve")
    public ResponseEntity<?> updateBlogStatus(@RequestParam int blogId){
        try {
            blogService.updateBlogStatus(blogId);
            System.out.println("cccccc" + blogId);
            return ResponseEntity.ok("Blog approved/unapproved successfully!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }
}
