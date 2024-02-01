package br.com.depgm.ecommerce.service.admin.product;

import br.com.depgm.ecommerce.dtos.ProductRequestDTO;
import br.com.depgm.ecommerce.dtos.ProductResponseDTO;
import br.com.depgm.ecommerce.entity.Category;
import br.com.depgm.ecommerce.entity.Product;
import br.com.depgm.ecommerce.repository.CategoryRepository;
import br.com.depgm.ecommerce.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;


    @Override
    public ProductResponseDTO createProduct(ProductRequestDTO productRequestDTO) throws IOException {
        Product newProduct = new Product();
        newProduct.setName(productRequestDTO.name());
        newProduct.setPrice(productRequestDTO.price());
        newProduct.setDescription(productRequestDTO.description());
        newProduct.setImg(productRequestDTO.img().getBytes());

        Category foundCategory = categoryRepository.findById(productRequestDTO.category_id()).orElseThrow();

        newProduct.setCategory(foundCategory);

        return productRepository.save(newProduct).getProductResponseDTO();

    }

    @Override
    public Boolean deleteProduct(Long id) {
        Optional<Product> optionalProduct = productRepository.findById(id);

        if (optionalProduct.isPresent()) {
            productRepository.deleteById(id);
            return true;
        }
        return false;
    }

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
