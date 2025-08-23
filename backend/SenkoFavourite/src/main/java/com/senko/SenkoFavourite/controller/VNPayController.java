package com.senko.SenkoFavourite.controller;

import com.senko.SenkoFavourite.config.VNPayConfig;
import com.senko.SenkoFavourite.dto.VNPayRequestDTO;
import com.senko.SenkoFavourite.model.UserOrder;
import com.senko.SenkoFavourite.service.OrderService;
import com.senko.SenkoFavourite.service.VNPayService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
@RequestMapping("/api/payment/vnpay")
public class VNPayController {
    @Autowired
    private VNPayService vnpayService;

    @Autowired
    private VNPayConfig vnPayConfig;

    @Autowired
    private OrderService orderService;

    @PostMapping("/create-url")
    public Map<String, String> createVnpayUrl(@RequestBody VNPayRequestDTO orderInfo, HttpServletRequest request) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Map<String, String> result = new HashMap<>();
        try {
            orderInfo.setIpAddr(request.getRemoteAddr());
            String url = vnpayService.createPaymentUrl(orderInfo, username);
            result.put("url", url);
        } catch (Exception e) {
            result.put("error", e.getMessage());
            e.printStackTrace();
        }
        return result;
    }

    @PostMapping("/ipn")
    public ResponseEntity<?> handleVnpayIpn(HttpServletRequest request) {
        Map<String, String> fields = new HashMap<>();
        for (Enumeration<String> params = request.getParameterNames(); params.hasMoreElements();){
            String paramName = params.nextElement();
            if(paramName.startsWith("vnp_")){
                fields.put(paramName, request.getParameter(paramName));
            }
        }

        String vnp_SecureHash = fields.get("vnp_SecureHash");
        fields.remove("vnp_SecureHash");
        fields.remove("vnp_SecureHashType");

        List<String> fieldNames = new ArrayList<>(fields.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        for (int i = 0; i < fieldNames.size(); i++){
            String fieldName = fieldNames.get(i);
            String fieldValue = fields.get(fieldName);
            if (fieldValue != null && fieldValue.length() > 0){
                hashData.append(fieldName).append('=').append(fieldValue);
                if(i < fieldNames.size() - 1){
                    hashData.append('&');
                }
            }
        }

        String mySecureHash = vnPayConfig.hmacSHA512(vnPayConfig.secretKey, hashData.toString());
        System.out.println("My secure has h " + mySecureHash);

        if(vnp_SecureHash != null && vnp_SecureHash.equals(mySecureHash)){
            String vnp_TransactionStatus = fields.get("vnp_TransactionStatus");
            UserOrder order = orderService.getOrderByOrderId(Integer.parseInt( fields.get("vnp_TxnRef") ));
            if(order == null){
                System.out.println("No fkn order found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Order not found!");
            }
            if (vnp_TransactionStatus.equals("00")){
                order.setStatus("Processing");
                orderService.saveOrder(order);
                System.out.println("Order cancelled");
                return ResponseEntity.ok("Success");
            } else {
                order.setStatus("Cancelled");
                orderService.saveOrder(order);
                System.out.println("Order cancelled");
                return ResponseEntity.ok("Failed");
            }
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("invalid signature");
        }
    }
}
