package br.com.depgm.ecommerce.service.admin.category;

import br.com.depgm.ecommerce.dtos.CategoryRequestDTO;
import br.com.depgm.ecommerce.entity.Category;
import br.com.depgm.ecommerce.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;

    @Override
    public Category createCategory(CategoryRequestDTO categoryRequestDTO) {
        Category category = new Category();
        category.setName(categoryRequestDTO.name());
        category.setDescription(categoryRequestDTO.description());

        return categoryRepository.save(category);
    }

    @Override
    public List<Category> categories() {
        return categoryRepository.findAll();
    }
}
