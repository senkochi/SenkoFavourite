package com.senko.SenkoFavourite.service;

import com.senko.SenkoFavourite.model.Users;
import com.senko.SenkoFavourite.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JwtService {
    @Autowired
    private UserRepository userRepository;

    @Value("${jwt.secret}")
    private String skey;

    public SecretKey getKey(){
        return Keys.hmacShaKeyFor(skey.getBytes());
    }

    public String generateToken(String username){
        Users user = userRepository.findByUsername(username);
        String role = user.getRole();
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", username);
        claims.put("roles", Collections.singletonList(role));
        return buildToken(username, claims);
    }

    public String buildToken(String username, Map<String, Object> claims){
        return Jwts.builder()
                .claims()
                .add(claims)
                .subject(username)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 30))
                .and()
                .signWith(getKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .setSigningKey(getKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public String extractUsername(String token){
        return extractAllClaims(token).getSubject();
    }

    public boolean isTokenValid(String token, UserDetails userDetails){
        final String userName = extractUsername(token);
        return (userName.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    //Kiểm tra Token đã hết hạn chưa
    private boolean isTokenExpired(String token){
        Date experation =  Jwts.parser()
                .setSigningKey(getKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getExpiration();
        return experation.before(new Date()); //Nếu experation(thời gian hết hạn) trước thời gian hiện tại -> tức là đã hết hạn -> trả về true.
    }
}
