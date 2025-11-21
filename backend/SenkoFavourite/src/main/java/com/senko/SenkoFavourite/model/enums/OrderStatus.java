package com.senko.SenkoFavourite.model.enums;

public enum OrderStatus {
    PENDING("PENDING"),
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
