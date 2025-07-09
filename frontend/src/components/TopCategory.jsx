import React from 'react'
import accessories_pic from '../assets/category-accessories.jpg';
import figure_pic from '../assets/category-figure.jpg';
import manga_pic from '../assets/category-manga.jpg';

const TopCategory = () => {
  return (
    <div>
        <div className='text-center mt-20 mb-15'>
            <h1 className='text-3xl'>Top Categories</h1>
        </div>
        <div className='flex flex-col md:flex-row justify-between mx-15 font-content'>
            <div className='flex flex-col gap-10 items-center p-6'>
                <img src={manga_pic} alt="manga" className='w-80 rounded-full shadow-lg'/>
                <p className='font-bold text-2xl'>
                    Manga
                </p>
            </div>
            <div className='flex flex-col gap-10 items-center p-6'>
                <img src={figure_pic} alt="figure" className='w-80 rounded-full shadow-lg'/>
                <p className='font-bold text-2xl'>
                    Figures
                </p>
            </div>
            <div className='flex flex-col gap-10 items-center p-6'>
                <img src={accessories_pic} alt="accessories" className='w-80 rounded-full shadow-lg'/>
                <p className='font-bold text-2xl'>
                    Clothing and Accessories
                </p>
            </div>
        </div>
    </div>
  )
}

export default TopCategory