package br.com.depgm.ecommerce.service.costumer;

import br.com.depgm.ecommerce.dtos.ProductResponseDTO;

import java.util.List;

public interface CostumerProductService {
    List<ProductResponseDTO> products();

    List<ProductResponseDTO> productsByName(String name);
}
