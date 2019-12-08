import React from "react";

const Radio = ({ type, name, value, text, handleOnClick }) => {
  return (
    <label className="check-container">
      <input type={type} name={name} value={value} onClick={handleOnClick} />
      {text}
    </label>
  );
};

export default Radio;
