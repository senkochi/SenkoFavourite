import React, { use } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import dateFormat from '../../utils/dateFormat';
import { useNavigate } from 'react-router-dom';

const blogList = [
  {
    blogId: "BR001",
    thumbnail: "/senko-blog-1.jpg",
    title: "Blog về Senko mùa hè",
    brief: "Yêu cầu viết blog về Senko mùa hè, chia sẻ cảm nhận và trải nghiệm thú vị.",
    createdAt: "2024-08-25"
  },
  {
    blogId: "BR002",
    thumbnail: "/senko-blog-2.jpg",
    title: "Blog sản phẩm mới Senko",
    brief: "Giới thiệu sản phẩm mới Senko, đánh giá và cảm nhận từ người dùng.",
    createdAt: "2024-08-20"
  }
];

const AdminBlog = () => {

    const [blogs, setBlogs] = React.useState([]);

    const navigate = useNavigate();

    React.useEffect(() => { 
        const fetchBlogs = async () => {
            try {
                const response = await axiosInstance.get('/api/blog/admin');
                setBlogs(response.data);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        fetchBlogs();
    }, []);

    if (blogs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] bg-gradient-to-br from-yellow-100 via-orange-100 to-pink-100 rounded-2xl shadow-lg border-2 border-yellow-300 p-8">
        <img
          src="/Senko.png"
          alt="Senko Fox"
          className="w-20 h-20 rounded-full border-2 border-yellow-300 shadow mb-6"
        />
        <h2 className="text-2xl font-bold text-orange-500 mb-2 font-heading text-center">
          Không có blog nào cần duyệt!
        </h2>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {blogs.map(blog => (
        <div key={blog.blogId} className="bg-white rounded-xl shadow border-2 border-yellow-200 p-6 flex gap-6 items-center min-w-[320px]">
          <div className="flex-shrink-0">
            <img
              src={blog.thumbnail}
              alt={blog.title}
              className="w-24 h-24 object-cover rounded-xl border border-orange-200 bg-orange-50"
            />
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <span className="font-bold text-orange-500 text-lg">#{blog.blogId}</span>
            <div className="font-bold text-orange-700 text-base">{blog.title}</div>
            <div className="text-slate-700 text-sm">{blog.briefContent}</div>
            <div className="text-orange-400 text-xs">Ngày tạo: {dateFormat(blog.createAt)}</div>
            <button className="mt-2 px-4 py-2 bg-orange-400 text-white rounded-full font-semibold hover:bg-orange-500 transition self-start"
                    onClick={() => navigate(`/blog/${blog.slug}`)}
            >
              Xem chi tiết
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminBlog;