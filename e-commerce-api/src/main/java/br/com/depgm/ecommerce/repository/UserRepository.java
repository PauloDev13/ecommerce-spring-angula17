package br.com.depgm.ecommerce.repository;

import br.com.depgm.ecommerce.entity.User;
import br.com.depgm.ecommerce.enums.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    User findByRole(UserRole userRole);
}
