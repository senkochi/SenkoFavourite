import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const SenkoTheme = {
  card: "max-w-md mx-auto mt-20 bg-white rounded-2xl shadow-xl border-4 border-yellow-300 p-8 flex flex-col items-center",
  heading: "text-2xl font-bold text-orange-500 mb-4 font-heading",
  info: "text-orange-700 text-base font-content mb-2",
  success: "bg-green-100 text-green-700 px-4 py-2 rounded font-semibold mb-4 font-content",
  fail: "bg-red-100 text-red-700 px-4 py-2 rounded font-semibold mb-4 font-content",
  detail: "text-slate-700 text-sm font-content mb-2",
  fox: "w-16 h-16 rounded-full border-2 border-yellow-300 shadow mb-4",
  btn: "mt-8 px-6 py-2 bg-orange-400 hover:bg-orange-500 text-white rounded-full font-semibold font-content shadow",
};

const VnpayReturn = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const vnp_TxnRef = params.get("vnp_TxnRef");
  const vnp_Amount = params.get("vnp_Amount");
  const vnp_OrderInfo = params.get("vnp_OrderInfo");
  const vnp_ResponseCode = params.get("vnp_ResponseCode");
  const vnp_TransactionStatus = params.get("vnp_TransactionStatus");
  const vnp_TransactionNo = params.get("vnp_TransactionNo");
  const vnp_PayDate = params.get("vnp_PayDate");
  const vnp_BankCode = params.get("vnp_BankCode");

  const [confirmState, setConfirmState] = useState({ loading: true, result: null });
  const localSuccess = vnp_ResponseCode === "00" && vnp_TransactionStatus === "00";

  useEffect(() => {
    const confirm = async () => {
      try {
        // Gọi backend để cập nhật trạng thái nếu IPN không chạy
        const res = await axiosInstance.get("/api/payment/vnpay/return-confirm" + location.search);
        setConfirmState({ loading: false, result: res.data });
      } catch (e) {
        setConfirmState({ loading: false, result: "confirm-error" });
        console.error("[VnpayReturn] confirm error:", e?.response?.data || e);
      }
    };
    confirm();
  }, [location.search]);

  const backendSuccess = confirmState.result === "success";
  const isSuccess = backendSuccess || (confirmState.result === null && localSuccess);

  const amount = vnp_Amount ? (parseInt(vnp_Amount, 10) / 100).toLocaleString("vi-VN") + " VND" : "";

  const formatDate = (str) => {
    if (!str || str.length !== 14) return str;
    return `${str.slice(6, 8)}/${str.slice(4, 6)}/${str.slice(0, 4)} ${str.slice(8, 10)}:${str.slice(10, 12)}:${str.slice(12, 14)}`;
  };

  const statusBlock = () => {
    if (confirmState.loading)
      return <div className={SenkoTheme.info}>Đang xác nhận trạng thái thanh toán...</div>;
    if (isSuccess)
      return <div className={SenkoTheme.success}>Thanh toán thành công! Cảm ơn bạn 💖</div>;
    return (
      <div className={SenkoTheme.fail}>
        Thanh toán thất bại (code: {vnp_ResponseCode || vnp_TransactionStatus || "N/A"})!
      </div>
    );
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-pink-100 flex items-center justify-center"
      style={{ fontFamily: "'Poppins', 'Montserrat', Arial, sans-serif" }}
    >
      <div className={SenkoTheme.card}>
        <img src="/Senko.png" alt="Senko Fox" className={SenkoTheme.fox} />
        <h1 className={SenkoTheme.heading}>Senko-san Payment Result</h1>
        {statusBlock()}
        <div className={SenkoTheme.info}>
            <span className="font-bold">Mã đơn:</span> {vnp_TxnRef}
        </div>
        <div className={SenkoTheme.info}>
          <span className="font-bold">Số tiền:</span> {amount}
        </div>
        <div className={SenkoTheme.detail}>
          <span className="font-bold">Nội dung:</span> {decodeURIComponent(vnp_OrderInfo || "")}
        </div>
        <div className={SenkoTheme.detail}>
          <span className="font-bold">Mã giao dịch:</span> {vnp_TransactionNo}
        </div>
        <div className={SenkoTheme.detail}>
          <span className="font-bold">Ngân hàng:</span> {vnp_BankCode}
        </div>
        <div className={SenkoTheme.detail}>
          <span className="font-bold">Thời gian:</span> {formatDate(vnp_PayDate)}
        </div>
        <div className="text-xs text-slate-500 font-content mt-2 break-all">
          {confirmState.result && confirmState.result !== "success" && `Backend confirm: ${confirmState.result}`}
        </div>
        <button className={SenkoTheme.btn} onClick={() => (window.location.href = "/")}>
          Quay về trang chủ
        </button>
      </div>
    </div>
  );
};

export default VnpayReturn;