package com.senko.SenkoFavourite.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_image_id")
    private int productImageId;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @Column
    private String url;

    @Column(name="alt_text")
    private String altText;

    @Column(name = "display_order")
    private int displayOrder;
}
