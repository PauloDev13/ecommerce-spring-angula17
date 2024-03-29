package br.com.depgm.ecommerce.controllers.admin;

import br.com.depgm.ecommerce.dtos.ProductRequestDTO;
import br.com.depgm.ecommerce.dtos.ProductResponseDTO;
import br.com.depgm.ecommerce.service.admin.product.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminProductController {
    private final ProductService productService;

    public AdminProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping("product")
    public ResponseEntity<ProductResponseDTO> createProduct(@ModelAttribute ProductRequestDTO productRequestDTO) throws IOException {
        ProductResponseDTO productDTO = productService.createProduct(productRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(productDTO);
    }

    @GetMapping("products")
    public ResponseEntity<List<ProductResponseDTO>> products() {
        return ResponseEntity.ok(productService.products());
    }

    @GetMapping("search/{name}")
    public ResponseEntity<List<ProductResponseDTO>> productsByName(@PathVariable String name) {
        return ResponseEntity.ok(productService.productsByName(name));
    }

    @DeleteMapping("product/{productId}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long productId) {
        boolean productDeleted = productService.deleteProduct(productId);

        if (productDeleted) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

}
