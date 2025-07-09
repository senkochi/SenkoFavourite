import React from 'react'
import ProductBanner from '../components/Product/ProductBanner'
import ProductDisplay from '../components/Product/ProductDisplay'
import useScrollMemory from '../hook/useScrollMem'

const Products = () => {
  useScrollMemory();
  return (
    <div className='page-container'>
        <ProductBanner />
        <ProductDisplay />
        
    </div>
      
  )
}

export default Products