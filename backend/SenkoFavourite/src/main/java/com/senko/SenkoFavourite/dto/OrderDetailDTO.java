package com.senko.SenkoFavourite.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetailDTO {
    private String imgURL;
    private int productId;
    private String productName;
    private double price;
    private int quantity;
    private double total;
}
