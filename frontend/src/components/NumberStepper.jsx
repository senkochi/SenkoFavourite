import React from "react";

const NumberStepper = ({ value, setValue, min = 0, max = 100, step = 1 }) => {
  const decrease = () => {
    setValue((prev) => Math.max(min, prev - step));
  };

  const increase = () => {
    setValue((prev) => Math.min(max, prev + step));
  };

  const handleChange = (e) => {
    let val = parseInt(e.target.value) || 0;
    if (val < min) val = min;
    if (val > max) val = max;
    setValue(val);
  };

  return (
    <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden w-32">
      <button
        onClick={decrease}
        className="w-10 h-10 bg-gray-100 hover:bg-gray-200 text-lg font-bold"
      >
        −
      </button>
      <input
        className="w-full h-10 text-center text-base outline-none"
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
        step={step}
      />
      <button
        onClick={increase}
        className="w-10 h-10 bg-gray-100 hover:bg-gray-200 text-lg font-bold"
      >
        +
      </button>
    </div>
  );
};

export default NumberStepper;
