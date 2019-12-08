import React from "react";

const Slider = ({ min, max, value, id, onInput }) => {
  return (
    <input
      type="range"
      className="slider"
      min={min}
      max={max}
      value={value}
      id={id}
      onInput={onInput}
    />
  );
};

export default Slider;
