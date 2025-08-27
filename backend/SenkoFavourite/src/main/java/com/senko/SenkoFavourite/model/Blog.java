package com.senko.SenkoFavourite.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Blog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "blog_id")
    private int blogId;

    @Column
    private String title;

    @Column
    private String briefContent;

    @Column(columnDefinition = "text")
    private String content;

    @Column
    private String thumbnail;

    @Column
    private String slug;

    @Column(name = "create_at")
    private LocalDateTime createAt;

    @Column
    private String status;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users user;
}
