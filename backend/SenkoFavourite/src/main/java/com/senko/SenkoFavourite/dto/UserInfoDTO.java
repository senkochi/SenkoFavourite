package com.senko.SenkoFavourite.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserInfoDTO {
    private String fullName;
    private String phoneNum;
    private String province;
    private String district;
    private String ward;
    private String particular;
}
