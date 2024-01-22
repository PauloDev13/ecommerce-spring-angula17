package br.com.depgm.ecommerce.dtos;

import br.com.depgm.ecommerce.enums.UserRole;

public record UserDTO(Long id, String email, String name, UserRole userRole) {
}
