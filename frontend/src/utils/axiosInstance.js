// src/utils/axiosInstance.js

import axios from 'axios';
import { toast } from 'react-hot-toast'; // Import toast để hiển thị thông báo

// Tạo một instance Axios tùy chỉnh
const axiosInstance = axios.create({
  // Đảm bảo đây là URL gốc của API backend của bạn
  // Ví dụ: nếu tất cả API của bạn bắt đầu bằng http://localhost:8080/api
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// THÊM MỘT REQUEST INTERCEPTOR
// Interceptor này sẽ được thực thi TRƯỚC KHI mỗi yêu cầu được gửi đi.
// Mục đích: Tự động thêm Authorization header vào các yêu cầu cần xác thực.
axiosInstance.interceptors.request.use(
  (config) => {
    // Lấy token từ localStorage
    const token = localStorage.getItem('token');
    
    // Nếu có token, thêm nó vào Authorization header dưới dạng Bearer Token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Trả về cấu hình đã sửa đổi
    return config;
  },
  (error) => {
    // Xử lý lỗi nếu có trong quá trình cấu hình request (ví dụ: lỗi mạng trước khi gửi)
    return Promise.reject(error);
  }
);

// THÊM MỘT RESPONSE INTERCEPTOR
// Interceptor này sẽ được thực thi SAU KHI nhận được phản hồi từ server (thành công hoặc lỗi).
// Mục đích: Xử lý tập trung các lỗi phổ biến như 401 (Unauthorized) hoặc 403 (Forbidden).
axiosInstance.interceptors.response.use(
  (response) => {
    // Nếu phản hồi thành công (status 2xx), trả về nguyên trạng
    return response;
  },
  (error) => {
    // Xử lý lỗi phản hồi từ server
    if (error.response) {
      // Lỗi từ server (có response)
      console.error("API Error:", error.response.status, error.response.data);

      if (error.response.status === 401) {
        // Lỗi 401 Unauthorized: Token không hợp lệ hoặc hết hạn
        toast.error("Phiên đăng nhập đã hết hạn hoặc không hợp lệ. Vui lòng đăng nhập lại.");
        localStorage.removeItem('token'); // Xóa token cũ
        // Tùy chọn: Chuyển hướng người dùng về trang đăng nhập
        // window.location.href = '/login'; // Hoặc dùng navigate nếu bạn có quyền truy cập ở đây
      } else if (error.response.status === 403) {
        // Lỗi 403 Forbidden: Người dùng không có quyền truy cập
        toast.error("Bạn không có quyền truy cập tài nguyên này.");
      }
      // Các lỗi khác (400, 500, v.v.) có thể được xử lý cụ thể hơn ở từng component
    } else if (error.request) {
      // Yêu cầu đã được gửi nhưng không nhận được phản hồi (ví dụ: server không hoạt động)
      console.error("Network Error: No response received.", error.request);
      toast.error("Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng hoặc thử lại sau.");
    } else {
      // Lỗi khác xảy ra trong quá trình thiết lập yêu cầu
      console.error("Error setting up request:", error.message);
      toast.error("Đã xảy ra lỗi không xác định. Vui lòng thử lại.");
    }
    
    // Trả về lỗi để các catch block trong component có thể xử lý thêm
    return Promise.reject(error);
  }
);

export default axiosInstance;
