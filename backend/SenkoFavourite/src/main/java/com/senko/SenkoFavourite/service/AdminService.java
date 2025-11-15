package com.senko.SenkoFavourite.service;

import com.senko.SenkoFavourite.dto.StatisticDTO;
import com.senko.SenkoFavourite.repository.BlogRepository;
import com.senko.SenkoFavourite.repository.OrderRepository;
import com.senko.SenkoFavourite.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private BlogRepository blogRepository;

    public StatisticDTO getStatistics(){
        return StatisticDTO.builder()
                .productQuantity(productRepository.getProductTypeQuantity())
                .blogRequests(blogRepository.getUnapprovedQuantity())
                .waitingOrders(orderRepository.getOrderNumber())
                .build();
    }
}
