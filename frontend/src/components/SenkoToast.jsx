import React from "react";

const SenkoToast = ({ message, type = "info", onClose }) => {
  const colors = {
    info: "bg-yellow-200 border-yellow-400 text-orange-700",
    success: "bg-orange-200 border-orange-400 text-orange-700",
    error: "bg-pink-200 border-pink-400 text-red-700",
  };

  return (
    <div
      className={`fixed top-8 right-8 z-50 flex items-center gap-3 px-5 py-3 rounded-xl border-2 shadow-lg ${colors[type]} animate-fade-in`}
      style={{
        fontFamily: "var(--anime-font)",
        minWidth: "220px",
        maxWidth: "320px",
      }}
    >
      <img
        src="/Senko.png"
        alt="Senko"
        className="w-10 h-10 rounded-full border-2 border-yellow-300 shadow"
      />
      <span className="flex-1">{message}</span>
      <button
        className="ml-2 text-orange-500 font-bold hover:text-orange-700"
        onClick={onClose}
        aria-label="Đóng"
      >
        ×
      </button>
    </div>
  );
};

export default SenkoToast;