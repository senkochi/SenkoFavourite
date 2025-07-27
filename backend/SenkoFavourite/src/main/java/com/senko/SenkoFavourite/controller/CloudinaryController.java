package com.senko.SenkoFavourite.controller;

import com.senko.SenkoFavourite.service.CloudinaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/images")
@CrossOrigin(origins = "*")
public class CloudinaryController {
    @Autowired
    private CloudinaryService cloudinaryService;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file) {
        if(file.isEmpty()){
            return ResponseEntity.badRequest().body(Map.of("message", "Please select a file to upload."));
        }
        try {
            String imageUrl = cloudinaryService.uploadFile(file);
            return ResponseEntity.ok(Map.of("message", "Image uploaded successfully!", "imageUrl", imageUrl));
        } catch (IOException e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", "Failed to upload image: " + e.getMessage()));
        }
    }

    /**
     * Handles image deletion requests.
     * @param imageUrl The full Cloudinary URL of the image to delete.
     * @return ResponseEntity with a success message or an error message.
     */
    @DeleteMapping("/delete")
    @PreAuthorize("isAuthenticated()") // Only authenticated users can delete images
    public ResponseEntity<?> deleteImage(@RequestParam("imageUrl") String imageUrl) {
        try {
            String publicId = cloudinaryService.extractPublicIdFromUrl(imageUrl);
            if (publicId == null) {
                return ResponseEntity.badRequest().body(Map.of("message", "Invalid Cloudinary URL or public ID could not be extracted."));
            }
            Map deleteResult = cloudinaryService.deleteFile(publicId);
            // Cloudinary's destroy method returns a map, typically with "result": "ok"
            if ("ok".equals(deleteResult.get("result"))) {
                return ResponseEntity.ok(Map.of("message", "Image deleted successfully!"));
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", "Failed to delete image on Cloudinary: " + deleteResult.get("result")));
            }
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", "Failed to delete image: " + e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", "An unexpected error occurred: " + e.getMessage()));
        }
    }
}
