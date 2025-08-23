package com.senko.SenkoFavourite.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecoverRequestDTO {
    private String email;
    private String verificationCode;
    private String password;
}
