import React from 'react'

const OrderHistory = () => {
  return (
    <div>
        <div class="p-4">
            <div class="max-w-screen-xl mx-auto">
                <div class="border-b border-gray-300 pb-4">
                    <div class="flex gap-4">
                        <h3 class="text-2xl font-semibold text-slate-900">Order History</h3>
                        <div class="ml-auto">
                            <select class="appearance-none cursor-pointer bg-gray-100 hover:bg-gray-200 border border-gray-300 outline-0 px-4 py-2 rounded-md text-[15px]">
                                <option>All orders</option>
                                <option>Completed</option>
                                <option>Processing</option>
                                <option>Cancelled</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="divide-y divide-gray-300 mt-4">
                    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 items-center justify-between gap-x-4 gap-y-6 py-4">
                        <div>
                            <h6 class="text-[15px] font-medium text-slate-900">Tshirt</h6>
                            <div class="mt-2">
                                <p class="text-[15px] text-slate-500 font-medium">Order ID: <span class="ml-1 text-slate-900">#5381</span></p>
                            </div>
                        </div>
                        <div>
                            <h6 class="text-[15px] font-medium text-slate-500">Date</h6>
                            <p class="text-[15px] text-slate-900 font-medium mt-2">May 12, 2025</p>
                        </div>
                        <div>
                            <h6 class="text-[15px] font-medium text-slate-500">Status</h6>
                            <p class="bg-green-100 text-[13px] font-medium text-green-600 mt-2 inline-block rounded-md py-1.5 px-3">Completed</p>
                        </div>
                        <div>
                            <h6 class="text-[15px] font-medium text-slate-500">Price</h6>
                            <p class="text-[15px] text-slate-900 font-medium mt-2">$20.00</p>
                        </div>
                        <div class="flex md:flex-wrap gap-4 lg:justify-end max-md:col-span-full">
                            <button type="button" class="text-[15px] font-medium px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white tracking-wide cursor-pointer max-md:w-full">Buy again</button>
                            <button type="button" class="text-[15px] font-medium px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-slate-900 tracking-wide cursor-pointer max-md:w-full">View</button>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 items-center justify-between gap-x-4 gap-y-6 py-4">
                        <div>
                            <h6 class="text-[15px] font-medium text-slate-900">Echo Elegance</h6>
                            <div class="mt-2">
                                <p class="text-[15px] text-slate-500 font-medium">Order ID: <span class="ml-1 text-slate-900">#9515</span></p>
                            </div>
                        </div>
                        <div>
                            <h6 class="text-[15px] font-medium text-slate-500">Date</h6>
                            <p class="text-[15px] text-slate-900 font-medium mt-2">April 22, 2025</p>
                        </div>
                        <div>
                            <h6 class="text-[15px] font-medium text-slate-500">Status</h6>
                            <p class="bg-blue-100 text-[13px] font-medium text-blue-600 mt-2 inline-block rounded-md py-1.5 px-3">Processing</p>
                        </div>
                        <div>
                            <h6 class="text-[15px] font-medium text-slate-500">Price</h6>
                            <p class="text-[15px] text-slate-900 font-medium mt-2">$24.00</p>
                        </div>
                        <div class="flex md:flex-wrap gap-4 lg:justify-end max-md:col-span-full">
                            <button type="button" class="text-[15px] font-medium px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white tracking-wide cursor-pointer max-md:w-full">Cancel</button>
                            <button type="button" class="text-[15px] font-medium px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-slate-900 tracking-wide cursor-pointer max-md:w-full">View</button>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 items-center justify-between gap-x-4 gap-y-6 py-4">
                        <div>
                            <h6 class="text-[15px] font-medium text-slate-900">Smart Watch Timex</h6>
                            <div class="mt-2">
                                <p class="text-[15px] text-slate-500 font-medium">Order ID: <span class="ml-1 text-slate-900">#8362</span></p>
                            </div>
                        </div>
                        <div>
                            <h6 class="text-[15px] font-medium text-slate-500">Date</h6>
                            <p class="text-[15px] text-slate-900 font-medium mt-2">May 7, 2025</p>
                        </div>
                        <div>
                            <h6 class="text-[15px] font-medium text-slate-500">Status</h6>
                            <p class="bg-red-100 text-[13px] font-medium text-red-600 mt-2 inline-block rounded-md py-1.5 px-3">Cancelled</p>
                        </div>
                        <div>
                            <h6 class="text-[15px] font-medium text-slate-500">Price</h6>
                            <p class="text-[15px] text-slate-900 font-medium mt-2">$20.00</p>
                        </div>
                        <div class="flex md:flex-wrap gap-4 lg:justify-end max-md:col-span-full">
                            <button type="button" class="text-[15px] font-medium px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white tracking-wide cursor-pointer max-md:w-full">Buy again</button>
                            <button type="button" class="text-[15px] font-medium px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-slate-900 tracking-wide cursor-pointer max-md:w-full">View</button>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 items-center justify-between gap-x-4 gap-y-6 py-4">
                        <div>
                            <h6 class="text-[15px] font-medium text-slate-900">Sunscreen</h6>
                            <div class="mt-2">
                                <p class="text-[15px] text-slate-500 font-medium">Order ID: <span class="ml-1 text-slate-900">#8195</span></p>
                            </div>
                        </div>
                        <div>
                            <h6 class="text-[15px] font-medium text-slate-500">Date</h6>
                            <p class="text-[15px] text-slate-900 font-medium mt-2">May 10, 2025</p>
                        </div>
                        <div>
                            <h6 class="text-[15px] font-medium text-slate-500">Status</h6>
                            <p class="bg-green-100 text-[13px] font-medium text-green-600 mt-2 inline-block rounded-md py-1.5 px-3">Completed</p>
                        </div>
                        <div>
                            <h6 class="text-[15px] font-medium text-slate-500">Price</h6>
                            <p class="text-[15px] text-slate-900 font-medium mt-2">$20.00</p>
                        </div>
                        <div class="flex md:flex-wrap gap-4 lg:justify-end max-md:col-span-full">
                            <button type="button" class="text-[15px] font-medium px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white tracking-wide cursor-pointer max-md:w-full">Buy again</button>
                            <button type="button" class="text-[15px] font-medium px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-slate-900 tracking-wide cursor-pointer max-md:w-full">View</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default OrderHistory