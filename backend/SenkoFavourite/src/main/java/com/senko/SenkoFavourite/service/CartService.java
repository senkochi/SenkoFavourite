package com.senko.SenkoFavourite.service;

import com.senko.SenkoFavourite.dto.CartDetailDTO;
import com.senko.SenkoFavourite.model.Cart;
import com.senko.SenkoFavourite.model.CartDetail;
import com.senko.SenkoFavourite.model.Product;
import com.senko.SenkoFavourite.model.Users;
import com.senko.SenkoFavourite.repository.CartDetailRepository;
import com.senko.SenkoFavourite.repository.CartRepository;
import com.senko.SenkoFavourite.repository.ProductRepository;
import com.senko.SenkoFavourite.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartService {
    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartDetailRepository cartDetailRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    public List<CartDetailDTO> getCartDetailByUsername(String username){
        Users user = userRepository.findByUsername(username);
        Cart cart = cartRepository.findByUser(user).orElse(null);

        if(cart == null){
            return List.of();
        }

        return cartDetailRepository.findByCart(cart)
                .stream()
                .map(detail -> new CartDetailDTO(
                        detail.getProduct().getProductId(),
                        detail.getProduct().getName(),
                        detail.getProduct().getImageURL(),
                        detail.getProduct().getPrice(),
                        detail.getQuantity()
                ))
                .toList();
    }

    public String addToCart(String username, int productId, int quantity){
        Users user = userRepository.findByUsername(username);
        if (user == null){
            return "Cần đăng nhập để thêm vào giỏ hàng";
        }
        Product product = productRepository.findByProductId(productId);
        if(product == null){
            return "Sản phẩm không tồn tại";
        }

        Cart cart = cartRepository.findByUser(user)
                .orElseGet(() -> {
                    Cart newCart = Cart.builder()
                            .user(user)
                            .build();
                    return cartRepository.save(newCart);
                });

        Optional<CartDetail> cartDetail = cartDetailRepository.findByCartAndProduct(cart, product);

        if (!cartDetail.isEmpty()){
            CartDetail newCartDetail = cartDetail.get();
            newCartDetail.setQuantity(newCartDetail.getQuantity() + quantity);
            cartDetailRepository.save(newCartDetail);
        } else {
            CartDetail newCartDetail = CartDetail.builder()
                    .cart(cart)
                    .product(product)
                    .quantity(quantity)
                    .build();
            cartDetailRepository.save(newCartDetail);
        }
        return "Thêm vào giỏ hàng thành công";
    }

    public String removeFromCart(String username, int productId){
        Users user = userRepository.findByUsername(username);
        if(user == null){
            return "Cần đăng nhập để thao tác";
        }

        Product product = productRepository.findByProductId(productId);
        if(product == null){
            return "Sản phẩm không tồn tại";
        }

        Cart cart = cartRepository.findByUser(user).orElse(null);

        CartDetail cartDetail = cartDetailRepository.findByCartAndProduct(cart, product).orElse(null);
        if(cartDetail == null){
            return "Sản phẩm không tồn tại trong giỏ hàng";
        }
        cartDetailRepository.delete(cartDetail);
        return "Xóa thành công";
    }
}
