import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-hot-toast";
import { 
  CloudArrowUpIcon, 
  PhotoIcon, 
  TrashIcon, 
  CheckCircleIcon,
  XCircleIcon 
} from "@heroicons/react/24/outline";

const ImageUploader = ({ onImageUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // Thêm state này
  const [dragActive, setDragActive] = useState(false);

  // Thêm các hàm xử lý drag & drop
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        setSelectedFile(file);
        setUploadedImageUrl("");
        setError(null);
      } else {
        toast.error("Please select an image file");
      }
    }
  };

  // Xử lý khi người dùng chọn file
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setUploadedImageUrl("");
      setError(null);
    }
  };

  // Xử lý upload file
  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select an image file to upload.");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axiosInstance.post("/api/images/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const { imageUrl, message } = response.data;
      setUploadedImageUrl(imageUrl);
      toast.success(message || "Image uploaded successfully!");
      
      if (onImageUpload) {
        onImageUpload(imageUrl);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to upload image.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Xử lý xóa ảnh
  const handleDelete = async () => {
    if (!uploadedImageUrl) {
      toast.error("No image to delete.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.delete("/api/images/delete", {
        params: { imageUrl: uploadedImageUrl },
      });

      toast.success(response.data.message || "Image deleted successfully!");
      setUploadedImageUrl("");
      setSelectedFile(null);
      
      if (onImageUpload) {
        onImageUpload("");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to delete image.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Reset tất cả
  const handleReset = () => {
    setSelectedFile(null);
    setUploadedImageUrl("");
    setError(null);
    if (onImageUpload) {
      onImageUpload("");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Upload Area */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Upload Thumbnail
        </label>
        
        {/* Drag & Drop Zone */}
        <div
          className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${
            dragActive
              ? "border-blue-500 bg-blue-50"
              : uploadedImageUrl
              ? "border-green-300 bg-green-50"
              : "border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => !uploadedImageUrl && document.getElementById("file-input").click()}
        >
          <input
            type="file"
            id="file-input"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          {uploadedImageUrl ? (
            // Hiển thị ảnh đã upload
            <div className="relative">
              <img
                src={uploadedImageUrl}
                alt="Uploaded thumbnail"
                className="max-w-full max-h-64 mx-auto rounded-lg shadow-md"
              />
              <div className="absolute top-2 right-2">
                <CheckCircleIcon className="h-8 w-8 text-green-500 bg-white rounded-full p-1 shadow-md" />
              </div>
            </div>
          ) : selectedFile ? (
            // Preview file đã chọn
            <div className="space-y-4">
              <PhotoIcon className="h-16 w-16 text-blue-500 mx-auto" />
              <div>
                <p className="text-lg font-medium text-gray-900">Ready to upload</p>
                <p className="text-sm text-gray-600 mt-1">{selectedFile.name}</p>
                <p className="text-xs text-gray-500">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
          ) : (
            // Default upload area
            <div className="space-y-4">
              <CloudArrowUpIcon className="h-16 w-16 text-gray-400 mx-auto" />
              <div>
                <p className="text-lg font-medium text-gray-900">
                  Drop your image here, or{" "}
                  <span className="text-blue-600">browse</span>
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Supports JPG, PNG, GIF up to 10MB
                </p>
              </div>
            </div>
          )}
        </div>

        {/* File info */}
        {selectedFile && !uploadedImageUrl && (
          <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <PhotoIcon className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm font-medium text-blue-900">{selectedFile.name}</p>
                  <p className="text-xs text-blue-600">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleReset();
                }}
                className="text-blue-500 hover:text-blue-700 transition-colors"
              >
                <XCircleIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mb-4">
        {selectedFile && !uploadedImageUrl && (
          <button
            onClick={handleUpload}
            disabled={loading}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
              loading
                ? "bg-blue-400 cursor-not-allowed text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg"
            }`}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                Uploading...
              </>
            ) : (
              <>
                <CloudArrowUpIcon className="h-5 w-5" />
                Upload Image
              </>
            )}
          </button>
        )}

        {uploadedImageUrl && (
          <>
            <button
              onClick={handleReset}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
            >
              <PhotoIcon className="h-5 w-5" />
              Change Image
            </button>
            <button
              onClick={handleDelete}
              disabled={loading}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                loading
                  ? "bg-red-400 cursor-not-allowed text-white"
                  : "bg-red-600 hover:bg-red-700 text-white shadow-md hover:shadow-lg"
              }`}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  Deleting...
                </>
              ) : (
                <>
                  <TrashIcon className="h-5 w-5" />
                  Delete
                </>
              )}
            </button>
          </>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center gap-2">
            <XCircleIcon className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* Success Message with URL */}
      {uploadedImageUrl && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-start gap-2">
            <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-green-800 mb-1">
                Image uploaded successfully!
              </p>
              <p className="text-xs text-green-700 break-all">
                <span className="font-medium">URL:</span>{" "}
                <a
                  href={uploadedImageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:no-underline"
                >
                  {uploadedImageUrl}
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;