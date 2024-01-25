package br.com.depgm.ecommerce.controllers.admin;

import br.com.depgm.ecommerce.dtos.ProductDTO;
import br.com.depgm.ecommerce.dtos.ProductRequestDTO;
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
    public ResponseEntity<ProductDTO> createProduct(@ModelAttribute ProductRequestDTO productRequestDTO) throws IOException {
        ProductDTO productDTO = productService.createProduct(productRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(productDTO);
    }

    @GetMapping
    public ResponseEntity<List<ProductDTO>> products() {
        return ResponseEntity.ok(productService.products());
    }

}
