import React from "react";
import '../HouseDetails/SelectDependents.scss'

const SelectDependents = ({ selectedDependents, handleDependentSelection }) => {
  const dependentsList = ["Son", "Daughter", "Son-in-Law", "Daughter-in-Law","Spouse"];

  return (
    <div className="select-dependents">
      <label>Select Dependents: </label>
      {dependentsList.map((relation) => (
        <label key={relation}>
          <input
            type="checkbox"
            checked={selectedDependents.includes(relation)}
            onChange={() => handleDependentSelection(relation)}
          />
          
          {relation}
        </label>
      ))}
    </div>
  );
};

export default SelectDependents;
