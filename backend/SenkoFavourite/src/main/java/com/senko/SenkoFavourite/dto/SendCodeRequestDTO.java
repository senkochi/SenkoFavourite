package com.senko.SenkoFavourite.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SendCodeRequestDTO {
    private String email;
}
