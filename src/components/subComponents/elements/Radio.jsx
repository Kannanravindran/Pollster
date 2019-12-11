import React from "react";

const Radio = ({
  type,
  name,
  question,
  survey,
  value,
  text,
  handleOnClick
}) => {
  return (
    <label className="check-container">
      <input
        type={type}
        name={name}
        data-question={question}
        data-survey={survey}
        value={value}
        onClick={handleOnClick}
      />
      {text}
    </label>
  );
};

export default Radio;
