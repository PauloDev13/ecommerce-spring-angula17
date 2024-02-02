package br.com.depgm.ecommerce.repository;

import br.com.depgm.ecommerce.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    Optional<CartItem> findByProductIdAndOrderIdAndUserId(Long productId, Long orderId, Long userId);
}
