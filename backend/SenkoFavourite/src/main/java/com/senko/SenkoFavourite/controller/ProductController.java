package com.senko.SenkoFavourite.controller;

import com.senko.SenkoFavourite.dto.ProductDTO;
import com.senko.SenkoFavourite.model.Category;
import com.senko.SenkoFavourite.model.Product;
import com.senko.SenkoFavourite.service.CloudinaryService;
import com.senko.SenkoFavourite.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {
    @Autowired
    public ProductService productService;

    @GetMapping("/all")
    public List<ProductDTO> getAllProductDTOs(){return productService.getAllProductDTOs();}

    @GetMapping("/{slug}")
    public ResponseEntity<?> getProductDTOBySlug(@PathVariable String slug){
        ProductDTO dto = productService.getBySlug(slug);
        System.out.println("Id dto sản phẩm hiện tại là: " + dto.getProductId());
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/{slug}/related")
    public ResponseEntity<List<ProductDTO>> getRelatedProduct(@PathVariable String slug){
        List<ProductDTO> related= productService.getRelatedProducts(slug);
        return ResponseEntity.ok(related);

    }

    @GetMapping
    public Map<String, Object> getProductPage(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(required = false) List<Integer> category // List<Integer>!
    ) {
        return productService.getProductPage(page, category);
    }

    @PutMapping("/admin")
    public ResponseEntity<?> updateProduct(@RequestBody ProductDTO productDTO){
        return ResponseEntity.ok(productService.updateProduct(productDTO));
    }

    @DeleteMapping("/admin/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable int id){
        return ResponseEntity.ok(productService.deleteProduct(id));
    }

    @PostMapping("/admin")
    public ResponseEntity<?> addProduct(@RequestBody ProductDTO productDTO){
        return ResponseEntity.ok(productService.addProduct(productDTO));
    }
}
    