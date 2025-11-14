package com.senko.SenkoFavourite.model;

import com.senko.SenkoFavourite.model.enums.ProductCategory;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private int productId;

    private String name;
    private double price;
    private LocalDate releaseDate;
    private String size;
    private String copyRight;
    private int quantity;
    private String material;
    private String imageURL;
    private String slug;
    private String artist;

    @ManyToOne
    @JoinColumn(name = "manufacturer_id")
    private Manufacturer manufacturer;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @OneToMany(mappedBy = "product")
    private List<ProductImage> imageList;
}
