package com.senko.SenkoFavourite.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StatisticDTO {
    private long productQuantity;
    private long waitingOrders;
    private long blogRequests;
}
