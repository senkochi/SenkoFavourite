import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';

const senkoTheme = {
  main: "min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-pink-100 flex flex-col items-center font-content py-10",
  heading: "text-3xl font-bold text-orange-500 mb-8 font-heading text-center",
  grid: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-7xl px-4",
  card: "rounded-2xl border-2 border-orange-100 hover:border-orange-400 transition-all duration-300 flex flex-col items-center p-4",
  imgWrap: "w-full aspect-[4/5] rounded-xl overflow-hidden mb-3 flex items-center justify-center",
  img: "w-full h-full object-cover rounded-xl",
  title: "text-orange-600 font-bold text-base text-center mt-2",
};

const ImageGallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axiosInstance.get('/api/gallery/all/image');
        setImages(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };
    fetchImages();
  }, []);

  return (
    <div className={senkoTheme.main}>
      <h1 className={senkoTheme.heading}>Senko-san Image Gallery</h1>
      <div className={senkoTheme.grid}>
        {images.map((img, idx) => (
          <div key={idx} className={senkoTheme.card} onClick={() => window.open(img.imageUrl, '_blank')}>
            <div className={senkoTheme.imgWrap}>
              <img
                src={img.imageUrl}
                alt={img.title || `Senko image ${idx + 1}`}
                style={{ objectFit: "contain" }}
              />
            </div>
            <div className={senkoTheme.title}>{img.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;