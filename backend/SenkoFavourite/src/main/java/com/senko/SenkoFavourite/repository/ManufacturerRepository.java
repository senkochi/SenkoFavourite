package com.senko.SenkoFavourite.repository;

import com.senko.SenkoFavourite.model.Manufacturer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ManufacturerRepository extends JpaRepository<Manufacturer, Integer> {
    Manufacturer findByName(String name);
}
