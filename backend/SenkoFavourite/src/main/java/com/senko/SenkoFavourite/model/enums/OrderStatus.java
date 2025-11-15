package com.senko.SenkoFavourite.model.enums;

public enum OrderStatus {
    COD("COD"),
    VNPAY("VNPAY"),
    CONFIRMED("CONFIRMED"),
    DELIVERING("DELIVERING"),
    DELIVERED("DELIVERED"),
    CANCELLED("CANCELLED");

    private final String displayValue;

    OrderStatus(String status){
        this.displayValue = status;
    }

    public String getDisplayValue(){
        return displayValue;
    }
}
