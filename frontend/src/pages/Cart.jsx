import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import SenkoToast from "../components/SenkoToast";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const { authState } = React.useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [toast, setToast] = useState({ show: false, message: '', type: 'info' });
  
    const showToast = (message, type = 'info') => {
      setToast({ show: true, message, type });
      setTimeout(() => setToast({ show: false, message: '', type }), 3000);
    };

  const subtotal = products.reduce((sum, product) => {
    if (!product.isChecked) return sum; // Only include checked products in subtotal
    // Ensure product.price and product.quantity are defined
    return sum + (product.price || 0) * (product.quantity || 0);
  }, 0);

  const shipping = 2 * products.filter(product => product.isChecked).length; // Assuming $2 shipping per product
  const total = subtotal + shipping;
  const increase = (index) => {
    const newProducts = [...products];
    newProducts[index].quantity += 1;
    setProducts(newProducts);
    handleAddToCart(newProducts[index].productId, 1);
  };

  const decrease = (index) => {
    const newProducts = [...products];
    if (newProducts[index].quantity <= 1) return;
    // Ensure quantity does not go below 1
    newProducts[index].quantity = Math.max(1, newProducts[index].quantity - 1);
    setProducts(newProducts);
    // Only call handleAddToCart if quantity is greater than 1
    handleAddToCart(newProducts[index].productId, -1);
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!authState.isAuthenticated) {
        console.error("User is not authenticated");
        return;
      }
      setLoading(true);
      try {
        const response = await axiosInstance.get("/api/cart");
        const productWithChecked = response.data.map((product) => ({
          ...product,
          isChecked: false
        }));
        setProducts(productWithChecked);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [authState.isAuthenticated]);

  const handleAddToCart = async (productId, quantity) => {
    // Logic to add the product to the cart
    setError(null);
    try {
      console.log(productId, quantity);
      const response = await axiosInstance.post("/api/cart/add", {
        productId,
        quantity,
      });
      if (response.status === 200) {
        console.log("Product added to cart:", response.data);
      } else {
        setError("Không thể thêm sản phẩm vào giỏ hàng.");
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      setError("Không thể thêm sản phẩm vào giỏ hàng.");
    }
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      setLoading(true);
      await axiosInstance.delete(`/api/cart/${productId}`);
      setProducts(
        products.filter((product) => product.productId !== productId)
      );
    } catch (error) {
      console.error("Error removing item from cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (productId) => (event) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.productId === productId
          ? { ...product, isChecked: event.target.checked }
          : product
      )
    );
  };

  const handleProceedToCheckout = () => {
    const selectedProducts = products.filter(p => p.isChecked);

    if (selectedProducts.length === 0) {
      showToast("Vui lòng chọn ít nhất một sản phẩm để thanh toán.", "info");
      return;
    }

    // Tạo danh sách OrderDetailDTO từ các sản phẩm đã chọn
    const orderDetailList = selectedProducts.map(product => ({
      productId: product.productId,
      quantity: product.quantity,
      // Bạn có thể thêm các trường khác nếu OrderDetailDTO của bạn có (ví dụ: priceAtTimeOfPurchase)
      // price: product.price // Nếu backend cần giá tại thời điểm mua
    }));

    navigate('/checkout', {
      state: {
        subtotal,
        shipping,
        total,
        orderDetailList: orderDetailList // Truyền danh sách sản phẩm đã chọn
      }
    });
  };

  if (loading) {
    return (
      <div className="page-container flex items-center justify-center h-screen">
        <p className="text-xl font-semibold text-slate-900">Đang tải giỏ hàng...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container flex items-center justify-center h-screen">
        <p className="text-xl text-red-600 font-semibold">{error}</p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="page-container flex items-center justify-center h-screen">
        <p className="text-xl font-semibold text-slate-900">Giỏ hàng của bạn trống.</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="max-w-5xl max-lg:max-w-2xl mx-auto p-4">
        <h1 className="text-xl font-semibold text-slate-900">Shopping Cart</h1>
        <div className="grid lg:grid-cols-3 lg:gap-x-8 gap-x-6 gap-y-8 mt-6">
          <div className="lg:col-span-2 space-y-6">
            {products.map((product, index) => (
              <div
                className="flex gap-4 bg-white px-4 py-6 rounded-md shadow-sm border border-gray-200"
                key={index}
              >
                <div className="flex gap-6 sm:gap-4 max-sm:flex-col">
                  <Checkbox
                    disableRipple // Tắt ripple effect
                    sx={{
                      "&.Mui-checked": {
                        color: "#FFB343", // Màu khi checkbox được chọn
                      },
                      "&:hover": {
                        backgroundColor: "transparent", // Không có background hover
                      },
                    }}
                    checked={product.isChecked}
                    onChange={handleCheckboxChange(product.productId)}
                  />
                  <div className="w-24 h-24 max-sm:w-24 max-sm:h-24 shrink-0">
                    <img
                      src={product.imgURL}
                      className="w-full h-full object-contain"
                      alt={product.productName}
                    />
                  </div>
                  <div className="flex flex-col gap-4">
                    <div>
                      <h3 className="text-sm sm:text-base font-semibold text-slate-900">
                        {product.productName}
                      </h3>
                    </div>
                    <div className="mt-auto">
                      <h3 className="text-sm font-semibold text-slate-900">
                        ${product.price}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="ml-auto flex flex-col">
                  <div className="flex items-start gap-4 justify-end">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 cursor-pointer fill-slate-400 hover:fill-pink-600 inline-block"
                      viewBox="0 0 64 64"
                    >
                      <path
                        d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                        data-original="#000000"
                      ></path>
                    </svg>

                    <svg
                      onClick={() => handleRemoveFromCart(product.productId)}
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 cursor-pointer fill-slate-400 hover:fill-red-600 inline-block"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                        data-original="#000000"
                      ></path>
                      <path
                        d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                        data-original="#000000"
                      ></path>
                    </svg>
                  </div>
                  <div className="flex items-center gap-3 mt-auto">
                    <button
                      type="button"
                      onClick={() => {
                        decrease(index);
                      }}
                      className="flex items-center justify-center w-[18px] h-[18px] cursor-pointer bg-slate-400 outline-none rounded-full"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-2 fill-white"
                        viewBox="0 0 124 124"
                      >
                        <path
                          d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z"
                          data-original="#000000"
                        ></path>
                      </svg>
                    </button>
                    <span className="font-semibold text-base leading-[18px]">
                      {product.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        increase(index);
                      }}
                      className="flex items-center justify-center w-[18px] h-[18px] cursor-pointer bg-slate-800 outline-none rounded-full"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-2 fill-white"
                        viewBox="0 0 42 42"
                      >
                        <path
                          d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"
                          data-original="#000000"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-md px-4 py-6 h-max shadow-sm border border-gray-200">
            <ul className="text-slate-500 font-medium space-y-4">
              <li className="flex flex-wrap gap-4 text-sm">
                Subtotal{" "}
                <span className="ml-auto font-semibold text-slate-900">
                  ${subtotal}.00
                </span>
              </li>
              <li className="flex flex-wrap gap-4 text-sm">
                Shipping{" "}
                <span className="ml-auto font-semibold text-slate-900">
                  ${shipping}.00
                </span>
              </li>
              
              <hr className="border-slate-300" />
              <li className="flex flex-wrap gap-4 text-sm font-semibold text-slate-900">
                Total <span className="ml-auto">${total}.00</span>
              </li>
            </ul>
            <div className="mt-8 space-y-4">
              <button
                onClick={handleProceedToCheckout}
                type="button"
                className="text-sm px-4 py-2.5 w-full font-medium tracking-wide bg-slate-800 hover:bg-slate-900 text-white rounded-md cursor-pointer"
              >
                Buy Now
              </button>
              <button
                type="button"
                className="text-sm px-4 py-2.5 w-full font-medium tracking-wide bg-slate-50 hover:bg-slate-100 text-slate-900 border border-gray-300 rounded-md cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
            <div className="mt-5 flex flex-wrap justify-center gap-4">
              <img
                src="https://readymadeui.com/images/master.webp"
                alt="card1"
                className="w-10 object-contain"
              />
              <img
                src="https://readymadeui.com/images/visa.webp"
                alt="card2"
                className="w-10 object-contain"
              />
              <img
                src="https://readymadeui.com/images/american-express.webp"
                alt="card3"
                className="w-10 object-contain"
              />
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
    </div>
  );
};

export default Cart;
