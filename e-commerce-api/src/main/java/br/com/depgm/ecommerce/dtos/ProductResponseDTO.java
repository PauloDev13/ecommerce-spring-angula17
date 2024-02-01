package br.com.depgm.ecommerce.dtos;

import java.util.Objects;

public record ProductResponseDTO(
        Long id,
        String name,
        Long price,
        String description,
        byte[] byteImg,
        Long category_id,
        String categoryName
) {
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ProductResponseDTO that = (ProductResponseDTO) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "ProductResponseDTO{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", price=" + price +
                ", description='" + description + '\'' +
                ", category_id=" + category_id +
                ", categoryName='" + categoryName + '\'' +
                '}';
    }
}
