import React, { useEffect, useState } from 'react'
import AdminOrderPopup from './AdminOrderPopup';
import axiosInstance from '../../utils/axiosInstance';
import { formatDate } from '../../hook/dateProcess';

const STATUS_OPTIONS = [
  "COD",
  "VNPAY",
  "Chờ xác nhận",
  "Đã xác nhận",
  "Đang vận chuyển",
  "Đã giao",
  "Đã hủy"
];

const initialOrders = [
  {
    id: "#001",
    customer: "Nguyễn Văn A",
    date: "2024-10-01",
    total: "500.000 VND",
    status: "Đã giao",
    items: [
      { name: "Senko Figure", quantity: 1, price: "300.000 VND" },
      { name: "Senko Keychain", quantity: 2, price: "100.000 VND" }
    ]
  },
  {
    id: "#002",
    customer: "Trần Thị B",
    date: "2024-10-02",
    total: "1.200.000 VND",
    status: "Đang xử lý",
    items: [
      { name: "Senko T-shirt", quantity: 2, price: "600.000 VND" }
    ]
  }
];


const Order = () => {
  const [orders, setOrders] = useState([]);
  const [popupIdx, setPopupIdx] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axiosInstance.get('/api/order/admin');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    fetchOrderDetails();
  }, []);

  const handleStatusChange = async (idx, newStatus) => {
    const updated = [...orders];
    updated[idx].status = newStatus;
    setOrders(updated);
    console.log('Cập nhật trạng thái đơn hàng:', updated[idx]);
    const response = await axiosInstance.put(`/api/order/admin/update-status?orderId=${updated[idx].orderId}&status=${newStatus}`,
      { headers: { 'Content-Type': 'application/json' } }
    );
    if (response.status === 200) {
      console.log('Cập nhật trạng thái thành công');
    }
    else {
      console.error('Error updating order status:', response);
    }
  };

  const handleShowDetail = (idx) => {
    setPopupIdx(idx);
    document.body.style.overflow = "hidden";
  };

  const handleClosePopup = () => {
    setPopupIdx(null);
    document.body.style.overflow = "";
  };

  return (
    <div>
      <div style={{ maxHeight: "52vh"}}>
        <table className="min-w-[700px] w-full bg-white rounded-xl shadow border border-orange-200 overflow-y-auto">
          <thead>
            <tr className="bg-yellow-100 text-orange-700 text-lg">
              <th className="py-3 px-6">Mã đơn</th>
              <th className="py-3 px-6">Khách hàng</th>
              <th className="py-3 px-6">Ngày đặt</th>
              <th className="py-3 px-6">Tổng tiền</th>
              <th className="py-3 px-6">Trạng thái</th>
              <th className="py-3 px-6">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, idx) => (
              <tr key={order.id}>
                <td className="py-3 px-6">{order.orderId}</td>
                <td className="py-3 px-6">{order.username}</td>
                <td className="py-3 px-6">{formatDate(order.createdAt)}</td>
                <td className="py-3 px-6">{order.total}</td>
                <td className="py-3 px-6">
                  <select
                    className="px-2 py-1 rounded-lg border border-orange-300 text-orange-700 font-semibold bg-yellow-50"
                    value={order.status}
                    onChange={e => handleStatusChange(idx, e.target.value)}
                  >
                    {STATUS_OPTIONS.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </td>
                <td className="py-3 px-6">
                  <button
                    className="px-4 py-2 bg-orange-400 text-white rounded-full font-semibold hover:bg-orange-500 transition"
                    onClick={() => handleShowDetail(idx)}
                  >
                    Xem
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popup chi tiết đơn hàng */}
      {popupIdx !== null && (
        <AdminOrderPopup
          orders={orders}
          idx={popupIdx}
          handleClosePopup={handleClosePopup}
        />
      )}
    </div>
  )
}

export default Order