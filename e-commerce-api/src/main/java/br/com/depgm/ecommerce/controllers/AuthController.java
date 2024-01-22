package br.com.depgm.ecommerce.controllers;

import br.com.depgm.ecommerce.dtos.AuthenticationRequestDTO;
import br.com.depgm.ecommerce.dtos.SignupRequestDTO;
import br.com.depgm.ecommerce.dtos.UserDTO;
import br.com.depgm.ecommerce.entity.User;
import br.com.depgm.ecommerce.repository.UserRepository;
import br.com.depgm.ecommerce.service.auth.AuthService;
import br.com.depgm.ecommerce.utils.JwtUtil;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping
@RequiredArgsConstructor
@CrossOrigin(value = "*")
public class AuthController {

    public static final String HEADER_STRING = "Bearer ";
    public static final String TOKEN_PREFIX = "Authorization ";

    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final AuthService authService;

    @PostMapping("/authenticate")
    public void createAuthenticationToken(@RequestBody AuthenticationRequestDTO authenticationRequestDTO,
                                          HttpServletResponse response) throws IOException, JSONException {

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequestDTO.username(),
                    authenticationRequestDTO.password()));
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Bad Credentials");
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequestDTO.username());
        Optional<User> optionalUser = userRepository.findByEmail(userDetails.getUsername());
        final String jwt = jwtUtil.generateToken(userDetails.getUsername());

        if (optionalUser.isPresent()) {
            response.getWriter().write(new JSONObject()
                    .put("userId", optionalUser.get().getId())
                    .put("role", optionalUser.get().getRole())
                    .toString()
            );

            response.addHeader(HEADER_STRING, TOKEN_PREFIX + jwt);
        }
    }

    @PostMapping("/sign-up")
    public ResponseEntity<?> signupUser(@RequestBody SignupRequestDTO signupRequestDTO) {
        if (authService.hasUserWithEmail(signupRequestDTO.email())) {
            return new ResponseEntity<>("User already exists", HttpStatus.NOT_ACCEPTABLE);
        }

        UserDTO userDTO = authService.createUser(signupRequestDTO);
        return new ResponseEntity<>(userDTO, HttpStatus.OK);
    }

}
