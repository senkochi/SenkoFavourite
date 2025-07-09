package com.senko.SenkoFavourite.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "users")
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String username;

    private String password;

    private String phoneNum;

    private String email;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "img_URL")
    private String imgURL;

    @Column(name = "create_at")
    private LocalDateTime createAt;

    private String role;
}
