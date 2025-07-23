package com.senko.SenkoFavourite.repository;

import com.senko.SenkoFavourite.model.UserOrder;
import com.senko.SenkoFavourite.model.OrderDetail;
import com.senko.SenkoFavourite.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, Integer> {
    List<OrderDetail> findByOrder(UserOrder order);
    Optional<OrderDetail> findByOrderAndProduct(UserOrder order, Product product);
}
