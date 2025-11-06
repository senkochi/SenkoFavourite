package com.senko.SenkoFavourite.mapper;

import com.senko.SenkoFavourite.dto.ProductDTO;
import com.senko.SenkoFavourite.model.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    @Mapping(source = "category.name", target = "categoryName")
    @Mapping(source = "manufacturer.name", target = "manufacturerName")
    ProductDTO toDTO(Product product);
    @Mapping(source = "category.name", target = "categoryName")
    @Mapping(source = "manufacturer.name", target = "manufacturerName")
    List<ProductDTO> toDTOList(List<Product> products);
}
