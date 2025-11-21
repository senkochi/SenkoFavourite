package com.senko.SenkoFavourite.repository;

import com.senko.SenkoFavourite.model.UserOrder;
import com.senko.SenkoFavourite.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<UserOrder, Integer> {

    List<UserOrder> findByUserOrderByCreatedAtDesc(Users user);
    Optional<UserOrder> findByUserAndOrderId(Users user, int orderId);
    UserOrder findByOrderId(int orderId);
    List<UserOrder> findAllByOrderByCreatedAtDesc();
    void deleteByOrderId(int orderId);

    @Query("SELECT COUNT(o) FROM UserOrder o WHERE o.status = 'PENDING'")
    long getOrderNumber();
}
