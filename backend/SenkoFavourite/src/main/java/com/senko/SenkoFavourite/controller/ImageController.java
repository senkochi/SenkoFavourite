package com.senko.SenkoFavourite.controller;

import com.senko.SenkoFavourite.model.Image;
import com.senko.SenkoFavourite.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/gallery")
@CrossOrigin(origins = "*")
public class ImageController {
    @Autowired
    private ImageService imageService;

    @GetMapping("/carousel")
    public ResponseEntity<?> getCarousel(){
        try{
            List<Image> imageList = imageService.getCarousel();
            return ResponseEntity.ok(imageList);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/all/image")
    public ResponseEntity<?> getAllImage(){
        try{
            List<Image> imageList = imageService.getAllMedia("image");
            return ResponseEntity.ok(imageList);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/all/video")
    public ResponseEntity<?> getAllVideo(){
        try{
            List<Image> imageList = imageService.getAllMedia("video");
            return ResponseEntity.ok(imageList);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
