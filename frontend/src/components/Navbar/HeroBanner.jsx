import React from "react";
import Banner from "../../assets/hero-banner.jpg"

function HeroBanner() {
  return (
    <div className="relative h-screen">
        <div className="absolute inset-0">
            <img src={Banner} alt="Banner Image" className="object-cover object-center w-full h-full" />
            <div className="absolute inset-0 bg-black opacity-50 "></div>
        </div>
        <div className="relative flex flex-col gap-8 justify-center items-center h-full text-center">
            <h1 className="text-4xl font-content font-bold leading-tight text-[var(--dark-gray)]">
                SENKO-SAN
            </h1>
            <p className="text-gray-400 font-content">
                Discover and buy anything about this cutie fox &#129418; 
            </p>
            <a href="#" className="bg-gray-400 px-6 py-2 rounded-full text-lg font-content
                                    transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
                Get Started
            </a>
        </div>
    </div>
  );
}

export default HeroBanner;