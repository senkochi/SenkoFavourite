import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import SenkoToast from "../components/SenkoToast";

const SenkoTheme = {
  main: "min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-pink-100 flex items-center justify-center font-content",
  card: "w-full max-w-3xl bg-white rounded-2xl shadow-2xl border-4 border-yellow-300 p-10 flex flex-col md:flex-row gap-8",
  left: "flex-1",
  right: "bg-orange-50 p-6 rounded-xl flex-1",
  heading: "text-3xl font-bold text-orange-500 mb-2 font-heading",
  subheading: "text-lg text-orange-700 mb-6 font-content",
  radioWrap: "flex gap-8 mt-6 mb-8",
  radio: "flex items-center gap-3 cursor-pointer",
  radioLabel: "ml-2 text-base font-semibold text-orange-700",
  payBtn: "mt-8 w-48 py-3 text-lg font-bold bg-orange-400 hover:bg-orange-500 text-white rounded-full shadow-lg tracking-wide cursor-pointer font-content",
  input: "px-4 py-3.5 bg-gray-100 text-slate-900 w-full text-sm border border-gray-200 rounded-md focus:border-orange-400 focus:bg-transparent outline-0 mb-4",
  error: "text-red-600 font-bold mt-4",
  fox: "w-16 h-16 rounded-full border-2 border-yellow-300 shadow mb-4 mx-auto",
};

const Checkout = () => {
  const location = useLocation();
  const { subtotal, shipping, total, orderDetailList } = location.state || {};
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("vnpay");

  const handlePaymentChange = (method) => setPaymentMethod(method);

  const [toast, setToast] = useState({ show: false, message: '', type: 'info' });
  
    const showToast = (message, type = 'info') => {
      setToast({ show: true, message, type });
      setTimeout(() => setToast({ show: false, message: '', type }), 3000);
    };

  const handleVnpayPayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post("/api/payment/vnpay/create-url", {
        amount: total,
        orderInfo: "Thanh toán đơn hàng Senko",
        orderType: "other",
        locale: "vn",
        orderDetailList: orderDetailList,
      });
      if (response.data.url) {
        window.location.href = response.data.url;
      } else {
        showToast(response.data.error, "error");
      }
    } catch (err) {
      showToast("Không thể tạo thanh toán VNPAY. Vui lòng thử lại.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCashPayment = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const orderCreationPayload = {
        paymentMethod: paymentMethod,
        orderDetailList: orderDetailList, // Danh sách OrderDetailDTO đã đóng gói
      };
      const response = await axiosInstance.post("/api/order/create", orderCreationPayload);
      // Handle successful order creation
      if (response.status === 200) {
        setSuccess(true);
      } else {
        showToast(response.data.error, "error");
      }
    } catch (err) {
      showToast(err.response.data.error, "error");
      console.error("Error creating order:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrder = async () => {
    // Logic to create an order goes here
    try {
      setLoading(true);
      const orderCreationPayload = {
        paymentMethod: paymentMethod,
        orderDetailList: orderDetailList, // Danh sách OrderDetailDTO đã đóng gói
      };
      const response = await axiosInstance.post("/api/order", orderCreationPayload);
      // Handle successful order creation
      if (response.status === 200) {
        setSuccess(true);
        console.log("Order created successfully:", response.data);
      }
    } catch (err) {
      setError("Failed to create order. Please try again.");
      console.error("Error creating order:", err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className={SenkoTheme.main}>
        <div className={SenkoTheme.card + " flex-col items-center"}>
          <img src="/Senko.png" alt="Senko Fox" className={SenkoTheme.fox} />
          <h2 className={SenkoTheme.heading}>Cảm ơn bạn đã đặt hàng!</h2>
          <p className={SenkoTheme.subheading}>
            Đơn hàng của bạn sẽ được xử lý và giao trong thời gian sớm nhất.
          </p>
          <button className={SenkoTheme.payBtn} onClick={() => window.location.href = "/"}>
            Quay về trang chủ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={SenkoTheme.main}>
      <div className={SenkoTheme.card}>
        <div className={SenkoTheme.left}>
          <img src="/Senko.png" alt="Senko Fox" className={SenkoTheme.fox} />
          <h2 className={SenkoTheme.heading}>Thanh toán Senko-san</h2>
          <p className={SenkoTheme.subheading}>
            Chọn phương thức thanh toán phù hợp với bạn.
          </p>
          <form>
            <div className={SenkoTheme.radioWrap}>
              <label className={SenkoTheme.radio}>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "vnpay"}
                  onChange={() => handlePaymentChange("vnpay")}
                  className="accent-orange-500 w-5 h-5"
                />
                <span className={SenkoTheme.radioLabel}>
                  <img src="/vnpay-logo.png" alt="VNPAY" className="w-10 inline-block mr-2" />
                  VNPAY (ATM/QR)
                </span>
              </label>
              <label className={SenkoTheme.radio}>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "cash"}
                  onChange={() => handlePaymentChange("cash")}
                  className="accent-orange-500 w-5 h-5"
                />
                <span className={SenkoTheme.radioLabel}>
                  <img src="/cash.png" alt="Tiền mặt" className="w-8 inline-block mr-2" />
                  Tiền mặt khi nhận hàng
                </span>
              </label>
            </div>
            {paymentMethod === "vnpay" ? (
              <button
                type="submit"
                className={SenkoTheme.payBtn}
                disabled={loading}
                onClick={handleVnpayPayment}
              >
                {loading ? "Đang xử lý..." : "Thanh toán qua VNPAY"}
              </button>
            ) : (
              <button
                type="submit"
                className={SenkoTheme.payBtn}
                disabled={loading}
                onClick={handleCashPayment}
              >
                {loading ? "Đang xử lý..." : "Đặt hàng (Thanh toán tiền mặt)"}
              </button>
            )}
            {error && <div className={SenkoTheme.error}>{error}</div>}
          </form>
        </div>
        <div className={SenkoTheme.right}>
          <h3 className="text-xl font-bold text-orange-600 mb-4">Thông tin đơn hàng</h3>
          <ul className="text-slate-700 font-medium space-y-3">
            <li className="flex justify-between text-base">
              <span>Tạm tính</span>
              <span className="font-bold">{subtotal} VND</span>
            </li>
            <li className="flex justify-between text-base">
              <span>Phí vận chuyển</span>
              <span className="font-bold">{shipping} VND</span>
            </li>
            <li className="flex justify-between text-lg font-bold border-t border-orange-300 pt-3">
              <span>Tổng cộng</span>
              <span className="text-orange-600">{total} VND</span>
            </li>
          </ul>
          <div className="mt-8">
            <h4 className="text-base font-semibold text-orange-700 mb-2">Sản phẩm</h4>
            <ul className="space-y-2">
              {orderDetailList && orderDetailList.map((item, idx) => (
                <li key={idx} className="flex justify-between text-sm">
                  <span>{item.productName} x {item.quantity}</span>
                  <span>{item.price} VND</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {toast.show && (
          <SenkoToast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast({ show: false, message: '', type: 'info' })}
          />
        )}
    </div>
  );
};

export default Checkout;