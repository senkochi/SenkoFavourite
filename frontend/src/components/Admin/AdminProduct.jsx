// ...existing code...
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { useToast } from "../../context/ToastContext";

const senkoStyles = {
  page: "min-h-[70vh] bg-gradient-to-br from-yellow-100 via-orange-100 to-pink-100 p-8",
  card: "bg-white rounded-2xl shadow-2xl border-4 border-yellow-300 p-6",
  headingWrap: "flex items-center justify-between mb-6",
  title: "text-2xl font-bold text-orange-500",
  addBtn: "px-4 py-2 bg-orange-400 text-white rounded-full hover:bg-orange-500 transition shadow",
  tableWrap: "overflow-x-auto h-[330px]",
  table: "min-w-[900px] w-full bg-orange-50 rounded-xl shadow border border-orange-200",
  th: "py-3 px-4 text-left text-orange-700",
  td: "py-3 px-4 align-top",
  thumbnail: "w-16 h-16 object-cover rounded-md border border-orange-200 bg-white",
  actionBtn: "px-3 py-1 rounded-full text-white font-semibold",
  editBtn: "bg-yellow-400 text-orange-800 hover:bg-yellow-300",
  delBtn: "bg-pink-500 hover:bg-pink-600",
  emptyHolder: "flex flex-col items-center justify-center p-12 text-center gap-4 text-orange-700"
};

const STATUS_OPTIONS = ["Draft", "Published", "Archived"];

const AdminProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { addToast } = useToast();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get("/api/products/all"); // backend endpoint
        setProducts(res.data || []);
      } catch (err) {
        console.error("Fetch products error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAdd = () => navigate("/admin/products/new");

  const handleEdit = (slug) => navigate(`/admin/products/edit/${slug}`);
  
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axiosInstance.delete(`/api/products/admin/${id}`);
      await axiosInstance.delete(`/api/images/delete?imageUrl=${encodeURIComponent(products.find(p => p.productId === id)?.imageURL)}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      addToast("Product deleted successfully", "success");
      window.location.reload();
    } catch (err) {
      console.error("Delete product failed:", err);
      addToast("Delete product failed", "error");
    }
  };

  return (
      <div className={senkoStyles.card}>
        <div className={senkoStyles.headingWrap}>
          <h2 className={senkoStyles.title}>Product Management</h2>
          <div>
            <button className={senkoStyles.addBtn} onClick={handleAdd}>+ Add Product</button>
          </div>
        </div>

        {loading ? (
          <div className="py-12 text-center text-orange-600">Loading product list...</div>
        ) : products.length === 0 ? (
          <div className={senkoStyles.emptyHolder}>
            <img src="/Senko.png" alt="Senko" className="w-20 h-20 rounded-full border-2 border-yellow-300 shadow" />
            <h3 className="text-xl font-bold text-orange-500">No products found</h3>
            <p className="max-w-md">You can add new products to display in the store. Click the "Add Product" button to get started.</p>
            <button className="mt-2 px-6 py-2 bg-orange-400 text-white rounded-full hover:bg-orange-500 transition" onClick={handleAdd}>Create new product</button>
          </div>
        ) : (
          <div className={senkoStyles.tableWrap} style={{ maxHeight: "60vh", overflowY: "auto" }}>
            <table className={senkoStyles.table}>
              <thead>
                <tr>
                  <th className={senkoStyles.th}>Thumbnail</th>
                  <th className={senkoStyles.th}>ID</th>
                  <th className={senkoStyles.th}>Product name</th>
                  <th className={senkoStyles.th}>Unit price</th>
                  <th className={senkoStyles.th}>Stock</th>
                  <th className={senkoStyles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => {
                  const id = p.productId;
                  const price = typeof p.price === "number" ? p.price.toLocaleString() + " USD" : p.price;
                  const stock = p.quantity ?? "-";
                  return (
                    <tr key={id} className="odd:bg-white even:bg-orange-50">
                      <td className={senkoStyles.td}>
                        <img src={p.imageURL || "/placeholder.png"} alt={p.name} className={senkoStyles.thumbnail} />
                      </td>
                      <td className={senkoStyles.td}>
                        <div className="font-semibold text-orange-600">#{id}</div>
                      </td>
                      <td className={senkoStyles.td}>
                        <div className="font-semibold text-orange-700">{p.name}</div>
                      </td>
                      <td className={senkoStyles.td}>{price}</td>
                      <td className={senkoStyles.td}>{stock}</td>
                      
                      <td className={senkoStyles.td}>
                        <div className="flex gap-2">
                          <button className={`${senkoStyles.actionBtn} ${senkoStyles.editBtn}`} onClick={() => handleEdit(p.slug)}>Edit</button>
                          <button className={`${senkoStyles.actionBtn} ${senkoStyles.delBtn}`} onClick={() => handleDelete(p.productId)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
  );
};

export default AdminProduct;
