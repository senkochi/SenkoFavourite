# 🦊 SenkoFavourite — Blog & E-commerce for Senko-san Lovers

> *“Một góc nhỏ ấm áp dành cho những ai yêu mến cô cáo Senko-san.”*

---

## 📖 Giới thiệu

**SenkoFavourite** là một web app kết hợp giữa **blog** và **e-commerce**, được xây dựng bằng **React** (frontend) và **Spring Boot** (backend). Ứng dụng cho phép người dùng vừa đọc các bài viết, vừa mua sắm các sản phẩm liên quan đến **Senko-san**, từ mech, figure, đến artwork.

Dự án hướng đến một trải nghiệm nhẹ nhàng, thân thiện và mang phong cách **anime** — tái hiện thế giới dễ thương của Senko-san qua từng dòng mã.

---

## ⚙️ Công nghệ sử dụng

### Frontend

* **ReactJS** — Xây dựng giao diện người dùng.
* **TailwindCSS** — Tạo phong cách UI hiện đại, anime-style.
* **Axios** — Giao tiếp với API backend.
* **React Router** — Quản lý điều hướng trang.

### Backend

* **Spring Boot** — Xây dựng RESTful API mạnh mẽ.
* **Spring Security + JWT** — Xác thực và phân quyền người dùng.
* **Spring Data JPA (Hibernate)** — Làm việc với cơ sở dữ liệu.
* **MySQL** — Cơ sở dữ liệu chính.
* **Cloudinary** — Lưu trữ hình ảnh sản phẩm và avatar người dùng.
* **Mail Service** — Gửi email xác nhận đơn hàng / thông báo blog.

### Thanh toán & Tích hợp

* **VNPay API** — Thanh toán trực tuyến an toàn và tiện lợi.
* **Docker (dự kiến)** — Đóng gói và triển khai.

---

## 🪶 Tính năng nổi bật

* 🛒 **E-commerce:** CRUD sản phẩm, giỏ hàng, đặt hàng, thanh toán VNPay.
* ✍️ **Blog:** CRUD bài viết, hiển thị bài viết mới nhất.
* 👤 **Quản lý người dùng:** Đăng ký, đăng nhập, đổi mật khẩu, phân quyền (admin/user).
* 💌 **Email Service:** Gửi thông báo đơn hàng và xác nhận tài khoản.
* 🌸 **Anime UI:** Giao diện tươi sáng, mang phong cách dễ thương của Senko-san.
* ☁️ **Cloudinary Upload:** Upload ảnh sản phẩm, avatar.

---

## 💻 Yêu cầu hệ thống

| Thành phần  | Phiên bản khuyến nghị |
| ----------- | --------------------- |
| Node.js     | >= 18.0               |
| npm         | >= 9.0                |
| Java        | 17+                   |
| MySQL       | 8.0                   |
| Spring Boot | 3.x                   |
| RAM         | Tối thiểu 4GB         |

---

## 🚀 Cài đặt và chạy ứng dụng

### 1️⃣ Clone dự án

```bash
git clone https://github.com/<username>/SenkoFavourite.git
cd SenkoFavourite
```

### 2️⃣ Cài đặt frontend

```bash
cd frontend
npm install
npm run dev
```

Ứng dụng frontend sẽ chạy tại: `http://localhost:5173`

### 3️⃣ Cài đặt backend

```bash
cd backend
./mvnw spring-boot:run
```

Ứng dụng backend sẽ chạy tại: `http://localhost:8080`

> ⚠️ Trước khi chạy backend, hãy cấu hình file `application.properties` với thông tin database MySQL và VNPay credentials.

---

## 🔑 Tài khoản mẫu

| Loại tài khoản | Username | Password |
| -------------- | -------- | -------- |
| Admin          | admin    | 123456   |
| User           | user     | 123456   |

---

## 🧩 Giao diện (dự kiến)

* Trang chủ (Home)
* Trang sản phẩm (Shop)
* Trang blog (Articles)
* Trang chi tiết sản phẩm / bài viết
* Giỏ hàng & Thanh toán (Cart / Checkout)
* Quản lý sản phẩm (Admin)
* Quản lý bài viết (Admin)

---

## 🤝 Đóng góp

Chúng tôi rất hoan nghênh mọi đóng góp!

1. Fork repository này.
2. Tạo branch mới: `git checkout -b feature/your-feature-name`
3. Commit thay đổi: `git commit -m "Add your feature"`
4. Push branch: `git push origin feature/your-feature-name`
5. Tạo Pull Request.

---

## 📬 Liên hệ

Nếu bạn muốn góp ý hoặc thảo luận cùng nhóm phát triển:

* **Email:** [senkofav.team@gmail.com](mailto:senkofav.team@gmail.com)
* **GitHub Issues:** [Issues](https://github.com/<username>/SenkoFavourite/issues)

> 💬 *“SenkoFavourite — nơi Senko-san luôn mỉm cười đón chào bạn.”*
