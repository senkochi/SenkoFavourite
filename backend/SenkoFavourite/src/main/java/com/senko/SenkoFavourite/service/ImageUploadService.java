package com.senko.SenkoFavourite.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class ImageUploadService {
    @Autowired
    private Cloudinary cloudinary;

    public String uploadImage(MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            throw new IOException("File không được rỗng.");
        }
        try {
            // Tải file lên Cloudinary
            // Bạn có thể thêm các tùy chọn khác như folder, public_id, v.v.
            // Ví dụ: ObjectUtils.asMap("folder", "product_images")
            Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());

            // Lấy URL an toàn (HTTPS) của hình ảnh đã upload
            return uploadResult.get("secure_url").toString();
        } catch (IOException e) {
            System.err.println("Lỗi khi upload hình ảnh lên Cloudinary: " + e.getMessage());
            throw new IOException("Không thể upload hình ảnh. Vui lòng thử lại.", e);
        }
    }
}
