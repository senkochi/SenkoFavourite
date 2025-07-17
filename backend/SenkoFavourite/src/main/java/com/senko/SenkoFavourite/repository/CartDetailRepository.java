package com.senko.SenkoFavourite.repository;

import com.senko.SenkoFavourite.model.Cart;
import com.senko.SenkoFavourite.model.CartDetail;
import com.senko.SenkoFavourite.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CartDetailRepository extends JpaRepository<CartDetail, Integer> {
    List<CartDetail> findByCart(Cart cart);

    Optional<CartDetail> findByCartAndProduct(Cart cart, Product product);
}
