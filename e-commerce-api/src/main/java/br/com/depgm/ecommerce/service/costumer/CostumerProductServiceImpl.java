package br.com.depgm.ecommerce.service.costumer;

import br.com.depgm.ecommerce.dtos.ProductResponseDTO;
import br.com.depgm.ecommerce.entity.Product;
import br.com.depgm.ecommerce.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CostumerProductServiceImpl implements CostumerProductService {
    private final ProductRepository productRepository;

    @Override
    public List<ProductResponseDTO> products() {
        List<Product> getAllProducts = productRepository.findAll();
        return getAllProducts.stream().map(Product::getProductResponseDTO).toList();
    }

    @Override
    public List<ProductResponseDTO> productsByName(String name) {
        List<Product> allProductsByName = productRepository.findAllByNameContaining(name);
        return allProductsByName.stream().map(Product::getProductResponseDTO).toList();
    }

}
