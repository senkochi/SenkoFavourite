package com.senko.SenkoFavourite.repository;

import com.senko.SenkoFavourite.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
    Category findByName(String name);
}
