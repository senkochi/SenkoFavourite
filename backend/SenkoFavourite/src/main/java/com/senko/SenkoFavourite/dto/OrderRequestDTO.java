package com.senko.SenkoFavourite.dto;

import com.senko.SenkoFavourite.model.enums.PaymentMethod;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequestDTO {
    private PaymentMethod paymentMethod;
    private List<OrderDetailDTO> orderDetailList;
}
