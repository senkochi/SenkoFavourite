import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { useToast } from "../../context/ToastContext";
import ImageUploader from "../../components/ImageUploader";
import generateSlug from "../../hook/generateSlug";
const AdminProductEdit = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { addToast } = useToast();

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [product, setProduct] = useState({
    id: "",
    name: "",
    price: "",
    releaseDate: "",
    size: "",
    copyRight: "",
    quantity: "",
    manufacturerName: "",
    categoryName: "",
    material: "",
    imageURL: "",
    slug: "",
    artist: "",
  });

  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    axiosInstance
      .get(`/api/products/${slug}`)
      .then((res) => {
        const p = res.data;
        setProduct({
          id: p.productId || "",
          name: p.name || "",
          price: p.price ?? "",
          releaseDate: p.releaseDate ?? "",
          size: p.size || "",
          copyRight: p.copyRight || "",
          quantity: p.quantity ?? "",
          manufacturerName: p.manufacturerName || "",
          categoryName: p.categoryName || "",
          material: p.material || "",
          imageURL: p.imageURL || "",
          slug: p.slug || "",
          artist: p.artist || "",
        });
        setPreview(p.imageURL || "");
      })
      .catch((err) => {
        console.error(err);
        addToast("Error fetching product information", "error");
      })
      .finally(() => setLoading(false));
  }, [slug]);

  // removed FileReader effect - ImageUploader provides upload + preview

  const handleChange = (key) => (e) => {
    const value = e.target.value;
    setProduct((prev) => ({ ...prev, [key]: value }));
  };

  const handleChangeProductName = (e) => {
    const name = e.target.value;
    setProduct((prev) => ({
      ...prev,
      name,
      slug: generateSlug(name),
    }));
  };

  // handler for ImageUploader callback
  const handleImageUpload = (imageUrl) => {
    setProduct((prev) => ({ ...prev, imageURL: imageUrl }));
    setPreview(imageUrl || "");
  };

  const validate = () => {
    if (!product.name.trim()) {
      addToast("Product name is required", "error");
      return false;
    }
    if (product.price === "" || isNaN(Number(product.price))) {
      addToast("Invalid product price", "error");
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setSaving(true);
    try {
      // build payload
      const payload = {
        productId: product.id,
        name: product.name,
        price: product.price,
        releaseDate: product.releaseDate || null,
        size: product.size,
        copyRight: product.copyRight,
        quantity: product.quantity,
        sku: product.sku,
        manufacturerName: product.manufacturerName,
        categoryName: product.categoryName,
        material: product.material,
        imageURL: product.imageURL,
        slug: product.slug,
        artist: product.artist,
      };

      // send JSON payload only — image already uploaded to Cloudinary by ImageUploader
      await axiosInstance.put(`/api/products/admin`, payload);

      addToast("Product saved successfully", "success");
      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      addToast("Failed to save product", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axiosInstance.delete(`/api/products/admin/${id}`);
      await axiosInstance.delete(`/api/images/delete?imageUrl=${encodeURIComponent(product.imageURL)}`);
      addToast("Product deleted successfully", "success");
      navigate("/admin/products");
    } catch (err) {
      console.error("Delete product failed:", err);
      addToast("Delete product failed", "error");
    }
  };

  // ...existing code for handleDelete, handleCancel...

  return (
    <div className="min-h-[70vh] bg-gradient-to-br from-yellow-100 via-orange-100 to-pink-100 p-8 mt-20">
      <div className="bg-white rounded-2xl shadow-2xl border-4 border-yellow-300 p-6 max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-orange-500">
            Edit Product
          </h2>
          <div className="flex gap-2">
              <button
                onClick={() => handleDelete(product.id)}
                className="px-4 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition"
              >
                Delete
              </button>
            <button
              onClick={() => navigate("/admin/products")}
              className="px-4 py-2 bg-gray-200 text-orange-700 rounded-full hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 bg-orange-400 text-white rounded-full hover:bg-orange-500 transition"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>

        {loading ? (
          <div className="py-12 text-center text-orange-600">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1 flex flex-col items-center gap-4">
              <div className="w-full bg-orange-50 rounded-lg p-4 flex flex-col items-center">
                <div className="w-48 h-48 bg-white rounded-lg overflow-hidden border border-orange-200 flex items-center justify-center">
                  {preview ? (
                    <img src={preview} alt="preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-orange-300">No image</div>
                  )}
                </div>

                {/* ImageUploader component (Cloudinary) */}
                <div className="w-full mt-3">
                  <ImageUploader onImageUpload={handleImageUpload} />
                </div>

                <div className="text-xs text-slate-600 mt-2">Recommended size: square, at least 300x300</div>
              </div>
            </div>

            <div className="col-span-2">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="text-sm font-semibold text-orange-700">Product Name</label>
                  <input value={product.name} onChange={handleChangeProductName} className="w-full mt-1 p-3 rounded-lg border border-orange-200" placeholder="Product Name" />
                </div>

                {/* ...rest of inputs unchanged... */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-orange-700">Release date</label>
                    <input type="date" value={product.releaseDate} onChange={handleChange("releaseDate")} className="w-full mt-1 p-3 rounded-lg border border-orange-200" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-orange-700">Copyright</label>
                    <input value={product.copyRight} onChange={handleChange("copyRight")} className="w-full mt-1 p-3 rounded-lg border border-orange-200" placeholder="Copyright / License" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-orange-700">Artist</label>
                    <input value={product.artist} onChange={handleChange("artist")} className="w-full mt-1 p-3 rounded-lg border border-orange-200" placeholder="Artist" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-orange-700">Manufacturer</label>
                    <input value={product.manufacturerName} onChange={handleChange("manufacturerName")} className="w-full mt-1 p-3 rounded-lg border border-orange-200" placeholder="Manufacturer" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-orange-700">Category</label>
                    <input value={product.categoryName} onChange={handleChange("categoryName")} className="w-full mt-1 p-3 rounded-lg border border-orange-200" placeholder="Category" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-orange-700">Material</label>
                    <input value={product.material} onChange={handleChange("material")} className="w-full mt-1 p-3 rounded-lg border border-orange-200" placeholder="Material" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-orange-700">Size</label>
                    <input value={product.size} onChange={handleChange("size")} className="w-full mt-1 p-3 rounded-lg border border-orange-200" placeholder="Size" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-orange-700">Price(USD)</label>
                    <input value={product.price} onChange={handleChange("price")} className="w-full mt-1 p-3 rounded-lg border border-orange-200" placeholder="0" inputMode="numeric" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-orange-700">Stock</label>
                    <input value={product.quantity} onChange={handleChange("quantity")} className="w-full mt-1 p-3 rounded-lg border border-orange-200" placeholder="Stock" />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="ml-auto text-sm text-slate-600">
                    <div>Product ID: <span className="font-mono text-orange-600">{product.id}</span></div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProductEdit;