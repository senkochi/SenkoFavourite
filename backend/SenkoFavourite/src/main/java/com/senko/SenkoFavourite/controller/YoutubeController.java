package com.senko.SenkoFavourite.controller;

import com.senko.SenkoFavourite.dto.YoutubeVideoDTO;
import com.senko.SenkoFavourite.service.YoutubeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/youtube")
public class YoutubeController {
    @Autowired
    private YoutubeService youtubeService;

    @GetMapping("/all")
    public ResponseEntity<?> getAllVideo(){
        try{
            List<YoutubeVideoDTO> youtubeVideo = youtubeService.getVideoInfo();
            return ResponseEntity.ok(youtubeVideo);
        } catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }
}
