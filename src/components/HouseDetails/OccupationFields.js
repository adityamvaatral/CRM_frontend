import React from "react";

const OccupationFields = ({ member, setMember }) => {
  if (!member.occupation) return null;

  const handleChange = (field, value) => {
    setMember({ ...member, details: { ...member.details, [field]: value } });
  };

  const occupationFields = {
    Private: [
      { placeholder: "Company Name", key: "company" },
      { placeholder: "Designation", key: "designation" },
    ],
    Government: [
      { placeholder: "Department", key: "department" },
      { placeholder: "Designation", key: "designation" },
    ],
    "Self-Employed": [{ placeholder: "Business Name", key: "business" }],
    Student: [
      { placeholder: "School/College Name", key: "school" },
      { placeholder: "Standard", key: "standard" },
      { placeholder: "Branch", key: "branch" },
    ],
  };

  return (
    <>
      {occupationFields[member.occupation]?.map(({ placeholder, key }) => (
        <input
          key={key}
          type="text"
          placeholder={placeholder}
          value={member.details[key] || ""}
          onChange={(e) => handleChange(key, e.target.value)}
        />
      ))}
    </>
  );
};

export default OccupationFields;
