package com.senko.SenkoFavourite.repository;

import com.senko.SenkoFavourite.model.VerificationCode;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VerificationCodeRepository extends JpaRepository<VerificationCode, Integer> {
    Optional<VerificationCode> findByEmail(String email);

    Optional<VerificationCode> findByEmailAndCode(String email, String code);
}
