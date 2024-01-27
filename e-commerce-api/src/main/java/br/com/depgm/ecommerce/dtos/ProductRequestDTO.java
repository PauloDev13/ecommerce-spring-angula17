package br.com.depgm.ecommerce.dtos;

import org.springframework.web.multipart.MultipartFile;


public record ProductRequestDTO(
        String name,
        Long price,
        String description,
//        byte[] byteImg,
        Long category_id,
        MultipartFile img
) {
}
