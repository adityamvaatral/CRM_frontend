import React from "react";

const SelectField = ({ label, options, value, onChange }) => {
  return (
    <select value={value} onChange={onChange}>
      <option value="">{label}</option>
      {options.map((opt, idx) => (
        <option key={idx} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
};

export default SelectField;
