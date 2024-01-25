package br.com.depgm.ecommerce.service.admin.category;

import br.com.depgm.ecommerce.dtos.CategoryRequestDTO;
import br.com.depgm.ecommerce.entity.Category;

import java.util.List;

public interface CategoryService {
    Category createCategory(CategoryRequestDTO categoryRequestDTO);

    List<Category> categories();
}
