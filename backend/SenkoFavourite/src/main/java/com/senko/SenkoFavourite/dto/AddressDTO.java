package com.senko.SenkoFavourite.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AddressDTO {
    private String particular;
    private String ward;
    private String district;
    private String province;
}
