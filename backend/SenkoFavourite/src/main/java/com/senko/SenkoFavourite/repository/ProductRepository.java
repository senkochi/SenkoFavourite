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

public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {
    Optional<Product> findBySlug(String slug);
    List<Product> findTop5ByCategoryAndSlugNot(Category category, String slug);
    List<Product> findTop2ByCategoryAndIdLessThanOrderByIdAsc(Category category, Long id);
    List<Product> findTop2ByCategoryAndIdGreaterThanOrderByIdAsc(Category category, Long id);

    @Query("SELECT p FROM Product p WHERE p.category = :category AND p.id NOT IN :excluded ORDER BY p.id DESC")
    List<Product> findTopNByCategoryAndIdNotIn(
            @Param("category") Category category,
            @Param("excluded") List<Long> excluded,
            Pageable pageable
    );

    Page<Product> findByCategory(String categoryId, Pageable pageable);
    Page<Product> findByCategory_IdIn(List<Integer> categoryIds, Pageable pageable);
}
