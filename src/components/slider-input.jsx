import { numberWithCommas } from "../utils/config";
import React from "react";

const SliderInput = ({
  title,
  state,
  min,
  max,
  onChange,
  labelMin,
  labelMax,
  underlineTitle,
}) => {
  return (
    <React.Fragment>
      <span className="title">{title}</span>
      <br />
      {state > 0 && (
        <span className="title" style={{ textDecoration: "underline" }}>
          {" "}
          {underlineTitle}
        </span>
      )}
      <input
        type="range"
        min={min}
        max={max}
        className="slider"
        value={state}
        onChange={onChange}
      />
      <div className="lables">
        <label> {labelMin ?? numberWithCommas(min)}</label>
        <b>${numberWithCommas(state)}</b>
        <label>{labelMax ?? numberWithCommas(max)}</label>
      </div>
    </React.Fragment>
  );
};

export default SliderInput;
