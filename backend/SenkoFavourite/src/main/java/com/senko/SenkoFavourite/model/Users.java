package com.senko.SenkoFavourite.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private int userId;

    private String username;

    private String password;

    @Column(name = "phone_num")
    private String phoneNum;

    private String email;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "img_URL")
    private String imgURL;

    @Column(name = "create_at")
    private LocalDateTime createAt;

    private String role;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonIgnore
    private Cart cart;  

    @OneToOne(mappedBy = "user")
    private Address address;
}
