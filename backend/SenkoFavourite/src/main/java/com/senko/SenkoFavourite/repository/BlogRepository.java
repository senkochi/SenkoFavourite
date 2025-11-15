package com.senko.SenkoFavourite.repository;

import com.senko.SenkoFavourite.model.Blog;
import com.senko.SenkoFavourite.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface BlogRepository extends JpaRepository<Blog, Integer> {
    Optional<Blog> findBySlug(String slug);
    List<Blog> findAllByStatusOrderByCreateAtDesc(String status);
    List<Blog> findByUser(Users user);
    Optional<Blog> findByUserAndBlogId(Users user, int blogId);
    Blog findByBlogId(int blogId);

    @Query("SELECT COUNT(b) FROM Blog b WHERE b.status = 'Unapproved'")
    long getUnapprovedQuantity();
}
