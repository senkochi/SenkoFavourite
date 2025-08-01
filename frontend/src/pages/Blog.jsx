import React from 'react'
import AvatarCard from '../components/AvatarCard'
import axiosInstance from '../utils/axiosInstance'
import { useParams } from "react-router-dom";
import BlogEditor from '../components/BlogEditor';

const Blog = () => {
    const { slug } = useParams();
    const [blog, setBlog] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

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
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading blog data</div>;

    return (
        <div className='p-6 max-w-3xl mx-auto font-sans text-gray-800 mt-13'>
            <h2 className='blog-heading font-[heading-font]'>{blog.title}</h2>
            <p className='blog-brief mb-4'>{blog.briefContent}</p>
            <AvatarCard avatarUrl={blog.creatorAvatar} creator={blog.creator} createAt={blog.createAt} />
        {/* <p className='blog-content font-[content-font] mt-13'>{blog.content}</p> */}
        {blog.content && (
                <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            )}
        </div>
    )
}

export default Blog