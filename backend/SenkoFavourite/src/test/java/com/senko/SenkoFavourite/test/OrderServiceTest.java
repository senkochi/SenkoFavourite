//package com.senko.SenkoFavourite.test;
//
//import com.senko.SenkoFavourite.dto.OrderDetailDTO;
//import com.senko.SenkoFavourite.model.Address;
//import com.senko.SenkoFavourite.model.OrderDetail;
//import com.senko.SenkoFavourite.model.Product;
//import com.senko.SenkoFavourite.model.Users;
//import com.senko.SenkoFavourite.model.enums.PaymentMethod;
//import com.senko.SenkoFavourite.repository.AddressRepository;
//import com.senko.SenkoFavourite.repository.OrderRepository;
//import com.senko.SenkoFavourite.repository.ProductRepository;
//import com.senko.SenkoFavourite.repository.UserRepository;
//import com.senko.SenkoFavourite.service.OrderService;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.junit.jupiter.MockitoExtension;
//
//import java.util.ArrayList;
//import java.util.List;
//
//import static org.mockito.Mockito.when;
//
//@ExtendWith(MockitoExtension.class)
//public class OrderServiceTest {
//    @Mock
//    private UserRepository userRepository;
//
//    @Mock
//    private ProductRepository productRepository;
//
//    @Mock
//    private OrderRepository orderRepository;
//
//    @InjectMocks
//    private OrderService orderService;
//
//    @Test
//    void testCreateOrder_Success_CreateNewOrder() {
//        // Given
//        String username = "CR7";
//        PaymentMethod paymentMethod = PaymentMethod.COD;
//        Users user = new Users();
//        user.setUsername(username);
//
//        Address address = Address.builder()
//                .
//                .build();
//
//        user.setAddress(new Address("HCM", "1 Street"));
//        // canOrder() giả sử trả về true
//        Users spyUser = spy(user);
//        when(spyUser.canOrder()).thenReturn(true);
//
//        // Tạo danh sách sản phẩm đặt
//        Product product1 = new Product();
//        product1.setProductId(1);
//        product1.setPrice(10.0);
//        product1.setQuantity(5);
//
//        OrderDetailDTO dto = new OrderDetailDTO();
//        dto.setProductId(1);
//        dto.setQuantity(2);
//
//        // Mock hành vi repo
//        when(userRepository.findByUsername(username)).thenReturn(spyUser);
//        when(productRepository.findByProductId(1)).thenReturn(product1);
//        when(orderRepository.save(any(UserOrder.class))).thenAnswer(i -> i.getArgument(0));
//
//        // When
//        UserOrder createdOrder = orderService.createUserOrder(username, paymentMethod, List.of(dto));
//
//        // Then
//        assertNotNull(createdOrder);
//        assertEquals("Processing", createdOrder.getStatus());
//        assertEquals(1, createdOrder.getOrderDetails().size());
//        // Tổng = giá * số lượng + 2 phí ship = 10*2 + 2 = 22
//        assertEquals(22.0, createdOrder.getTotal());
//        // Kiểm tra số lượng sản phẩm giảm đúng
//        assertEquals(3, product1.getQuantity());
//        verify(orderRepository, times(1)).save(any(UserOrder.class));
//        verify(productRepository, times(1)).save(product1);
//    }
//}
