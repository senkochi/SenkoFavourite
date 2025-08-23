import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const OAuth2Success = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const username = searchParams.get("username");

  useEffect(() => {
    if (token) {
      // Gọi API backend để lấy thông tin user từ token (nếu cần)
      // Hoặc decode token để lấy username (nếu JWT chứa username)
      // Ví dụ: login(username, token);
      
      // Nếu backend trả về thêm username, bạn lấy từ query param hoặc gọi API /api/me
      login(username, token);
      navigate("/"); // Chuyển về trang chủ hoặc dashboard
    }
  }, [token, navigate]);

  return <div>Đang đăng nhập bằng Google...</div>;
};

export default OAuth2Success;