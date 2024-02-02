package br.com.depgm.ecommerce.service.costumer.cart;

import br.com.depgm.ecommerce.dtos.AddProductToCartDTO;
import org.springframework.http.ResponseEntity;

public interface CartService {
    ResponseEntity<?> addProductToCart(AddProductToCartDTO addProductToCartDTO);
}
