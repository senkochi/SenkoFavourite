package com.senko.SenkoFavourite.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CartDetailDTO {
    private int productId;
    private String productName;
    private String imgURL;
    private double price;
    private int quantity;
}
