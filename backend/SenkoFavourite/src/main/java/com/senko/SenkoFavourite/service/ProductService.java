package com.senko.SenkoFavourite.service;

import com.senko.SenkoFavourite.dto.ProductDTO;
import com.senko.SenkoFavourite.mapper.ProductMapper;
import com.senko.SenkoFavourite.model.Category;
import com.senko.SenkoFavourite.model.Product;
import com.senko.SenkoFavourite.repository.ProductRepository;
import jakarta.persistence.criteria.Predicate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductMapper productMapper;

    public List<ProductDTO> getAllProductDTOs(){
        return productMapper.toDTOList(productRepository.findAll());
    }

    public ProductDTO getBySlug(String slug){
        Product product = productRepository.findBySlug(slug).orElseThrow();
        return productMapper.toDTO(product);
    }

    public List<ProductDTO> getRelatedProducts(String slug){
        Product product = productRepository.findBySlug(slug).orElseThrow();

        Long id = product.getId();

        List<Product> before = productRepository.findTop2ByCategoryAndIdLessThanOrderByIdAsc(product.getCategory(), id);
        List<Product> after = productRepository.findTop2ByCategoryAndIdGreaterThanOrderByIdAsc(product.getCategory(), id);

        List<Product> result = new ArrayList<>();
        result.addAll(before);
        result.addAll(after);

        int needed = 5 - result.size();
        if (needed > 0) {
            List<Product> filler = productRepository
                    .findTopNByCategoryAndIdNotIn(product.getCategory(), Stream.concat(
                            Stream.of(id),
                            result.stream().map(Product::getId)
                    ).collect(Collectors.toList()), PageRequest.of(0, needed));

            result.addAll(filler);
        }

        return productMapper.toDTOList(result);
    }

    public Map<String, Object> getProductPage(int page, List<Integer> category) {
        int size = 16;
        Pageable pageable = PageRequest.of(page, size);
        Page<Product> productPage;

        if (category != null && !category.isEmpty()) {
            productPage = productRepository.findByCategory_IdIn(category, pageable);
        } else {
            productPage = productRepository.findAll(pageable);
        }
        System.out.println("Categories: " + category);

        List<ProductDTO> productDTOs = productMapper.toDTOList(productPage.getContent());
        Map<String, Object> response = new HashMap<>();
        response.put("products", productDTOs);
        response.put("currentPage", productPage.getNumber());
        response.put("totalItems", productPage.getTotalElements());
        response.put("totalPages", productPage.getTotalPages());
        return response;
    }
}
