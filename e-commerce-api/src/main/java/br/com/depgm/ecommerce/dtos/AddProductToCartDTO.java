package br.com.depgm.ecommerce.dtos;

public record AddProductToCartDTO(
        Long userId,
        Long productId
) {
}
