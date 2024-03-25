import React from "react";

const TextInput = ({ title, state, setState }) => {
  return (
    <>
      <br />
      <span>{title}</span>
      <br />
      <input
        type="number"
        value={state}
        onChange={(e) => setState(e.target.value)}
        placeholder={title}
      />
    </>
  );
};

export default TextInput;
