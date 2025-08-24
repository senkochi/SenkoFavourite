package com.senko.SenkoFavourite.service;

import com.senko.SenkoFavourite.model.Image;
import com.senko.SenkoFavourite.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImageService {
    @Autowired
    private ImageRepository imageRepository;

    public List<Image> getCarousel(){
        return imageRepository.findTop5ByMediaTypeOrderByImageIdDesc("image");
    }

    public List<Image> getAllMedia(String mediaType){
        return imageRepository.findByMediaType(mediaType);
    }
}
