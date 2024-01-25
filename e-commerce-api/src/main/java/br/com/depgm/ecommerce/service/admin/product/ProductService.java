package br.com.depgm.ecommerce.service.admin.product;

import br.com.depgm.ecommerce.dtos.ProductDTO;
import br.com.depgm.ecommerce.dtos.ProductRequestDTO;

import java.io.IOException;
import java.util.List;

public interface ProductService {
    ProductDTO createProduct(ProductRequestDTO productRequestDTO) throws IOException;
    List<ProductDTO> products();
}
