package com.senko.SenkoFavourite.controller;

import com.senko.SenkoFavourite.config.VNPayConfig;
import com.senko.SenkoFavourite.dto.VNPayRequestDTO;
import com.senko.SenkoFavourite.model.UserOrder;
import com.senko.SenkoFavourite.model.enums.OrderStatus;
import com.senko.SenkoFavourite.service.OrderService;
import com.senko.SenkoFavourite.service.VNPayService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

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
                System.out.println("No order found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Order not found!");
            }
            if (vnp_TransactionStatus.equals("00")){
                order.setStatus(OrderStatus.PENDING);
                orderService.saveOrder(order);
                System.out.println("Order cancelled");
                return ResponseEntity.ok("Success");
            } else {
                order.setStatus(OrderStatus.CANCELLED);
                orderService.saveOrder(order);
                System.out.println("Order cancelled");
                return ResponseEntity.ok("Failed");
            }
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("invalid signature");
        }
    }

    @GetMapping("/return-confirm")
    public ResponseEntity<?> returnConfirm(HttpServletRequest request){
        Map<String,String> fields = new HashMap<>();
        request.getParameterMap().forEach((k,v)-> {
            if(k.startsWith("vnp_")) fields.put(k, v[0]);
        });
        String incomingHash = fields.remove("vnp_SecureHash");
        String txnRef = fields.get("vnp_TxnRef");
        String responseCode = fields.getOrDefault("vnp_ResponseCode", fields.get("vnp_TransactionStatus"));

        if(txnRef == null) return ResponseEntity.badRequest().body("missing txnRef");

        UserOrder order = orderService.getOrderByOrderId(Integer.parseInt(txnRef));
        if(order == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("order not found");

        if(order.getStatus() == OrderStatus.CANCELLED)
            return ResponseEntity.ok().build();

        String hashData = buildHashData(fields); // giống lúc tạo URL
        String computed = vnPayConfig.hmacSHA512(vnPayConfig.secretKey, hashData);

        if(incomingHash == null || !incomingHash.equals(computed)){
            orderService.updateOrderStatus(order.getOrderId(), "CANCELLED");
            System.out.println("[VNPay Return] signature invalid -> CANCELLED order=" + txnRef);
            return ResponseEntity.ok("cancelled (invalid signature)");
        }


        if("00".equals(responseCode)){
            order.setStatus(OrderStatus.PENDING); // hoặc PAID
            orderService.saveOrder(order);
            System.out.println("[VNPay Return] success order=" + txnRef);
            return ResponseEntity.ok("success");
        } else {
            orderService.updateOrderStatus(order.getOrderId(), "CANCELLED");
            System.out.println("[VNPay Return] failure code=" + responseCode + " order=" + txnRef);
            return ResponseEntity.ok("cancelled code=" + responseCode);
        }
    }

    private String buildHashData(Map<String,String> fields){
        List<String> keys = new ArrayList<>(fields.keySet());
        Collections.sort(keys);
        StringBuilder sb = new StringBuilder();
        for(int i=0;i<keys.size();i++){
            String k = keys.get(i);
            String v = fields.get(k);
            if(v != null && !v.isEmpty()){
                sb.append(k).append("=").append(v);
                if(i < keys.size()-1) sb.append("&");
            }
        }
        return sb.toString();
    }
}
