package br.com.depgm.ecommerce.service.auth;

import br.com.depgm.ecommerce.dtos.SignupRequestDTO;
import br.com.depgm.ecommerce.dtos.UserDTO;
import br.com.depgm.ecommerce.entity.Order;
import br.com.depgm.ecommerce.entity.User;
import br.com.depgm.ecommerce.enums.OrderStatus;
import br.com.depgm.ecommerce.enums.UserRole;
import br.com.depgm.ecommerce.repository.OrderRepository;
import br.com.depgm.ecommerce.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;
    private final PasswordEncoder passwordEncoder;
    @Value("${admin.key}")
    private String adminKey;

    public AuthServiceImpl(UserRepository userRepository, OrderRepository orderRepository,
                           PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.orderRepository = orderRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public UserDTO createUser(SignupRequestDTO signupRequestDTO) {
        User user = new User();
        user.setEmail(signupRequestDTO.email());
        user.setName(signupRequestDTO.name());
        user.setPassword(passwordEncoder.encode(signupRequestDTO.password()));
        user.setRole(UserRole.COSTUMER);
        User createdUser = userRepository.save(user);

        Order order = new Order();
        order.setAmount(0L);
        order.setTotalAmount(0L);
        order.setUser(createdUser);
        order.setOrderStatus(OrderStatus.PENDING);
        orderRepository.save(order);


        return new UserDTO(createdUser.getId(), createdUser.getEmail(),
                createdUser.getName(), createdUser.getRole()
        );
    }

    @Override
    public boolean hasUserWithEmail(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    @Override
    @PostConstruct
    public void createAdminAccount() {
        User adminAccount = userRepository.findByRole(UserRole.ADMIN);

        if (adminAccount == null) {
            User user = new User();
            user.setEmail("admin@teste.com");
            user.setName("admin");
            user.setRole(UserRole.ADMIN);
            user.setPassword(new BCryptPasswordEncoder().encode(adminKey));
            userRepository.save(user);
        }
    }
}
