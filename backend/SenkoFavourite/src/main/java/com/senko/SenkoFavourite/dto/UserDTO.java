package com.senko.SenkoFavourite.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private String username;
    private String fullName;
    private String email;
    private String phoneNum;
}
