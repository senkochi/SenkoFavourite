package com.senko.SenkoFavourite.service;

import com.senko.SenkoFavourite.dto.BlogDTO;
import com.senko.SenkoFavourite.dto.BlogRequestDTO;
import com.senko.SenkoFavourite.model.Blog;
import com.senko.SenkoFavourite.model.Users;
import com.senko.SenkoFavourite.repository.BlogRepository;
import com.senko.SenkoFavourite.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BlogService {
    @Autowired
    private BlogRepository blogRepository;

    @Autowired
    private UserRepository userRepository;

    public List<BlogDTO> getAllBlog(){
        return blogRepository.findAll().stream().map(blog -> new BlogDTO(
                blog.getSlug(),
                blog.getThumbnail(),
                blog.getTitle(),
                blog.getBriefContent(),
                blog.getContent(),
                blog.getCreateAt(),
                blog.getUser().getFullName(),
                blog.getUser().getImgURL()
        )).toList();
    }

    public BlogDTO getBlogBySlug(String slug){
        Blog blog = blogRepository.findBySlug(slug).orElse(null);
        return BlogDTO.builder()
                .title(blog.getTitle())
                .slug(blog.getSlug())
                .content(blog.getContent())
                .briefContent(blog.getBriefContent())
                .creator(blog.getUser().getFullName())
                .creatorAvatar(blog.getUser().getImgURL())
                .thumbnail(blog.getThumbnail())
                .createAt(blog.getCreateAt())
                .build();
    }

    public Blog createBlog(BlogRequestDTO dto, String username){
        Users user = userRepository.findByUsername(username);
        Blog blog = Blog.builder()
                .user(user)
                .title(dto.getTitle())
                .briefContent(dto.getBriefContent())
                .content(dto.getContent())
                .thumbnail(dto.getThumbnail())
                .createAt(LocalDateTime.now())
                .slug(dto.getSlug())
                .build();
        return blogRepository.save(blog);
    }
}
