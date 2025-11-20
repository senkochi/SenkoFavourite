import React, { useEffect, useState } from 'react';
import DialogPop from './DialogPop';
import axiosInstance from '../utils/axiosInstance';
import formatDate from '../utils/dateFormat';
import { useNavigate } from 'react-router-dom';
import FeedbackPop from './FeedbackPop';

const SenkoTheme = {
  bg: "bg-gradient-to-br from-yellow-100 via-orange-100 to-pink-100 min-h-screen",
  card: "max-w-screen-xl mx-auto rounded-2xl shadow-xl border-2 border-yellow-300 p-6",
  heading: "text-2xl font-bold text-orange-500 font-heading",
  label: "text-[15px] font-medium text-orange-700 font-content",
  select: "appearance-none cursor-pointer bg-yellow-50 hover:bg-yellow-100 border border-yellow-300 outline-0 px-4 py-2 rounded-md text-[15px] font-content",
  orderRow: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 items-center justify-between gap-x-4 gap-y-6 py-4 bg-white rounded-xl shadow-sm border border-yellow-100 mb-3",
  orderId: "text-[15px] text-orange-700 font-medium font-content",
  date: "text-[15px] text-slate-900 font-medium mt-2 font-content",
  status: "bg-green-100 text-[13px] font-medium text-green-600 mt-2 inline-block rounded-md py-1.5 px-3 font-content",
  price: "text-[15px] text-orange-500 font-semibold mt-2 font-content",
  btn: "text-[15px] font-medium px-4 py-2 rounded-md bg-orange-400 hover:bg-orange-500 text-white tracking-wide cursor-pointer max-md:w-full font-content shadow",
  noOrder: "py-4 text-center text-orange-400 font-content",
};

const OrderStatus = {
  all: "ALL",
  processing: "PENDING",
  confirmed: "CONFIRMED",
  delivering: "DELIVERING", 
  delivered: "DELIVERED",
  cancelled: "CANCELLED",
}

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [status, setStatus] = useState(OrderStatus.all)

  const filterByStatus = (order) => {
    if (status === OrderStatus.all) return true;
    return order.status === status;
  }

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  }

  useEffect(() => {
    const fetchOrderHistory = async () => {
      setLoading(true);
      const response = await axiosInstance.get('/api/order/user');
      if (response.status !== 200) {
        console.error('Failed to fetch order history');
        setLoading(false);
        return;
      }
      setOrders(response.data);
      setLoading(false);
    };
    fetchOrderHistory();
  }, []);

  if (loading) {
    return (
      <div className={SenkoTheme.bg} style={{ fontFamily: "'Poppins', 'Montserrat', Arial, sans-serif" }}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-orange-400 text-xl font-content">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Poppins', 'Montserrat', Arial, sans-serif" }}>
      <div className={SenkoTheme.card}>
        <div className="border-b border-yellow-300 pb-4 mb-4 flex gap-4 items-center">
          <img
            src="/Senko.png"
            alt="Senko Fox"
            className="w-12 h-12 rounded-full border-2 border-yellow-300 shadow mr-2"
          />
          <h3 className={SenkoTheme.heading}>Senko-san Order History</h3>
          <div className="ml-auto">
            <select className={SenkoTheme.select} value={status} onChange={handleStatusChange}>
              <option value={OrderStatus.all}>{OrderStatus.all}</option>
              <option value={OrderStatus.processing}>{OrderStatus.processing}</option>
              <option value={OrderStatus.confirmed}>{OrderStatus.confirmed}</option>
              <option value={OrderStatus.delivering}>{OrderStatus.delivering}</option>
              <option value={OrderStatus.delivered}>{OrderStatus.delivered}</option>
              <option value={OrderStatus.cancelled}>{OrderStatus.cancelled}</option>
            </select>
          </div>
        </div>
        <div className="divide-y divide-yellow-100 mt-4">
          {orders && orders.length > 0 ? orders.filter(filterByStatus).map((order) => (
            <div className={SenkoTheme.orderRow} key={order.orderId}>
              <div>
                <p className={SenkoTheme.label}>Order ID:</p>
                <span className={SenkoTheme.orderId}>{order.orderId}</span>
              </div>
              <div>
                <p className={SenkoTheme.label}>Date</p>
                <span className={SenkoTheme.date}>{formatDate(order.createdAt)}</span>
              </div>
              <div>
                <p className={SenkoTheme.label}>Status</p>
                <span className={SenkoTheme.status}>{order.status}</span>
              </div>
              <div>
                <p className={SenkoTheme.label}>Price</p>
                <span className={SenkoTheme.price}>${order.total}.00</span>
              </div>
              <div className="flex md:flex-wrap gap-4 lg:justify-end max-md:col-span-full">
              {order.status === "DELIVERED" ? (
                <FeedbackPop id={order.orderId} address={`${order.particular}, ${order.ward}, ${order.district}, ${order.province}`} />
              ) : null}
              <DialogPop orderId={order.orderId} address={`${order.particular}, ${order.ward}, ${order.district}, ${order.province}`} />
              </div>
            </div>
          )) : (
            <div className={SenkoTheme.noOrder}>
              <p>No orders found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;