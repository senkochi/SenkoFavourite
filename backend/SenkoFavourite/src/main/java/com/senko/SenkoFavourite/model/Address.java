package com.senko.SenkoFavourite.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int addressId;

    @Column
    private String particular;

    @Column
    private String ward;

    @Column
    private String district;

    @Column
    private String province;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users user;


}
