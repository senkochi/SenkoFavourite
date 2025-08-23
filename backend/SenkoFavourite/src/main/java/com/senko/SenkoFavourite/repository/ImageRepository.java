package com.senko.SenkoFavourite.repository;

import com.senko.SenkoFavourite.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface ImageRepository extends JpaRepository<Image, Integer>{
    List<Image> findTop5ByOrderByImageIdDesc();
    List<Image> findByMediaType(String mediaType);
}
