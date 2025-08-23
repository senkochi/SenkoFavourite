import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const SenkoTheme = {
  main: "min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-pink-100 flex items-center justify-center font-content",
  card: "w-full max-w-5xl bg-white rounded-2xl shadow-2xl border-4 border-yellow-300 p-10 flex flex-col gap-10",
  heading: "text-3xl font-bold text-orange-500 mb-2 font-heading text-center",
  section: "mb-8",
  sectionTitle: "text-2xl font-bold text-orange-600 mb-4 font-heading",
  carouselWrap:
    "relative w-full h-72 flex items-center justify-center mb-6 overflow-hidden",
  arrowBtn:
    "absolute top-1/2 -translate-y-1/2 bg-orange-400 hover:bg-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center shadow cursor-pointer z-10",
  leftArrow: "left-4",
  rightArrow: "right-4",
  dotsWrap: "absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2",
  dot: "w-3 h-3 rounded-full bg-orange-300 cursor-pointer border-2 border-orange-500",
  dotActive: "bg-orange-500 border-orange-700",
  carouselImg:
    "w-full h-72 object-cover rounded-xl shadow border-2 border-orange-200",
  carouselInner:
    "flex transition-transform duration-700 ease-in-out h-72 w-full",
  videoGrid: "grid grid-cols-1 md:grid-cols-3 gap-6",
  videoBox:
    "bg-orange-50 rounded-xl overflow-hidden shadow flex items-center justify-center h-56",
  fox: "w-16 h-16 rounded-full border-2 border-yellow-300 shadow mb-4 mx-auto",
  moreBtn:
    "mt-6 px-6 py-2 bg-orange-400 hover:bg-orange-500 text-white rounded-full font-semibold font-content shadow block mx-auto",
};

const Gallery = () => {
  const [currentImg, setCurrentImg] = useState(0);
  const intervalRef = useRef(null);
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);

  const fetchImages = async () => {
    try {
      const response = await axiosInstance.get("/api/gallery/carousel");
      setImages(response.data);
      console.log("Fetched images:", response.data);
    } catch (error) {
      console.error("Error fetching images:", error);
      setImages([]);
    }
  };

  const fetchVideos = async () => {
    try {
      const response = await axiosInstance.get("/api/gallery/all/video");
      setVideos(response.data);
      console.log("Fetched videos:", response.data);
    } catch (error) {
      console.error("Error fetching videos:", error);
      setVideos([]);
    }
  };

  useEffect(() => {
    fetchImages();
    fetchVideos();
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const prevImg = () => {
    setCurrentImg((prev) => (prev - 1 + images.length) % images.length);
    clearInterval(intervalRef.current);
  };
  const nextImg = () => {
    setCurrentImg((prev) => (prev + 1) % images.length);
    clearInterval(intervalRef.current);
  };
  const goToImg = (idx) => {
    setCurrentImg(idx);
    clearInterval(intervalRef.current);
  };

  const handleSeeMore = () => {
    navigate("/gallery/all");
  };

  return (
    <div className={SenkoTheme.main}>
      <div className={SenkoTheme.card}>
        <img src="/Senko.png" alt="Senko Fox" className={SenkoTheme.fox} />
        <h1 className={SenkoTheme.heading}>Senko-san Gallery</h1>

        {/* Article: Ảnh Senko với carousel mượt */}
        <article className={SenkoTheme.section}>
          <h2 className={SenkoTheme.sectionTitle}>Ảnh Senko</h2>
          <div className={SenkoTheme.carouselWrap}>
            <button
              className={`${SenkoTheme.arrowBtn} ${SenkoTheme.leftArrow}`}
              onClick={prevImg}
              aria-label="Previous"
            >
              <svg width="24" height="24" fill="none">
                <path
                  d="M15 6l-6 6 6 6"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div
              className={SenkoTheme.carouselInner}
              style={{
                width: "100%",
                transform: `translateX(-${currentImg * 100}%)`,
                display: "flex",
              }}
            >
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img.imageUrl}
                  alt={img.alt}
                  className={SenkoTheme.carouselImg}
                  style={{
                    minWidth: "100%",
                    maxWidth: "100%",
                    height: "100%",
                    objectFit: "contain",
                    background: "#fff"
                  }}
                />
              ))}
            </div>
            <button
              className={`${SenkoTheme.arrowBtn} ${SenkoTheme.rightArrow}`}
              onClick={nextImg}
              aria-label="Next"
            >
              <svg width="24" height="24" fill="none">
                <path
                  d="M9 6l6 6-6 6"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div className={SenkoTheme.dotsWrap}>
              {images.map((_, idx) => (
                <span
                  key={idx}
                  className={`${SenkoTheme.dot} ${currentImg === idx ? SenkoTheme.dotActive : ""}`}
                  onClick={() => goToImg(idx)}
                />
              ))}
            </div>
          </div>
          <button className={SenkoTheme.moreBtn} onClick={handleSeeMore}>
            Xem thêm ảnh Senko
          </button>
        </article>

        {/* Article: Video Senko */}
        <article className={SenkoTheme.section}>
          <h2 className={SenkoTheme.sectionTitle}>Video Senko</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {videos.map((video, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-lg border-2 border-orange-200 hover:border-orange-400 transition-all duration-300 flex flex-col items-center p-4"
              >
                <div className="w-full aspect-video rounded-lg overflow-hidden mb-3">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/v92X4wy_VPE"
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <div className="text-orange-600 font-bold text-base text-center">
                  {video.title}
                </div>
              </div>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
};

export default Gallery;
