package com.senko.SenkoFavourite.repository;

import com.senko.SenkoFavourite.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<Users, Integer> {
    Users findByUsername(String username);
    Optional<Users> findByEmail(String email);
}
