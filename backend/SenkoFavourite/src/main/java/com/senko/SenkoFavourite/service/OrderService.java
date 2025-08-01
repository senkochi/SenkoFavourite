package com.senko.SenkoFavourite.service;

import com.senko.SenkoFavourite.dto.OrderDTO;
import com.senko.SenkoFavourite.dto.OrderDetailDTO;
import com.senko.SenkoFavourite.model.*;
import com.senko.SenkoFavourite.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private ProductRepository productRepository;

    public List<OrderDTO> getOrderByUsername(String username){
        Users user = userRepository.findByUsername(username);
        Address address = addressRepository.findByUser(user).orElse(null);

        return orderRepository.findByUser(user).stream().map(order -> new OrderDTO(
                order.getOrderId(),
                order.getCreatedAt(),
                order.getStatus(),
                order.getTotal(),
                address.getParticular(),
                address.getWard(),
                address.getDistrict(),
                address.getProvince(),
                order.getPaymentMethod()
        )).toList();
    }


    public List<OrderDetailDTO> getOrderDetailByOrder(String username, int orderId){
        Users user = userRepository.findByUsername(username);
        UserOrder order = orderRepository.findByUserAndOrderId(user, orderId).orElse(null);

        return orderDetailRepository.findByOrder(order).stream().map(orderDetail -> new OrderDetailDTO(
                orderDetail.getProduct().getImageURL(),
                orderDetail.getProduct().getProductId(),
                orderDetail.getProduct().getName(),
                orderDetail.getProduct().getPrice(),
                orderDetail.getQuantity(),
                orderDetail.getProduct().getPrice() * orderDetail.getQuantity()
        )).toList();
    }

    @Transactional
    public UserOrder createUserOrder(String username, String paymentMethod, List<OrderDetailDTO> orderDetailList){
        Users user = userRepository.findByUsername(username);

        UserOrder order = UserOrder.builder()
                .user(user)
                .createdAt(LocalDateTime.now())
                .total(0)
                .status("Processing")
                .paymentMethod(paymentMethod)
                .build();

        double totalAmount = 0;

        for(OrderDetailDTO detail : orderDetailList){
            Product product = productRepository.findByProductId(detail.getProductId());
            OrderDetail orderDetail = OrderDetail.builder()
                    .product(product)
                    .quantity(detail.getQuantity())
                    .build();
            totalAmount += product.getPrice() * detail.getQuantity() + 2; //Shipping fee is $2 for each kind
            order.addOrderDetail(orderDetail);
        }

        order.setTotal(totalAmount);
        return orderRepository.save(order);
    }
}
