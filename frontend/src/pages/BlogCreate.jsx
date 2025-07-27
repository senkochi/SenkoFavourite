import React, { useState, useEffect, use } from 'react';
import ImageUploader from '../components/ImageUploader';
import BlogEditor from '../components/BlogEditor';
import generateSlug from '../hook/generateSlug';
import { toast } from 'react-hot-toast';
import axiosInstance from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';

const BlogCreate = () => {
  const [title, setTitle] = useState('');
  const [briefContent, setBriefContent] = useState('');
  const [content, setContent] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Hàm xử lý khi ImageUploader upload thành công
  const handleImageUpload = (imageUrl) => {
    setThumbnail(imageUrl);
  };

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

  // Hàm xử lý submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast.error('Please enter a title');
      return;
    }
    
    if (!briefContent.trim()) {
      toast.error('Please enter brief content');
      return;
    }
    
    if (!content.trim()) {
      toast.error('Please enter content');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const slug = generateSlug(title);
      const blogData = {
        title: title.trim(),
        briefContent: briefContent.trim(),
        content: content.trim(),
        thumbnail: thumbnail || null,
        slug: slug
      };
      
      const response = await axiosInstance.post('/api/blog/create', blogData);
      console.log('Blog data:', blogData);
      toast.success('Blog created successfully!');
      navigate(`/blog`); // Redirect to the newly created blog post
      
      // Reset form
      setTitle('');
      setBriefContent('');
      setContent('');
      setThumbnail('');
      
    } catch (error) {
      toast.error('Failed to create blog');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    return () => {
      // Cleanup: Xóa ảnh đã upload nhưng chưa publish
      if (thumbnail) {
        axiosInstance.delete("/api/images/delete", {
          params: { imageUrl: thumbnail },
        }).catch(err => console.log("Cleanup failed:", err));
      }
    };
  }, [thumbnail]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 mt-13">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Thumbnail Upload Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Blog Thumbnail</h2>
            <ImageUploader onImageUpload={handleImageUpload} />
          </div>

          {/* Title and Brief Content Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Blog Details</h2>
            
            {/* Title Input */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter your blog title..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200 text-lg"
                required
              />
              <p className="mt-1 text-sm text-gray-500">
                {title && `Slug: ${generateSlug(title)}`}
              </p>
            </div>

            {/* Brief Content Input */}
            <div>
              <label htmlFor="briefContent" className="block text-sm font-medium text-gray-700 mb-2">
                Brief Description *
              </label>
              <textarea
                id="briefContent"
                value={briefContent}
                onChange={(e) => setBriefContent(e.target.value)}
                placeholder="Write a brief description of your blog post..."
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200 resize-none"
                required
              />
              <p className="mt-1 text-sm text-gray-500">
                {briefContent.length}/200 characters
              </p>
            </div>
          </div>

          {/* Content Editor Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Blog Content *</h2>
            <BlogEditor 
              value={content}
              onChange={setContent}
              placeholder="Start writing your blog post..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-6">
            <button
              type="button"
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition duration-200"
              onClick={() => {
                setTitle('');
                setBriefContent('');
                setContent('');
                setThumbnail('');
              }}
            >
              Clear All
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-8 py-3 rounded-lg text-white font-medium transition duration-200 ${
                isSubmitting
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isSubmitting ? 'Publishing...' : 'Publish Blog'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogCreate;