package com.senko.SenkoFavourite.dto;


import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BlogDTO {
    private String slug;
    private String thumbnail;
    private String title;
    private String briefContent;
    private String content;
    private LocalDateTime createAt;
    private String creator;
}
