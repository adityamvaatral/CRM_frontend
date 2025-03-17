import React from "react";

const Dropdown = ({ label, value, onChange, options }) => {
  return (
    <div className="dropdown">
      <label>{label}</label>
      <select value={value} onChange={onChange}>
        <option value="">{label}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
