package com.senko.SenkoFavourite.security;

public class SecurityEndpoints {
    public static final String frontendURL = "http://localhost:5173";

    public static final String[] GET_ENDPOINTS = {
            "/api/products",
            "/api/products/**",
            "/api/send-register-code",
            "/api/test-email",
            "/api/blog/**",
            "/api/gallery/carousel",
            "/api/gallery/all/image",
            "/api/gallery/all/video"
    };

    public static final String[] POST_ENDPOINTS = {
            "/api/login",
            "/api/register",
            "/api/send-register-code",
            "/api/send-recovery-code",
            "/api/verify-code",
            "/api/user/reset-password",
            "/api/payment/vnpay/ipn"
    };

    public static final String[] DELETE_ENDPOINTS = {
            "/api/images/delete"
    };

    public static final String[] PUT_ENDPOINTS = {
            "/api/user/reset-password"
    };

    public static final String[] ADMIN_GET_ENDPOINTS = {
            "/api/order/admin"
    };
}
