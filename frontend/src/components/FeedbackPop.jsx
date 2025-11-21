import React from "react";
import axiosInstance from "../utils/axiosInstance";
import { useToast } from "../context/ToastContext";

const FeedbackPop = ({ id, address = "" }) => {
  const { addToast } = useToast();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [order, setOrder] = React.useState([]);
  const [reviews, setReviews] = React.useState({});

  const initReviews = (items = []) =>
    items.reduce((acc, it) => {
      if (!acc[it.productId]) acc[it.productId] = { rating: 5, comment: "" };
      return acc;
    }, {});

  const openModal = async () => {
    setOpen(true);
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/api/order/detail/${id}`);
      if (res?.status === 200 && res.data) {
        setOrder(res.data);
        setReviews(initReviews(res.data));
      } else {
        addToast("Error fetching order details", "error");
      }
    } catch (err) {
      console.error(err);
      addToast("Error fetching order details", "error");
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setOpen(false);
    setOrder(null);
    setReviews({});
  };

  const handleChange = (productId, field) => (e) => {
    const value = field === "rating" ? Number(e.target.value) : e.target.value;
    setReviews((prev) => ({ ...prev, [productId]: { ...prev[productId], [field]: value } }));
  };

  const handleSubmit = async () => {
    const items = order;
    const payload = items.map((it) => {
      const r = reviews[it.productId] ?? { rating: 5, comment: "" }; 
      const rating = r.rating && r.rating >= 1 ? r.rating : 5;
      return { productId: it.productId, rating: rating, createdAt: "", content: (r.comment || "").trim(), user: null };
    });

    setSubmitting(true);
    try {
      await axiosInstance.post(`/api/order/${id}/feedbacks`, payload);
      addToast("Gửi nhận xét thành công", "success");
      closeModal();
    } catch (err) {
      console.error(err);
      addToast("Gửi nhận xét thất bại", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const ITEM_HEIGHT_PX = 120;

  return (
    <>
      <button
        onClick={openModal}
        style={{ fontFamily: "'Poppins', 'Montserrat', Arial, sans-serif", fontWeight: 600 }}
        className="text-[15px] font-medium px-4 py-2 rounded-md bg-orange-400 hover:bg-orange-500 text-white tracking-wide cursor-pointer max-md:w-full font-content shadow"
      >
        Comment
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => (submitting ? null : closeModal())} />

          <div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl mx-4 flex"
            style={{
              fontFamily: "'Poppins', 'Montserrat', Arial, sans-serif",
              maxHeight: "90vh",
              height: "90vh",         // quan trọng: đảm bảo flex children có chiều cao
              overflow: "hidden",
             display: "flex",
              flexDirection: "column"
            }}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-start justify-between p-4 border-b border-yellow-100">
                <h3 className="text-lg font-bold text-orange-600">Feedback for Order #{id}</h3>
                <button onClick={() => (submitting ? null : closeModal())} className="text-slate-500 hover:text-slate-700 p-2" aria-label="Close">✕</button>
              </div>

              <div className="p-4 border-b">
                <p className="text-sm text-slate-600">Shipping: {address || order?.shippingAddress || "No address provided"}</p>
              </div>

              <div className="px-4 pb-4 overflow-auto" style={{ flex: 1 }}>
                <div className="space-y-3">
                  {loading ? (
                    <div className="text-sm text-slate-600 p-4">Loading items...</div>
                  ) : (
                    order.map((item) => {
                      const r = reviews[item.productId] ?? { rating: 5, comment: "" };
                      return (
                        <div key={item.productId} className="p-3 bg-yellow-50 rounded-lg border border-yellow-100 flex gap-3 items-start" style={{ minHeight: `${ITEM_HEIGHT_PX}px` }}>
                          <img src={item.imgURL || "/placeholder.png"} alt={item.productName} className="w-16 h-16 object-cover rounded-md border border-orange-100" />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-semibold text-orange-700">{item.productName}</div>
                                <div className="text-xs text-slate-600">Qty: {item.quantity ?? 1}</div>
                              </div>
                              <div className="text-sm text-slate-600">Product ID: <span className="font-mono text-orange-600">{item.productId}</span></div>
                            </div>

                            <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
                              <div>
                                <label className="text-xs text-orange-700 font-medium">Rating</label>
                                <select value={r.rating} onChange={handleChange(item.productId, "rating")} className="mt-1 p-2 rounded-lg border border-orange-200 bg-white">
                                  <option value={5}>5 - Excellent</option>
                                  <option value={4}>4 - Good</option>
                                  <option value={3}>3 - Average</option>
                                  <option value={2}>2 - Poor</option>
                                  <option value={1}>1 - Terrible</option>
                                </select>
                              </div>

                              <div className="md:col-span-2">
                                <label className="text-xs text-orange-700 font-medium">Review</label>
                                <textarea
                                  value={r.comment}
                                  onChange={handleChange(item.productId, "comment")}
                                  rows={2}
                                  className="w-full mt-1 p-2 rounded-lg border border-orange-200 resize-y"
                                  placeholder="Write your review for this product..."
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              <div className="p-4 border-t border-yellow-100 flex items-center justify-end gap-3 bg-white">
                <button onClick={() => closeModal()} disabled={submitting} className="px-4 py-2 bg-gray-100 text-orange-700 rounded-full hover:bg-gray-200">Cancel</button>
                <button onClick={handleSubmit} disabled={submitting} className="px-4 py-2 bg-orange-400 text-white rounded-full hover:bg-orange-500">{submitting ? "Submitting..." : "Submit Feedback"}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FeedbackPop;