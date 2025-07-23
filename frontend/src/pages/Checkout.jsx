import React from "react";
import { useLocation } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { useState } from "react";

const Checkout = () => {
  const location = useLocation();
  const { subtotal, shipping, total, orderDetailList } = location.state || {};
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(false);

  const [paymentMethod, setPaymentMethod] = useState('card');

  const handlePaymentChange = (method) => {
    setPaymentMethod(method);
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
    return <div className="text-center mt-20">Order created successfully!</div>;
  }

  return (
    <div className="md:mt-20 mt-16">
      <div className="bg-white p-4">
        <div className="md:max-w-5xl max-w-xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 max-md:order-1">
              <h2 className="text-3xl font-semibold text-slate-900">
                Make a payment
              </h2>
              <p class="text-slate-500 text-sm mt-4">
                Complete your transaction swiftly and securely with our
                easy-to-use payment process.
              </p>
              <div class="mt-8 max-w-lg">
                <h3 class="text-lg font-semibold text-slate-900">
                  Choose your payment method
                </h3>
                <div class="flex flex-wrap gap-4 justify-between mt-6">
                  <div class="flex items-center">
                    <input
                      type="radio"
                      class="w-5 h-5 cursor-pointer"
                      id="card"
                       checked={paymentMethod === 'card'}
                        onChange={() => handlePaymentChange('card')}
                    />
                    <label for="card" class="ml-4 flex gap-2 cursor-pointer">
                      <img
                        src="https://readymadeui.com/images/visa.webp"
                        class="w-12"
                        alt="card1"
                      />
                    </label>
                  </div>
                  <div class="flex items-center">
                    <input
                      type="radio"
                      class="w-5 h-5 cursor-pointer"
                      id="cash"
                      checked={paymentMethod === 'cash'}
                      onChange={() => handlePaymentChange('cash')}
                    />
                    <label for="cash" class="ml-4 flex gap-2 cursor-pointer">
                      <img
                        src="https://readymadeui.com/images/paypal.webp"
                        class="w-20"
                        alt="paypalCard"
                      />
                    </label>
                  </div>
                </div>

                <form class="mt-12">
                  <div class="grid gap-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Cardholder's Name"
                        class="px-4 py-3.5 bg-gray-100 text-slate-900 w-full text-sm border border-gray-200 rounded-md focus:border-purple-500 focus:bg-transparent outline-0"
                      />
                    </div>
                    <div class="flex bg-gray-100 border border-gray-200 rounded-md focus-within:border-purple-500 focus-within:bg-transparent overflow-hidden">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-6 ml-3"
                        viewBox="0 0 32 20"
                      >
                        <circle
                          cx="10"
                          cy="10"
                          r="10"
                          fill="#f93232"
                          data-original="#f93232"
                        />
                        <path
                          fill="#fed049"
                          d="M22 0c-2.246 0-4.312.75-5.98 2H16v.014c-.396.298-.76.634-1.107.986h2.214c.308.313.592.648.855 1H14.03a9.932 9.932 0 0 0-.667 1h5.264c.188.324.365.654.518 1h-6.291a9.833 9.833 0 0 0-.377 1h7.044c.104.326.186.661.258 1h-7.563c-.067.328-.123.66-.157 1h7.881c.039.328.06.661.06 1h-8c0 .339.027.67.06 1h7.882c-.038.339-.093.672-.162 1h-7.563c.069.341.158.673.261 1h7.044a9.833 9.833 0 0 1-.377 1h-6.291c.151.344.321.678.509 1h5.264a9.783 9.783 0 0 1-.669 1H14.03c.266.352.553.687.862 1h2.215a10.05 10.05 0 0 1-1.107.986A9.937 9.937 0 0 0 22 20c5.523 0 10-4.478 10-10S27.523 0 22 0z"
                          class="hovered-path"
                          data-original="#fed049"
                        />
                      </svg>
                      <input
                        type="number"
                        placeholder="Card Number"
                        class="px-4 py-3.5 text-slate-900 w-full text-sm outline-0 bg-transparent"
                      />
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                      <div>
                        <input
                          type="number"
                          placeholder="EXP."
                          class="px-4 py-3.5 bg-gray-100 text-slate-900 w-full text-sm border border-gray-200 rounded-md focus:border-purple-500 focus:bg-transparent outline-0"
                        />
                      </div>
                      <div>
                        <input
                          type="number"
                          placeholder="CVV"
                          class="px-4 py-3.5 bg-gray-100 text-slate-900 w-full text-sm border border-gray-200 rounded-md focus:border-purple-500 focus:bg-transparent outline-0"
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleCreateOrder}
                    type="button"
                    class="mt-8 w-40 py-3 text-[15px] font-medium bg-purple-500 text-white rounded-md hover:bg-purple-600 tracking-wide cursor-pointer"
                  >
                    Pay
                  </button>
                </form>
              </div>
            </div>

            <div class="bg-gray-100 p-6 rounded-md">
              <ul class="text-slate-500 font-medium mt-8 space-y-4">
                <li class="flex flex-wrap gap-4 text-sm">
                  Subtotal{" "}
                  <span class="ml-auto font-semibold text-slate-900">
                    ${subtotal}.00
                  </span>
                </li>
                <li class="flex flex-wrap gap-4 text-sm">
                  Shipping{" "}
                  <span class="ml-auto font-semibold text-slate-900">
                    ${shipping}.00
                  </span>
                </li>
                <li class="flex flex-wrap gap-4 text-[15px] font-semibold text-slate-900 border-t border-gray-300 pt-4">
                  Total <span class="ml-auto">${total}.00</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
