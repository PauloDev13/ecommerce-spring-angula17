package br.com.depgm.ecommerce.controllers.costumer;

import br.com.depgm.ecommerce.dtos.AddProductToCartDTO;
import br.com.depgm.ecommerce.service.costumer.cart.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/customer")
@RequiredArgsConstructor
public class CartController {
    private final CartService cartService;

    @PostMapping("/cart")
    public ResponseEntity<?> addProductToCart(@RequestBody AddProductToCartDTO addProductToCartDTO) {
        return cartService.addProductToCart(addProductToCartDTO);
    }
}
