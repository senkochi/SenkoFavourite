package com.senko.SenkoFavourite.service;

import com.senko.SenkoFavourite.dto.FeedbackDTO;
import com.senko.SenkoFavourite.exception.types.NotFoundException;
import com.senko.SenkoFavourite.model.Feedback;
import com.senko.SenkoFavourite.model.Product;
import com.senko.SenkoFavourite.model.UserOrder;
import com.senko.SenkoFavourite.model.Users;
import com.senko.SenkoFavourite.repository.FeedbackRepository;
import com.senko.SenkoFavourite.repository.OrderRepository;
import com.senko.SenkoFavourite.repository.ProductRepository;
import com.senko.SenkoFavourite.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collector;
import java.util.stream.Collectors;

@Service
public class FeedbackService {
    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderRepository orderRepository;

    public List<Feedback> getAllFeedback(){
        return feedbackRepository.findAll();
    }

    @Transactional
    public List<Feedback> createFeedbacks(int orderId, String username, List<FeedbackDTO> feedbackDTOList){
        Users user = userRepository.findByUsername(username);
        if(user == null){
            throw new NotFoundException("User not found");
        }

        UserOrder order = orderRepository.findByOrderId(orderId);
        if(order == null){
            throw new NotFoundException("Order not found");
        }

        List<Integer> ids = feedbackDTOList.stream().map(FeedbackDTO::getProductId).toList();
        List<Product> products = productRepository.findByProductIds(ids);

        Map<Integer, Product> productMap = products.stream().collect(Collectors.toMap(Product::getProductId, product -> product));

        List<Feedback> feedbacks = new ArrayList<>();

        for(FeedbackDTO feedbackDTO : feedbackDTOList){
            Product product = productMap.get(feedbackDTO.getProductId());
            if (product == null) {
                throw new NotFoundException("Product not found");
            }

            Feedback feedback = Feedback.builder()
                    .product(productMap.get(feedbackDTO.getProductId()))
                    .rating(feedbackDTO.getRating())
                    .createdAt(LocalDateTime.now())
                    .content(feedbackDTO.getContent())
                    .user(user)
                    .order(order)
                    .build();
            feedbacks.add(feedback);
        }

        order.setReviewed(true);
        orderRepository.save(order);

        return feedbackRepository.saveAll(feedbacks);
    }

}
