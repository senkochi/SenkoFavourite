package com.senko.SenkoFavourite.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class YoutubeVideoDTO {
    private String videoId;
    private String title;
    private String thumbnail;
}
