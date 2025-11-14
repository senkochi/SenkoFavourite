package com.senko.SenkoFavourite.dto;

import com.senko.SenkoFavourite.model.enums.PaymentMethod;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderDTO {
    private int orderId;
    private String username;
    private LocalDateTime createdAt;
    private String status;
    private double total;
    private String particular;
    private String ward;
    private String district;
    private String province;
    private PaymentMethod paymentMethod;
}
