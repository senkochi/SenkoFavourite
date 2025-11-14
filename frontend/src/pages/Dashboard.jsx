import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SenkoLogo from "/Senko.png"; // Đổi đường dẫn nếu cần
import AdminOrder from "../components/Admin/AdminOrder";
import AdminBlog from "../components/Admin/AdminBlog";
import AdminProduct from "../components/Admin/AdminProduct";

const senkoTheme = {
  main: "min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-pink-100 flex items-center justify-center font-content mt-7",
  card: "w-full max-w-[96vw] bg-white rounded-2xl shadow-2xl border-4 border-yellow-300 p-0 flex mt-10 min-h-[80vh]",
  sidebar: "w-72 bg-yellow-100 rounded-l-2xl border-r-4 border-yellow-300 flex flex-col items-center py-10 gap-8 min-h-[85vh]",
  sidebarLogo: "w-20 h-20 rounded-full border-2 border-yellow-300 shadow mb-2",
  sidebarTab: "w-full px-8 py-4 text-left font-bold text-orange-700 bg-yellow-100 hover:bg-orange-300 rounded-xl transition cursor-pointer mb-2 text-lg",
  sidebarTabActive: "bg-orange-400 text-white border-orange-500",
  content: "flex-1 p-12 overflow-x-auto",
  heading: "text-4xl font-bold text-orange-500 mb-8 font-heading text-center",
  section: "bg-orange-50 rounded-xl p-8 shadow flex flex-col gap-6",
};

const tabs = [
  { key: "dashboard", label: "Overall" },
  { key: "orders", label: "Orders" },
  { key: "blog-request", label: "Blog Requests" },
  { key: "products", label: "Products" },
  { key: "users", label: "Users" },
  { key: "settings", label: "Settings" }
];

function SenkoDashboard() {
  const { tab } = useParams();
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("token") !== null;
  const currentTab = tab || "dashboard";

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isAuthenticated, navigate]);

  return (
    <div className={senkoTheme.main}>
      <div className={senkoTheme.card}>
        {/* Sidebar Tabs */}
        <aside
  className={`${senkoTheme.sidebar} overflow-y-auto`}
  style={{ maxHeight: "80vh" }}
>
  <img src={SenkoLogo} alt="Senko Fox" className={senkoTheme.sidebarLogo} />
  <h1 className="text-2xl font-bold text-orange-500 mb-8 font-heading">Senko Admin</h1>
  {tabs.map((t) => (
    <button
      key={t.key}
      className={`${senkoTheme.sidebarTab} ${currentTab === t.key ? senkoTheme.sidebarTabActive : ""}`}
      onClick={() => navigate(`/admin/${t.key}`)}
    >
      {t.label}
    </button>
  ))}
</aside>
        {/* Main Content */}
        <div className={senkoTheme.content}>
          <h2 className={senkoTheme.heading}>
            {tabs.find((t) => t.key === currentTab)?.label || "Senko Admin Dashboard"}
          </h2>
          <section>
            {currentTab === "dashboard" && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-white rounded-xl shadow border-2 border-yellow-200 p-8 flex flex-col items-center min-w-[220px]">
                    <span className="text-5xl font-bold text-orange-500">120</span>
                    <span className="text-orange-700 font-semibold mt-4 text-lg">Đơn hàng hôm nay</span>
                  </div>
                  <div className="bg-white rounded-xl shadow border-2 border-yellow-200 p-8 flex flex-col items-center min-w-[220px]">
                    <span className="text-5xl font-bold text-orange-500">8</span>
                    <span className="text-orange-700 font-semibold mt-4 text-lg">Blog requests</span>
                  </div>
                  <div className="bg-white rounded-xl shadow border-2 border-yellow-200 p-8 flex flex-col items-center min-w-[220px]">
                    <span className="text-5xl font-bold text-orange-500">5</span>
                    <span className="text-orange-700 font-semibold mt-4 text-lg">Sản phẩm mới</span>
                  </div>
                </div>
              </>
            )}
            {currentTab === "orders" && (
              <>
                <AdminOrder />
              </>
            )}
            {currentTab === "blog-request" && (
              <>
                <AdminBlog />
              </>
            )}
            {currentTab === "products" && (
              <>
                <AdminProduct />
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default SenkoDashboard;  