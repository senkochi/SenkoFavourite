package com.senko.SenkoFavourite.controller;

import com.senko.SenkoFavourite.dto.CartDetailDTO;
import com.senko.SenkoFavourite.model.CartDetail;
import com.senko.SenkoFavourite.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping
    public List<CartDetailDTO> getAllCartDetailByUsername(){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return cartService.getCartDetailByUsername(username);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addToCart(@RequestBody Map<String, Integer> request){
        int productId = request.get("productId");
        int quantity = request.get("quantity");

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        try{
            String result = cartService.addToCart(username, productId, quantity);
            return ResponseEntity.ok(result);
        }
        catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<?> removeFromCart(@PathVariable int productId){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        try{
            String result = cartService.removeFromCart(username, productId);
            return ResponseEntity.ok(result);
        } catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }
}
