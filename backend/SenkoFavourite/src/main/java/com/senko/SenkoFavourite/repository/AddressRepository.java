package com.senko.SenkoFavourite.repository;

import com.senko.SenkoFavourite.model.Address;
import com.senko.SenkoFavourite.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AddressRepository extends JpaRepository<Address, Integer> {
    Optional<Address> findByUser(Users user);
}
