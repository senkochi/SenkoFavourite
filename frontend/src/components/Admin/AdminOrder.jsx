import React, { useEffect, useState } from 'react'
import AdminOrderPopup from './AdminOrderPopup';
import axiosInstance from '../../utils/axiosInstance';
import { formatDate } from '../../hook/dateProcess';
import { useToast } from '../../context/ToastContext';

const STATUS_OPTIONS = [
  "PENDING",
  "CONFIRMED",
  "DELIVERING",
  "DELIVERED",
  "CANCELLED"
];

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [popupIdx, setPopupIdx] = useState(null);

  const { addToast } = useToast();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axiosInstance.get('/api/order/admin');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching order details:', error);
        addToast('Error fetching order details', 'error');
      }
    };

    fetchOrderDetails();
  }, []);

  const handleStatusChange = async (idx, newStatus) => {
    const updated = [...orders];
    updated[idx].status = newStatus;
    setOrders(updated);
    console.log('Updating order status:', updated[idx]);
    const response = await axiosInstance.put(`/api/order/admin/update-status?orderId=${updated[idx].orderId}&status=${newStatus}`,
      { headers: { 'Content-Type': 'application/json' } }
    );
    if (response.status === 200) {
      console.log('Order status updated successfully');
      addToast('Order status updated successfully', 'success');
    }
    else {
      console.error('Error updating order status:', response);
      addToast('Error updating order status', 'error');
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
              <th className="py-3 px-6">Order ID</th>
              <th className="py-3 px-6">Customer</th>
              <th className="py-3 px-6">Order Date</th>
              <th className="py-3 px-6">Total</th>
              <th className="py-3 px-6">Status</th>
              <th className="py-3 px-6">Actions</th>
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