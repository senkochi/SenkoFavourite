package com.senko.SenkoFavourite.service;

import com.senko.SenkoFavourite.dto.YoutubeVideoDTO;
import com.senko.SenkoFavourite.model.Image;
import com.senko.SenkoFavourite.repository.ImageRepository;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
public class YoutubeService {
    @Value("${youtube.api.key}")
    private String apiKey;

    @Autowired
    private ImageRepository imageRepository;

    public List<YoutubeVideoDTO> getVideoInfo() {
        List<Image> videos = imageRepository.findByMediaType("video");
        List<YoutubeVideoDTO> youtubeVideos = new ArrayList<>();
        for (Image video : videos) {
            String videoId = video.getImageUrl();
            String url = "https://www.googleapis.com/youtube/v3/videos?part=snippet&id=" + videoId + "&key=" + apiKey;
            RestTemplate restTemplate = new RestTemplate();
            String response = restTemplate.getForObject(url, String.class); //gửi api request để lấy data
            JSONObject json = new JSONObject(response);
            JSONObject snippet = json.getJSONArray("items").getJSONObject(0).getJSONObject("snippet"); //lấy snippet từ api response

            String title = snippet.getString("title");
            String thumbnail = snippet.getJSONObject("thumbnails").getJSONObject("high").getString("url");
            youtubeVideos.add(new YoutubeVideoDTO(videoId, title, thumbnail));
        }
        return youtubeVideos;
    }
}
