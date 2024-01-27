package br.com.depgm.ecommerce.dtos;

public record ProductResponseDTO(
        Long id,
        String name,
        Long price,
        String description,
        byte[] byteImg,
        Long category_id
//        MultipartFile img
) {
}
