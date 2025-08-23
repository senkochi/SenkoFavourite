import React from 'react'
import DialogPop from './DialogPop';
import { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import formatDate from '../utils/dateFormat';
import OrderStatus from './OrderStatus';  

const OrdersTab = () => {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All orders');

    useEffect(() => {
        const fetchOrderHistory = async () => {
            setLoading(true);
            const response = await axiosInstance.get('/api/order/admin');
            if (response.status !== 200) {
                console.error('Failed to fetch order history');
                setLoading(false);
                return;
            }
            const data = response.data;
            setOrders(data);
            setLoading(false);
        };

        fetchOrderHistory();
    }, []);

    const filteredOrders = orders.filter((order) => {
        if (filter === 'All orders') return true;
        return order.status === filter;
    });

    if (loading) {
        return <div>Loading...</div>;
    }

  return (
    <div>
        <div class="p-4">
            <div class="max-w-screen-xl mx-auto">
                <div class="border-b border-gray-300 pb-4">
                    <div class="flex gap-4">
                        <h3 class="text-2xl font-semibold text-slate-900">Order History</h3>
                        <div class="ml-auto">
                            <select class="appearance-none cursor-pointer bg-gray-100 hover:bg-gray-200 border border-gray-300 outline-0 px-4 py-2 rounded-md text-[15px]"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            >
                                <option>All orders</option>
                                <option>Completed</option>
                                <option>Processing</option>
                                <option>Shipping  </option>
                                <option>Cancelled</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="divide-y divide-gray-300 mt-4">
                    {filteredOrders.length > 0 ? filteredOrders.map((order) => (
                        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 items-center justify-between gap-x-4 gap-y-6 py-4">
                        <div>
                            
                            <div class="mt-2">
                                <p class="text-[15px] text-slate-500 font-medium">Order ID: <span class="ml-1 text-slate-900">{order.orderId}</span></p>
                            </div>
                        </div>
                        <div>
                            <h6 class="text-[15px] font-medium text-slate-500">Name</h6>
                            <p class="text-[15px] text-slate-900 font-medium mt-2">{formatDate(order.createdAt)}</p>
                        </div>
                        <div>
                            <h6 class="text-[15px] font-medium text-slate-500">Date</h6>
                            <p class="text-[15px] text-slate-900 font-medium mt-2">{formatDate(order.createdAt)}</p>
                        </div>
                        <div>
                            <h6 class="text-[15px] font-medium text-slate-500">Status</h6>
                            <OrderStatus status={order.status} />
                        </div>
                        <div>
                            <h6 class="text-[15px] font-medium text-slate-500">Price</h6>
                            <p class="text-[15px] text-slate-900 font-medium mt-2">${order.total}.00</p>
                        </div>
                        <div class="flex md:flex-wrap gap-4 lg:justify-end max-md:col-span-full">
                            <button type="button" class="text-[15px] font-medium px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white tracking-wide cursor-pointer max-md:w-full">Delivering</button>
                            <DialogPop orderId={order.orderId} address={order.particular + ", " + order.ward + ", " + order.district + ", " + order.province} />
                            <button
        type="button"
        className="ml-auto text-[15px] font-medium px-4 py-2 rounded-md bg-red-100 hover:bg-red-200 text-red-600 border border-red-300 transition"
        style={{ minWidth: 100 }}
        onClick={() => {
            // TODO: Xử lý hủy đơn hàng ở đây
            alert(`Cancel order ${order.orderId}`);
        }}
    >
        Cancel
    </button>
                        </div>
                    </div>
                    )) : (
                        <div class="py-4">
                            <p class="text-center text-slate-500">No orders found.</p>
                        </div>
                    )}

                </div>
            </div>
        </div>
    </div>
  )
}

export default OrdersTab