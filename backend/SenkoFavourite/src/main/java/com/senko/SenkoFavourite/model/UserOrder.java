package com.senko.SenkoFavourite.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private int orderId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users user;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column
    private double total;

    @Column
    private String status;

    @Column(name = "payment_method")
    private String paymentMethod;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderDetail> orderDetails;

    // Helper methods để quản lý mối quan hệ hai chiều (khuyến nghị)
    public void addOrderDetail(OrderDetail detail) {
        if (this.orderDetails == null) {
            this.orderDetails = new ArrayList<>();
        }
        this.orderDetails.add(detail);
        detail.setOrder(this); // <-- ĐẶT MỐI QUAN HỆ Ở PHÍA SỞ HỮU
    }

    public void removeOrderDetail(OrderDetail detail) {
        if (this.orderDetails != null) {
            this.orderDetails.remove(detail);
            detail.setOrder(null); // <-- Gỡ bỏ mối quan hệ
        }
    }
}
