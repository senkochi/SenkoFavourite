package com.senko.SenkoFavourite.dto;

import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductDTO {
    private int productId;
    private String name;
    private double price;
    private LocalDate releaseDate;
    private String size;
    private String copyRight;
    private int quantity;
    private String manufacturerName;
    private String categoryName;
    private String material;
    private String imageURL;
    private String slug;
    private String artist;
    private List<FeedbackDTO> feedbacks;
}
