import React, { use } from "react";
import { useEffect, useState } from "react";
import ProductFilter from "./ProductFilter";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";
import { useSearchParams } from "react-router-dom";
import SenkoToast from "../SenkoToast";

const ProductDisplay = () => {
  const isAuthenticated = localStorage.getItem("token") !== null;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || 0;
  const [filters, setFilters] = useState({
    category: [],
  });
  const [totalPages, setTotalPages] = useState(0);

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
        const response = await axios.get(
          `/api/products?page=${page}&category=${filters.category.join(
            ","
          )}`
        );
        if (isMounted) {
          setProducts(response.data.products);
          setTotalPages(response.data.totalPages);
          setSearchParams;
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
  }, [page, filters]);

  useEffect(() => {
  // Lấy tất cả giá trị category từ URL (dạng mảng)
  const urlCategories = searchParams.getAll("category");
  // Nếu khác với state hiện tại thì cập nhật lại filters
  if (
    urlCategories.length !== filters.category.length ||
    !urlCategories.every((v, i) => v === filters.category[i])
  ) {
    setFilters((prev) => ({
      ...prev,
      category: urlCategories,
    }));
  }
  // eslint-disable-next-line
}, [searchParams]);

  const handlePageChange = (selectedPage) => {
    setSearchParams({
      page: selectedPage,
      ...(filters.category.length > 0 ? { category: filters.category } : {}),
    });
  };

  // Khi đổi filter, reset page về 0
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // Đưa category lên URL (dạng mảng)
    setSearchParams({
      page: 0,
      // Nếu có nhiều category, setSearchParams sẽ tự chuyển thành ?category=1&category=2
      ...(newFilters.category.length > 0
        ? { category: newFilters.category }
        : {}),
    });
  }; 

  const handleAddToCart = async (productId, quantity) => {
    // Logic to add the product to the cart
    setError(null);
    if (!isAuthenticated) {
      showToast("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.", "error");
      return;
    }
    try {
       console.log(productId);
      const response = await axiosInstance.post('/api/cart/add', {
        productId: productId,
        quantity
      });
      console.log(productId, 1);
      if (response.status === 200) {
        console.log('Product added to cart:', response.data);
        showToast("Sản phẩm đã được thêm vào giỏ hàng!", "success");
      } else {
        setError("Không thể thêm sản phẩm vào giỏ hàng.");
        console.log(response.data);
        showToast("Không thể thêm sản phẩm vào giỏ hàng.", "error");
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
      setError('Không thể thêm sản phẩm vào giỏ hàng.');
    }
  }

  return (
    <div className="flex md:flex-row flex-col">
      <div className="px-20">
        <ProductFilter filters={filters} onFilterChange={handleFilterChange} />
      </div>

      <div className="p-4 mx-auto lg:max-w-6xl md:max-w-4xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 sm:mb-8">
          Premium Threads
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
          {products?.map((product) => (
            <div key={product.id}
                 className="bg-white flex flex-col rounded overflow-hidden shadow-md hover:scale-[1.01] transition-all relative">
              <Link to={`/products/${product.slug}`}>
                <div class="w-full">
                  <img
                    src={product.imageURL}
                    alt={product.name}
                    className="w-full aspect-[18/24] object-cover object-top"
                  />
                </div>
                <div className="p-4">
                  <h5 className="text-sm sm:text-base font-semibold text-slate-900 line-clamp-2 min-h-[3rem]">
                    {product.name}
                  </h5>
                  <div className="mt-2 flex items-center flex-wrap gap-2">
                    <h6 className="text-sm sm:text-base font-semibold text-slate-900">
                      &#36;{product.price}
                    </h6>
                    <div
                      className="bg-slate-100 w-8 h-8 flex items-center justify-center rounded-full cursor-pointer ml-auto"
                      title="Wishlist"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16px"
                        class="fill-slate-800 inline-block"
                        viewBox="0 0 64 64"
                      >
                        <path
                          d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                          data-original="#000000"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
              <div className="min-h-[50px] p-4 !pt-0">
                <button
                  type="button"
                  onClick={() => handleAddToCart(product.productId, 1)}
                  class="absolute left-0 right-0 bottom-3 max-w-[88%] mx-auto text-sm px-2 py-2 font-medium w-full bg-amber-300 hover:bg-amber-200 text-white tracking-wide outline-none border-none rounded"
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
        <div>
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            pageCount={totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={(page) => handlePageChange(page.selected)}
            containerClassName={"pagination"}
            previousClassName={"prev"}
            nextClassName={"next"}
            activeClassName={"active"}
          />
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

export default ProductDisplay;
