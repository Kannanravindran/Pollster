import React from "react";

const Slider = ({
  min,
  max,
  value,
  id,
  question,
  survey,
  onInput,
  onChange,
  disabled
}) => {
  return (
    <input
      type="range"
      className="slider"
      min={min}
      max={max}
      defaultValue={value}
      id={id}
      name={id}
      onInput={onInput}
      onChange={onChange}
      data-question={question}
      data-survey={survey}
      disabled={disabled}
    />
  );
};

export default Slider;
