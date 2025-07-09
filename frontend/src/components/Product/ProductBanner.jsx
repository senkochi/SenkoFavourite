import React from 'react'
import Banner from '../../assets/product-banner.jpg';

const ProductBanner = () => {
  return (
    <div className='relative h-[50vh]'> 
        <div className='absolute inset-0'>
            <img src={Banner} alt="product banner" 
            className=' object-cover object-center w-full h-full'/>
            <div className='absolute inset-0 bg-black opacity-50'></div>
        </div>
        <div className='relative flex flex-col gap-8 items-center justify-center text-center h-full'>
            <h1 className='text-4xl md:text-5xl font-bold text-gray-400'>
                Take her home
            </h1>
            <p className='text-gray-400 md:text-2xl'>
                and make you the happiest person ever
            </p>
        </div>
    </div>
  )
}

export default ProductBanner