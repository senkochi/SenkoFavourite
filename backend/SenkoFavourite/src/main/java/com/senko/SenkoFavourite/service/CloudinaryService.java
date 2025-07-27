package com.senko.SenkoFavourite.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class CloudinaryService {
    @Autowired
    private Cloudinary cloudinary;

    public String uploadFile(MultipartFile file) throws IOException {
        try{
            // Use ObjectUtils.emptyMap() for no specific options, or add options like:
            // ObjectUtils.asMap("folder", "my_app_images", "resource_type", "auto")
            Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
            return uploadResult.get("url").toString();
        } catch (IOException e) {
            System.err.println("Error uploading file to Cloudinary: " + e.getMessage());
            throw new IOException("Failed to upload file to Cloudinary", e);
        }
    }

    /**
     * Deletes an image from Cloudinary using its public ID.
     * The public ID is typically part of the image URL (e.g., "folder/image_name" from "https://res.cloudinary.com/cloud_name/image/upload/v12345/folder/image_name.jpg").
     * @param publicId The public ID of the image to delete.
     * @return A Map containing the deletion result.
     * @throws IOException If an I/O error occurs during deletion.
     */
    public Map deleteFile(String publicId) throws IOException {
        try {
            // Example: "sample" is public ID from https://res.cloudinary.com/demo/image/upload/sample.jpg
            // If your URL is https://res.cloudinary.com/cloud_name/image/upload/v123/my_folder/my_image.jpg,
            // publicId should be "my_folder/my_image".
            return cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
        } catch (IOException e) {
            System.err.println("Error deleting file from Cloudinary: " + e.getMessage());
            throw new IOException("Failed to delete file from Cloudinary", e);
        }
    }

    /**
     * Extracts the public ID from a Cloudinary URL.
     * This is a basic implementation and might need adjustment based on your Cloudinary URL structure.
     * Assumes the public ID is the part after the last '/' and before the last '.' (extension),
     * and includes any folders.
     * Example: "https://res.cloudinary.com/mycloud/image/upload/v123/folder/subfolder/my_image.jpg"
     * would return "folder/subfolder/my_image".
     * @param imageUrl The full Cloudinary URL.
     * @return The public ID, or null if not found/invalid URL.
     */
    public String extractPublicIdFromUrl(String imageUrl) {
        if (imageUrl == null || imageUrl.isEmpty()) {
            return null;
        }
        try {
            // Find the index of "/upload/"
            int uploadIndex = imageUrl.indexOf("/upload");
            if (uploadIndex == -1) {
                return null; // Not a standard Cloudinary upload URL
            }

            // Get the part of the URL after "/upload/"
            String pathAfterUpload = imageUrl.substring(uploadIndex + "/upload/".length());

            if (pathAfterUpload.startsWith("v") && pathAfterUpload.contains("/")) {
                int firstSlashAfterV = pathAfterUpload.indexOf("/");
                if (firstSlashAfterV != -1) {
                    pathAfterUpload = pathAfterUpload.substring(firstSlashAfterV + 1);
                }
            }

            // Remove the file extension
            int dotIndex = pathAfterUpload.lastIndexOf('.');
            if (dotIndex != -1) {
                return pathAfterUpload.substring(0, dotIndex);
            }
            return pathAfterUpload; // No extension found
        } catch (Exception e) {
            System.err.println("Error extracting public ID from URL: " + imageUrl + " - " + e.getMessage());
            return null;
        }
    }
}
