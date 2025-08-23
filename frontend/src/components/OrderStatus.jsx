import React from 'react'

const OrderStatus = ({ status }) => {

    const colorSelect = () => {
        switch (status) {
            case 'Completed':
                return 'bg-green-100 text-green-600';
            case 'Processing':
                return 'bg-yellow-100 text-yellow-600';
            case 'Shipping':
                return 'bg-blue-100 text-blue-600';
            case 'Cancelled':
                return 'bg-red-100 text-red-600';
            default:
                return '';
        }
    };

  return (
    <div>
        <p class={`${colorSelect()} text-[13px] font-medium mt-2 inline-block rounded-md py-1.5 px-3`}>{status}</p>
    </div>
  )
}

export default OrderStatus