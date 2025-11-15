package com.senko.SenkoFavourite.controller;

import com.senko.SenkoFavourite.dto.OrderDTO;
import com.senko.SenkoFavourite.dto.OrderDetailDTO;
import com.senko.SenkoFavourite.dto.OrderRequestDTO;
import com.senko.SenkoFavourite.model.UserOrder;
import com.senko.SenkoFavourite.model.enums.OrderStatus;
import com.senko.SenkoFavourite.service.CartService;
import com.senko.SenkoFavourite.service.OrderService;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/order")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @Autowired
    private CartService cartService;

    @GetMapping("/admin")
    public ResponseEntity<?> getAllOrder(){
        try {
            List<OrderDTO> orderDTOList = orderService.getAllOrder();
            return ResponseEntity.ok(orderDTOList);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/user")
    public ResponseEntity<?> getOrderList(){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        List<OrderDTO> orderList = orderService.getOrderByUsername(username);

        return ResponseEntity.ok(orderList);
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<?> getOrderDetailList(@PathVariable int id){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        List<OrderDetailDTO> orderDetailList = orderService.getOrderDetailByOrder(username, id);

        return ResponseEntity.ok(orderDetailList);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createUserOrder(@RequestBody OrderRequestDTO request){
        try {
            String username = SecurityContextHolder.getContext().getAuthentication().getName();
            UserOrder order = orderService.createUserOrder(username,
                    request.getPaymentMethod(),
                    request.getOrderDetailList());
            for(OrderDetailDTO dto : request.getOrderDetailList()){
                cartService.removeFromCart(username, dto.getProductId());
            }
            return ResponseEntity.ok(order);
        } catch (Exception e){
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }

    }

    @PutMapping("/admin/update-status")
    public ResponseEntity<?> updateOrderStatus(@RequestParam("orderId") int orderId,
                                               @RequestParam("status") String status){
        try{
            System.out.println("cccc" + orderId + "fefe" + status);
            orderService.updateOrderStatus(orderId, status);
            return ResponseEntity.ok("Order status updated");
        } catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }
}
