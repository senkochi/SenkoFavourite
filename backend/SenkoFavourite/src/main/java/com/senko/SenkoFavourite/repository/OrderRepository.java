package com.senko.SenkoFavourite.repository;

import com.senko.SenkoFavourite.model.UserOrder;
import com.senko.SenkoFavourite.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<UserOrder, Integer> {

    List<UserOrder> findByUser(Users user);
    Optional<UserOrder> findByUserAndOrderId(Users user, int orderId);
}
