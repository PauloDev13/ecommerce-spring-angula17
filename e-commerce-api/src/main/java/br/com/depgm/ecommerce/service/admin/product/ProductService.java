package br.com.depgm.ecommerce.service.admin.product;

import br.com.depgm.ecommerce.dtos.ProductRequestDTO;
import br.com.depgm.ecommerce.dtos.ProductResponseDTO;

import java.io.IOException;
import java.util.List;

public interface ProductService {
    ProductResponseDTO createProduct(ProductRequestDTO productRequestDTO) throws IOException;

    List<ProductResponseDTO> products();

    List<ProductResponseDTO> productsByName(String name);

    Boolean deleteProduct(Long id);
}
