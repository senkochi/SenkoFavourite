package com.senko.SenkoFavourite.security;

public class SecurityEndpoints {
    public static final String frontendURL = "http://localhost:5173";

    public static final String[] GET_ENDPOINTS = {
            "/api/products",
            "/api/products/**",
            "/api/send-register-code",
            "/api/test-email",
            "/api/blog/**"
    };

    public static final String[] POST_ENDPOINTS = {
            "/api/login",
            "/api/register",
            "/api/send-register-code",
            "/api/send-recovery-code",
            "/api/verify-code"
    };

    public static final String[] DELETE_ENDPOINTS = {
            "/api/images/delete"
    };
}
