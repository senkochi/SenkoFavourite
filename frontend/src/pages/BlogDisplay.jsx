import React from "react";
import Banner from "../assets/product-banner.jpg";
import BlogCard from "../components/BlogCard";
import axiosInstance from "../utils/axiosInstance";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const BlogDisplay = () => {
  const [blogs, setBlogs] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axiosInstance.get("/api/blog");
        setBlogs(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading blogs</div>;

  return (
    <div className="page-container">
      <div className="relative h-[50vh]">
        <div className="absolute inset-0">
          <img
            src={Banner}
            alt="product banner"
            className=" object-cover object-center w-full h-full"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <div className="relative flex flex-col gap-8 items-center justify-center text-center h-full">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-400">
            Take her home
          </h1>
          <p className="text-gray-400 md:text-2xl">
            and make you the happiest person ever
          </p>
        {authState.isAuthenticated ? (
          <button onClick={() => navigate("/blog/create")} className="bg-gray-400 px-6 py-2 rounded-full text-lg font-content
                                    transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
              Get Started
            </button>
        ) : (
          <button onClick={() => navigate("/login")} className="bg-gray-400 px-6 py-2 rounded-full text-lg font-content
                                    transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
              Get Started
            </button>
        )}
            
        </div>
      </div>
      <div className="flex flex-col gap-5 items-center my-8">

        {blogs.map((blog) => (
          <Link key={blog.blogId} to={`/blog/${blog.slug}`}>
            <BlogCard
              title={blog.title}
              briefContent={blog.briefContent}
              content={blog.content}
              thumbnail={blog.thumbnail}
              creator={blog.creator}
              creatorAvatar={blog.creatorAvatar}
              createAt={blog.createAt}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogDisplay;
