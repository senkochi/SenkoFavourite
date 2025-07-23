package com.senko.SenkoFavourite.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderDTO {
    private int orderId;
    private LocalDateTime createdAt;
    private String status;
    private double total;
    private String particular;
    private String ward;
    private String district;
    private String province;
    private String paymentMethod;
}
