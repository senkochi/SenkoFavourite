package com.senko.SenkoFavourite.test;

import com.senko.SenkoFavourite.model.Cart;
import com.senko.SenkoFavourite.model.CartDetail;
import com.senko.SenkoFavourite.model.Product;
import com.senko.SenkoFavourite.model.Users;
import com.senko.SenkoFavourite.repository.CartDetailRepository;
import com.senko.SenkoFavourite.repository.CartRepository;
import com.senko.SenkoFavourite.repository.ProductRepository;
import com.senko.SenkoFavourite.repository.UserRepository;
import com.senko.SenkoFavourite.service.CartService;
import org.checkerframework.checker.units.qual.C;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class CartServiceTest {
    @Mock
    private UserRepository userRepository;

    @Mock
    private ProductRepository productRepository;

    @Mock
    private CartRepository cartRepository;

    @Mock
    private CartDetailRepository cartDetailRepository;

    @InjectMocks
    private CartService cartService;

    @Test
    void testAddToCart_Success_AddNewProductToCart() {
        //Given
        String username = "CR7";
        int productId = 1;
        int quantityToAdd = 2;

        Users user = new Users();
        user.setUsername(username);

        Product product = new Product();
        product.setProductId(productId);
        product.setQuantity(10);

        Cart cart = new Cart();
        cart.setUser(user);

        when(userRepository.findByUsername(username)).thenReturn(user);
        when(productRepository.findByProductId(productId)).thenReturn(Optional.of(product));
        when(cartRepository.findByUser(user)).thenReturn(Optional.of(cart));
        when(cartDetailRepository.findByCartAndProduct(cart, product)).thenReturn(Optional.empty());

        //When
        String result = cartService.addToCart(username, productId, quantityToAdd);

        assertEquals("Thêm vào giỏ hàng thành công", result);
        verify(cartDetailRepository, times(1)).save(any(CartDetail.class));
        assertEquals(8, product.getQuantity());
    }
}
