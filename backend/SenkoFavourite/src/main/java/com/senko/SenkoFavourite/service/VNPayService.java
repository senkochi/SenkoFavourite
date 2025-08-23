package com.senko.SenkoFavourite.service;

import com.senko.SenkoFavourite.config.VNPayConfig;
import com.senko.SenkoFavourite.dto.OrderDetailDTO;
import com.senko.SenkoFavourite.dto.VNPayRequestDTO;
import com.senko.SenkoFavourite.model.*;
import com.senko.SenkoFavourite.repository.AddressRepository;
import com.senko.SenkoFavourite.repository.OrderRepository;
import com.senko.SenkoFavourite.repository.ProductRepository;
import com.senko.SenkoFavourite.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class VNPayService {

    @Autowired
    private VNPayConfig vnPayConfig;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderRepository orderRepository;

    public String createPaymentUrl(VNPayRequestDTO orderInfo, String username) throws Exception {

        Users user = userRepository.findByUsername(username);
        Address address = addressRepository.findByUser(user).orElse(null);

        if(!user.canOrder()){
            throw new Exception("Please check your fullname, phone number or address!");
        }

        UserOrder order = UserOrder.builder()
                .user(user)
                .createdAt(LocalDateTime.now())
                .total(0)
                .status("unpaid")
                .paymentMethod("VNPAY")
                .address(address.toString())
                .build();

        double totalAmount = 0;

        for(OrderDetailDTO detail : orderInfo.getOrderDetailList()){
            Product product = productRepository.findByProductId(detail.getProductId());
            OrderDetail orderDetail = OrderDetail.builder()
                    .product(product)
                    .quantity(detail.getQuantity())
                    .build();
            totalAmount += product.getPrice() * detail.getQuantity() + 2; //Shipping fee is $2 for each kind
            order.addOrderDetail(orderDetail);
        }

        order.setTotal(totalAmount);
        orderRepository.save(order);

        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", "2.1.0");
        vnp_Params.put("vnp_Command", "pay");
        vnp_Params.put("vnp_TmnCode", vnPayConfig.vnp_TmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf(orderInfo.getAmount()*100));
        vnp_Params.put("vnp_CurrCode", "VND");
        vnp_Params.put("vnp_TxnRef", order.getOrderId() + "");
        vnp_Params.put("vnp_OrderInfo", orderInfo.getOrderInfo());
        vnp_Params.put("vnp_OrderType", orderInfo.getOrderType());
        vnp_Params.put("vnp_Locale", orderInfo.getLocale());
        vnp_Params.put("vnp_ReturnUrl", vnPayConfig.vnp_ReturnUrl);
        vnp_Params.put("vnp_IpAddr", orderInfo.getIpAddr());

        System.out.println("ccc" + vnPayConfig.vnp_TmnCode);
        System.out.println("cccfffff" + vnPayConfig.secretKey);

        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        String vnp_CreateDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);
        cld.add(Calendar.MINUTE, 15);
        String vnp_ExpireDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

        // Build hash data & query string
        List<String> fieldNames = new ArrayList<>(vnp_Params.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        for (int i = 0; i < fieldNames.size(); i++) {
            String fieldName = fieldNames.get(i);
            String fieldValue = vnp_Params.get(fieldName);
            if (fieldValue != null && fieldValue.length() > 0) {
                hashData.append(fieldName).append('=').append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()))
                        .append('=')
                        .append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                if (i < fieldNames.size() - 1) {
                    hashData.append('&');
                    query.append('&');
                }
            }
        }
        String vnp_SecureHash = vnPayConfig.hmacSHA512(vnPayConfig.secretKey, hashData.toString());
        query.append("&vnp_SecureHash=").append(vnp_SecureHash);
        return vnPayConfig.vnp_PayUrl + "?" + query.toString();
    }
}
