package com.senko.SenkoFavourite.repository;

import com.senko.SenkoFavourite.model.Category;
import com.senko.SenkoFavourite.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Integer>, JpaSpecificationExecutor<Product> {
    //Optional<Product> findBySlug(String slug);
    Optional<Product> findByProductId(int productId);

    @Query("SELECT p from Product p WHERE p.id IN :included")
    List<Product> findByProductIds(@Param("included") List<Integer> included);

    List<Product> findTop2ByCategoryAndProductIdLessThanOrderByProductIdAsc(Category category, Integer productId);
    List<Product> findTop2ByCategoryAndProductIdGreaterThanOrderByProductIdAsc(Category category, Integer productId);

    @Query("SELECT p FROM Product p WHERE p.category = :category AND p.id NOT IN :excluded ORDER BY p.id DESC")
    List<Product> findTopNByCategoryAndProductIdNotIn(
            @Param("category") Category category,
            @Param("excluded") List<Integer> excluded,
            Pageable pageable
    );

    @Query("SELECT COUNT(p) FROM Product p")
    long getProductTypeQuantity();

    Page<Product> findByCategory_IdIn(List<Integer> categoryIds, Pageable pageable);

    void deleteByProductId(int productId);

    @Query("SELECT p FROM Product p " +
            "LEFT JOIN FETCH p.feedbackList f " + // Lấy Feedback
            "LEFT JOIN FETCH f.user u " +     // Lấy User của Feedback
            "WHERE p.slug = :slug")
    Optional<Product> findBySlug(@Param("slug") String slug);
}
