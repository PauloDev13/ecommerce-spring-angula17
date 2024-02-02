package br.com.depgm.ecommerce.controllers.costumer;

import br.com.depgm.ecommerce.dtos.ProductResponseDTO;
import br.com.depgm.ecommerce.service.costumer.CostumerProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/costumer")
public class CostumerProductController {
    private final CostumerProductService costumerProductService;

    public CostumerProductController(CostumerProductService costumerProductService) {
        this.costumerProductService = costumerProductService;
    }


    @GetMapping("products")
    public ResponseEntity<List<ProductResponseDTO>> products() {
        return ResponseEntity.ok(costumerProductService.products());
    }

    @GetMapping("search/{name}")
    public ResponseEntity<List<ProductResponseDTO>> productsByName(@PathVariable String name) {
        return ResponseEntity.ok(costumerProductService.productsByName(name));
    }

}
