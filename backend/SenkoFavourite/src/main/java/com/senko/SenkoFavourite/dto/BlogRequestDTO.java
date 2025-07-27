package com.senko.SenkoFavourite.dto;


import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BlogRequestDTO {
    private String title;
    private String briefContent;
    private String content;
    private String thumbnail;
    private String slug;
}
