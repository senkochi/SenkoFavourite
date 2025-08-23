package com.senko.SenkoFavourite.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VNPayRequestDTO {
    private long amount;
    private String orderInfo;
    private String orderType;
    private String locale;
    private List<OrderDetailDTO> orderDetailList;
    private String ipAddr;
}
