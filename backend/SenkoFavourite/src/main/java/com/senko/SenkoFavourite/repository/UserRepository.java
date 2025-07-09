package com.senko.SenkoFavourite.repository;

import com.senko.SenkoFavourite.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<Users, Integer> {
    Users findByUsername(String username);
}
