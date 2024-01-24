package br.com.depgm.ecommerce.service.admin.category;

import br.com.depgm.ecommerce.dtos.CategoryRequestDTO;
import br.com.depgm.ecommerce.entity.Category;

public interface CategoryService {
    Category createCategory(CategoryRequestDTO categoryRequestDTO);
}
