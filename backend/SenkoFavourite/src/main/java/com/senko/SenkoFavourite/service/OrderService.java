package com.senko.SenkoFavourite.service;

import com.senko.SenkoFavourite.dto.OrderDTO;
import com.senko.SenkoFavourite.dto.OrderDetailDTO;
import com.senko.SenkoFavourite.exception.types.InvalidStatus;
import com.senko.SenkoFavourite.exception.types.NotFoundException;
import com.senko.SenkoFavourite.model.*;
import com.senko.SenkoFavourite.model.enums.OrderStatus;
import com.senko.SenkoFavourite.model.enums.PaymentMethod;
import com.senko.SenkoFavourite.repository.*;
import jakarta.transaction.Transactional;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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

    public List<OrderDTO> getAllOrder(){
        return orderRepository.findAllByOrderByCreatedAtDesc().stream().map(order -> new OrderDTO(
                order.getOrderId(),
                order.getUser().getUsername(),
                order.getCreatedAt(),
                order.getStatus().getDisplayValue(),
                order.getTotal(),
                order.getUser().getAddress().getParticular(),
                order.getUser().getAddress().getWard(),
                order.getUser().getAddress().getDistrict(),
                order.getUser().getAddress().getProvince(),
                order.getPaymentMethod(),
                false
        )).toList();
    }

    public List<OrderDTO> getOrderByUsername(String username){
        Users user = userRepository.findByUsername(username);
        Address address = user.getAddress();

        return orderRepository.findByUserOrderByCreatedAtDesc(user).stream().map(order -> new OrderDTO(
                order.getOrderId(),
                order.getUser().getUsername(),
                order.getCreatedAt(),
                order.getStatus().getDisplayValue(),
                order.getTotal(),
                address.getParticular(),
                address.getWard(),
                address.getDistrict(),
                address.getProvince(),
                order.getPaymentMethod(),
                false
        )).toList();
    }

    public UserOrder getOrderByOrderId(int orderId){
        return orderRepository.findByOrderId(orderId);
    }

    public UserOrder saveOrder(UserOrder order){
        return orderRepository.save(order);
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
    public UserOrder createUserOrder(String username, PaymentMethod paymentMethod, List<OrderDetailDTO> orderDetailList) throws Exception {
        Users user = userRepository.findByUsername(username);
        if(!user.canOrder()){
            throw new Exception("Vui lòng kiểm tra lại họ tên, số điện thoại và địa chỉ!");
        }

        OrderStatus status = OrderStatus.PENDING;

        UserOrder order = UserOrder.builder()
                .user(user)
                .createdAt(LocalDateTime.now())
                .total(0)
                .status(status)
                .paymentMethod(paymentMethod)
                .address(user.getAddress().toString())
                .reviewed(false)
                .build();

        double totalAmount = 0;

        for(OrderDetailDTO detail : orderDetailList){
            Product product = productRepository.findByProductId(detail.getProductId()).orElseThrow(() -> new NotFoundException("Product not found"));
            product.setQuantity(product.getQuantity() - detail.getQuantity());
            productRepository.save(product);
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

    @Transactional
    public UserOrder updateOrderStatus(int orderId, String status){
        UserOrder order = orderRepository.findByOrderId(orderId);
        if (order == null) throw new NotFoundException("Order not found");

        OrderStatus newStatus;
        try {
            newStatus = OrderStatus.valueOf(status);
        } catch (Exception ex) {
            throw new InvalidStatus("Invalid status: " + status);
        }

        OrderStatus prevStatus = order.getStatus();
        if(newStatus == prevStatus) { return order; }

        if (newStatus == OrderStatus.CANCELLED){
            List<Integer> productIds = order.getOrderDetails().stream().map(orderDetail -> {
                return orderDetail.getProduct().getProductId();
            }).toList();

            Map<Integer, Integer> productReturnStock = order.getOrderDetails().stream()
                    .collect(Collectors.toMap(od -> od.getProduct().getProductId(), OrderDetail::getQuantity));

            if(!productReturnStock.isEmpty()){
                List<Product> products = productRepository.findByProductIds(new ArrayList<>(productReturnStock.keySet()));
                for(Product p : products){
                    Integer add = productReturnStock.get(p.getProductId());
                    p.setQuantity(add + p.getQuantity());
                }
                productRepository.saveAll(products);
            }
        }
        order.setStatus(newStatus);
        return orderRepository.save(order);
    }

}
