package br.com.depgm.ecommerce.repository;

import br.com.depgm.ecommerce.entity.Order;
import br.com.depgm.ecommerce.enums.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
    Order findByUserIdAndOrderStatus(Long userId, OrderStatus orderStatus);
}
