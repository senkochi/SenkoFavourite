package com.senko.SenkoFavourite.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {
    private int id;
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
}
