import React, { use } from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import IonIcon from "@reacticons/ionicons";
import NumberStepper from "../components/NumberStepper";
import StockStatus from "../components/StockStatus";
import DetailAndFeedback from "../components/Product/DetailAndFeedback";
import RelevantProduct from "../components/Product/RelevantProduct";
import ProductCarousel from "../components/ProductCarousel";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import SenkoToast from "../components/SenkoToast";

const ProductDetails = () => {
  const isAuthenticated = localStorage.getItem("token") !== null;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [related, setRelated] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const { slug } = useParams();

  const [toast, setToast] = useState({ show: false, message: '', type: 'info' });
  
    const showToast = (message, type = 'info') => {
      setToast({ show: true, message, type });
      setTimeout(() => setToast({ show: false, message: '', type }), 3000);
    };

  useEffect(() => {
    setLoading(true);
    setError(null);
    let isMounted = true;

    const fetchData = async () => {
      try {
        const [productRes, relatedRes] = await Promise.all([
          fetch(`/api/products/${slug}`),
          fetch(`/api/products/${slug}/related`),
        ]);

        if (!productRes.ok || !relatedRes.ok) {
          throw new Error("Network response was not ok");
        }

        const [productData, relatedData] = await Promise.all([
          productRes.json(),
          relatedRes.json(),
        ]);

        if (isMounted) {
          setProduct(productData);
          setRelated(relatedData);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setError("Không thể tải dữ liệu.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  const handleAddToCart = async (e) => {
    // Logic to add the product to the cart
    setError(null);
    if (!isAuthenticated) {
      showToast("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.", "error");
      return;
    }
    try {
       console.log(product.productId, quantity, product.name);
      const response = await axiosInstance.post('/api/cart/add', {
        productId: product.productId,
        quantity,
      });
      console.log(product.productId, quantity);
      if (response.status === 200) {
        showToast("Đã thêm sản phẩm vào giỏ hàng!", "success");
        console.log('Product added to cart:', response.data);
      } else {
        setError("Không thể thêm sản phẩm vào giỏ hàng.");
        console.log(response.data);
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
      setError('Không thể thêm sản phẩm vào giỏ hàng.');
    }
  }

  useEffect(() => {
    return () => {
      sessionStorage.setItem("scroll-position", window.scrollY.toString());
    };
  }, []);
  if (loading)
    return <div className="text-center mt-10">Đang tải sản phẩm...</div>;
  if (error)
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  if (!product)
    return <div className="text-center mt-10">Đang tải sản phẩm...</div>;
  return (
    <div className="flex page-container font-content justify-center mt-10">
      <div className="w-[1200px]">
        <div className="flex md:flex-row flex-col items-center md:items-start gap-8 md:mx-10 mx-5 mt-5">
          <div>
            <img
              src={product.imageURL}
              alt={product.name}
              className="w-[400px] h-[600px] object-scale-down object-top"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl">{product?.name}</h1>
            <div className="flex">
              <p>3.6</p>
              <Rating
                name="text-feedback"
                value={3.6}
                readOnly
                precision={0.5}
              />
              <p>(1000 ratings)</p>
            </div>

            <strong className="text-2xl py-3">${product?.price}</strong>
            <div className="flex items-center pb-5">
              <IonIcon name="storefront-outline"></IonIcon>
              <p>
                Shipping from{" "}
                <span className="font-semibold underline">{"Dong Nai"}</span>{" "}
              </p>
            </div>
            <div className="mb-3">
              <StockStatus quantity={product?.quantity}></StockStatus>
            </div>
            <div className="flex items-center gap-15 pb-10">
              <p>Quantity</p>
              <NumberStepper
                value={quantity}
                setValue={setQuantity}
                min={1}
                max={99}
              ></NumberStepper>
            </div>
            <div>
              <button onClick={handleAddToCart} className="md:w-50 w-full h-10 bg-yellow-300 rounded-full cursor-pointer hover:opacity-80 md:mr-5 mb-2">
                Add to cart
              </button>
              <button className="md:w-50 w-full h-10 bg-orange-400 rounded-full cursor-pointer hover:opacity-80">
                Buy now
              </button>
            </div>
          </div>
        </div>
        <RelevantProduct recommended={related}></RelevantProduct>
        <DetailAndFeedback product={product}></DetailAndFeedback>
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

export default ProductDetails;
