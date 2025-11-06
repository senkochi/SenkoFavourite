import React, { useContext, useState } from 'react';
import AvatarCard from '../components/AvatarCard';
import axiosInstance from '../utils/axiosInstance';
import { useParams } from "react-router-dom";
import BlogEditor from '../components/BlogEditor';
import { AuthContext } from '../context/AuthContext';

const Blog = () => {
    const { slug } = useParams();
    const [blog, setBlog] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [approving, setApproving] = useState(false);
    const { authState } = useContext(AuthContext);

    React.useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axiosInstance.get(`/api/blog/${slug}`);
                setBlog(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
    }, [slug]);

    const handleApprove = async () => {
        if (!blog) return;
        setApproving(true);
        try {
            const nextStatus = blog.status === "Chờ duyệt" ? "Đã duyệt" : "Chờ duyệt";
            console.log(blog.blogId);
            const response = await axiosInstance.put(`/api/blog/admin/approve?blogId=${blog.blogId}`);
            if (response.status === 200) {
                alert(`Blog đã được chuyển sang trạng thái: ${nextStatus}`);
                setBlog({ ...blog, status: nextStatus });
            }
        } catch (error) {
            alert("Lỗi khi cập nhật trạng thái duyệt!");
        } finally {
            setApproving(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading blog data</div>;

    return (
        <div className='p-6 max-w-3xl mx-auto font-sans text-gray-800 mt-25 relative'>
            {/* Nút duyệt ở góc trên bên phải */}
            {authState.isAuthenticated && authState.role && authState.role.includes("ROLE_ADMIN") && (
                <div className="absolute top-6 right-6 z-10">
                    <button
                        className={`px-6 py-2 rounded-full font-bold transition shadow
                            ${blog.status === "Chờ duyệt" ? "bg-orange-400 text-white hover:bg-orange-500" : "bg-green-400 text-white hover:bg-green-500"}`}
                        onClick={handleApprove}
                        disabled={approving}
                    >
                        {blog.status === "Unapproved" ? "Duyệt blog này" : "Chuyển về chờ duyệt"}
                    </button>
                </div>
            )}
            <h2 className='blog-heading font-[heading-font]'>{blog.title}</h2>
            <p className='blog-brief mb-4'>{blog.briefContent}</p>
            <AvatarCard avatarUrl={blog.creatorAvatar} creator={blog.creator} createAt={blog.createAt} />
            {blog.content && (
                <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            )}
        </div>
    );
};

export default Blog;