package com.senko.SenkoFavourite.model.enums;

public enum ProductCategory {
    MANGA("Manga"),
    ACCESSORIES("Clothing and Accessories"),
    FIGURE("Figure");

    private final String displayValue;

    ProductCategory(String displayValue){
        this.displayValue = displayValue;
    }

    public String getDisplayValue(){
        return this.displayValue;
    }
}
