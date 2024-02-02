package br.com.depgm.ecommerce.service.costumer.cart;

import br.com.depgm.ecommerce.dtos.AddProductToCartDTO;
import br.com.depgm.ecommerce.entity.CartItem;
import br.com.depgm.ecommerce.entity.Order;
import br.com.depgm.ecommerce.entity.Product;
import br.com.depgm.ecommerce.entity.User;
import br.com.depgm.ecommerce.enums.OrderStatus;
import br.com.depgm.ecommerce.repository.CartItemRepository;
import br.com.depgm.ecommerce.repository.OrderRepository;
import br.com.depgm.ecommerce.repository.ProductRepository;
import br.com.depgm.ecommerce.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;

    @Override
    public ResponseEntity<?> addProductToCart(AddProductToCartDTO addProductToCartDTO) {
        Order activeOrder = orderRepository.findByUserIdAndOrderStatus(addProductToCartDTO.userId(), OrderStatus.PENDING);
        Optional<CartItem> optionalCartItem = cartItemRepository.findByProductIdAndOrderIdAndUserId(
                addProductToCartDTO.productId(), activeOrder.getId(), addProductToCartDTO.userId()
        );

        if (optionalCartItem.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        } else {
            Optional<Product> optionalProduct = productRepository.findById(addProductToCartDTO.productId());
            Optional<User> optionalUser = userRepository.findById(addProductToCartDTO.userId());

            if (optionalProduct.isPresent() && optionalUser.isPresent()) {
                CartItem cart = new CartItem();
                cart.setProduct(optionalProduct.get());
                cart.setPrice(optionalProduct.get().getPrice());
                cart.setQuantity(1L);
                cart.setUser(optionalUser.get());
                cart.setOrder(activeOrder);

                cartItemRepository.save(cart);
//                CartItem updateCart = cartItemRepository.save(cart);

                activeOrder.setTotalAmount(activeOrder.getTotalAmount() + cart.getPrice());
                activeOrder.setAmount(activeOrder.getAmount() + cart.getPrice());
                activeOrder.getCartItems().add(cart);

                orderRepository.save(activeOrder);

                return ResponseEntity.status(HttpStatus.CREATED).body(cart);

            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User or Product not found");
            }
        }
    }
}
