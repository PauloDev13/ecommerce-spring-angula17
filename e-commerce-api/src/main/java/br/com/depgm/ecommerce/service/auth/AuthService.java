package br.com.depgm.ecommerce.service.auth;

import br.com.depgm.ecommerce.dtos.SignupRequestDTO;
import br.com.depgm.ecommerce.dtos.UserDTO;

public interface AuthService {
    UserDTO createUser(SignupRequestDTO signupRequestDTO);

    boolean hasUserWithEmail(String email);

    void createAdminAccount();
}
