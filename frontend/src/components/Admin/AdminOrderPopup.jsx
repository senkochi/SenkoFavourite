import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { formatDate } from '../../hook/dateProcess';

const AdminOrderPopup = (props) => {
  const { orders, idx, handleClosePopup } = props;
  const [orderDetails, setOrderDetails] = useState(null);
  const id = orders[idx].orderId;

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axiosInstance.get(`/api/order/detail/${id}`);
        setOrderDetails(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    fetchOrderDetails();
  }, [id, orders]);

  return (
    <div>
      <div
        className="fixed inset-0 bg-black/50 bg-opacity-60 flex items-center justify-center z-50"
        onClick={handleClosePopup}
      >
        <div
          className="bg-white rounded-2xl shadow-2xl p-8 max-w-3xl w-full relative"
          onClick={e => e.stopPropagation()}
        >
          <button
            className="absolute top-4 right-4 bg-orange-400 hover:bg-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer font-bold text-xl"
            onClick={handleClosePopup}
            aria-label="Đóng"
          >
            ×
          </button>
          <h2 className="text-2xl font-bold text-orange-600 mb-4">
            Chi tiết đơn hàng {orders[idx].orderId}
          </h2>
          <div className="mb-2 text-orange-700 font-semibold">
            Khách hàng: {orders[idx].username}
          </div>
          <div className="mb-2 text-orange-700">
            Ngày đặt: {formatDate(orders[idx].createdAt)}
          </div>
          <div className="mb-2 text-orange-700">
            Tổng tiền: {orders[idx].total}
          </div>
          <div className="mb-4 text-orange-700">
            Trạng thái: {orders[idx].status}
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-[900px] w-full bg-orange-50 rounded-xl shadow border border-orange-200 mb-2">
              <thead>
                <tr className="bg-yellow-100 text-orange-700">
                  <th className="py-2 px-4">Ảnh</th>
                  <th className="py-2 px-4">Tên sản phẩm</th>
                  <th className="py-2 px-4">Đơn giá</th>
                  <th className="py-2 px-4">Số lượng</th>
                  <th className="py-2 px-4">Tổng tiền</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails?.map((item, i) => (
                  <tr key={i}>
                    <td className="py-2 px-4">
                      <img
                        src={item.imgURL}
                        alt={item.productName}
                        className="w-16 h-16 object-cover rounded-lg border border-orange-200 bg-white"
                      />
                    </td>
                    <td className="py-2 px-4">{item.productName}</td>
                    <td className="py-2 px-4">{item.price}</td>
                    <td className="py-2 px-4">{item.quantity}</td>
                    <td className="py-2 px-4 font-bold text-orange-600">
                      {item.totalPrice || (Number(item.price) * Number(item.quantity)).toLocaleString() + " VND"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderPopup;