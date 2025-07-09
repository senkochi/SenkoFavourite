import React from "react";

const StockStatus = ({ quantity }) => {
  if (quantity > 10) {
    return <span className="text-green-600 font-semibold text-xl">In Stock</span>;
  } else if (quantity > 0) {
    return (
      <span className="text-yellow-600 font-semibold text-xl">
        {quantity <= 3 ? `Only ${quantity} left!` : `Low Stock: ${quantity}`}
      </span>
    );
  } else {
    return (
      <div className="text-red-600 font-semibold flex flex-col gap-2 text-xl">
        <span>Out of Stock</span>
      </div>
    );
  }
};

export default StockStatus;
