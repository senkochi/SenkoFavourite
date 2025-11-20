package com.senko.SenkoFavourite.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FeedbackDTO {
    private int productId;
    private float rating;
    private LocalDateTime createdAt;
    private String content;
    private UserDTO user;
}
