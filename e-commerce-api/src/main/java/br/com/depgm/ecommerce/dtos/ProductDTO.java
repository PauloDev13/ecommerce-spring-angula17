package br.com.depgm.ecommerce.dtos;

import org.springframework.web.multipart.MultipartFile;

import java.beans.Transient;


public record ProductDTO(
        Long id,
        String name,
        Long price,
        String description,
        byte[] byteImg,
        Long category_id,
        MultipartFile img
) { }
