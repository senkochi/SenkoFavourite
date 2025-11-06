import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance"; // <-- Đảm bảo import axiosInstance

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    role: null,
    loading: true,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && typeof token === 'string' && token.split('.').length === 3) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const role = decodedToken.role || []; // Lấy vai trò từ token
        const username = decodedToken.sub; // Tên người dùng thường nằm trong 'sub' claim

        const currentTime = Date.now() / 1000; // Thời gian hiện tại tính bằng giây (Unix timestamp)
        
        if (decodedToken.exp < currentTime) {
          // Token hết hạn
          localStorage.removeItem("token");
          // Xóa header Authorization khỏi axiosInstance khi token hết hạn
          delete axiosInstance.defaults.headers.common['Authorization']; 
          setAuthState({ isAuthenticated: false, user: null, role: null, loading: false });
          toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
        } else {
          // Token hợp lệ
          setAuthState({ isAuthenticated: true, user: username, role: role, loading: false });
          // QUAN TRỌNG: Thiết lập Authorization header cho axiosInstance
          // Điều này đảm bảo các yêu cầu sau khi refresh trang vẫn có token
          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
      } catch (error) {
        // Lỗi giải mã token (token bị hỏng)
        console.error("Error decoding token from localStorage:", error);
        localStorage.removeItem("token");
        // Xóa header Authorization khỏi axiosInstance khi token bị hỏng
        delete axiosInstance.defaults.headers.common['Authorization']; 
        setAuthState({ isAuthenticated: false, user: null, role: null, loading: false });
        toast.error("Token không hợp lệ hoặc bị hỏng. Vui lòng đăng nhập lại.");
      }
    } else {
      // Không có token hoặc token không đúng định dạng
      localStorage.removeItem("token"); // Đảm bảo không có token rác
      // Xóa header Authorization khỏi axiosInstance
      delete axiosInstance.defaults.headers.common['Authorization']; 
      setAuthState({ isAuthenticated: false, user: null, loading: false });
    }
  }, []); // Chạy một lần khi component mount

  // Hàm đăng nhập
  const login = (username, token) => {
    localStorage.setItem("token", token); // Lưu token vào localStorage
    
    // QUAN TRỌNG: Thiết lập Authorization header cho axiosInstance ngay sau khi đăng nhập thành công
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const role = decodedToken.role || []; // Lấy vai trò từ token
        const userFromToken = decodedToken.sub; // Tên người dùng thường nằm trong 'sub' claim

        console.log("Token đã được lưu:", token); // Log toàn bộ token thay vì chỉ payload
        console.log("Payload đã giải mã:", decodedToken);
        console.log("Người dùng đăng nhập:", userFromToken);
        console.log("Vai trò:", role);

        setAuthState({ isAuthenticated: true, user: userFromToken, role: role, loading: false });
    } catch (error) {
        console.error("Error decoding token after login:", error);
        localStorage.removeItem("token");
        delete axiosInstance.defaults.headers.common['Authorization']; // Xóa header nếu có lỗi
        setAuthState({ isAuthenticated: false, user: null, role: null, loading: false });
        toast.error("Lỗi khi xử lý token đăng nhập. Vui lòng thử lại.");
    }
  };

  // Hàm đăng xuất
  const logout = () => {
    localStorage.removeItem("token"); // Xóa token khỏi localStorage
    // QUAN TRỌNG: Xóa Authorization header khỏi axiosInstance khi đăng xuất
    delete axiosInstance.defaults.headers.common['Authorization'];
    setAuthState({ isAuthenticated: false, user: null, role: null, loading: false });
    toast.success("Logout successfully!");
    navigate("/"); // Chuyển hướng về trang chủ hoặc trang đăng nhập
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {authState.loading ? (
        <div className="flex items-center justify-center h-screen text-xl font-semibold">
          Đang tải trạng thái người dùng...
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};