package com.senko.SenkoFavourite.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequestDTO {
    private String paymentMethod;
    private List<OrderDetailDTO> orderDetailList;
}
