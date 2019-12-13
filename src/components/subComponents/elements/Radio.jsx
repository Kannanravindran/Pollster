import React from "react";

const Radio = ({
  type,
  name,
  question,
  survey,
  value,
  text,
  handleOnClick,
  disabled
}) => {
  if (disabled) {
    return (
      <label className="check-container-disabled">
        <input
          type="radio"
          name={name}
          data-question={question}
          data-survey={survey}
          value={value}
          onClick={handleOnClick}
          disabled={disabled}
        />
        {text}
      </label>
    );
  } else {
    return (
      <label className="check-container">
        <input
          type="radio"
          name={name}
          data-question={question}
          data-survey={survey}
          value={value}
          onClick={handleOnClick}
        />
        {text}
      </label>
    );
  }
};

export default Radio;
