// import React from "react";

// const OccupationFields = ({ member, setMember }) => {
//   if (!member.occupation) return null;

//   // const handleChange = (field, value) => {
//   //   setMember({ ...member, details: { ...member.details, [field]: value } });
//   // };
//   const handleChange = (field, value) => {
//     setMember({ 
//       ...member, 
//       details: { ...member.details, [field]: value } || {} // Ensure details is an object
//     });
//   };
  
//   const occupationFields = {
//     Private: [
//       { placeholder: "Company Name", key: "company" },
//       { placeholder: "Designation", key: "designation" },
//     ],
//     Government: [
//       { placeholder: "Department", key: "department" },
//       { placeholder: "Designation", key: "designation" },
//     ],
//     "Self-Employed": [{ placeholder: "Business Name", key: "business" }],
//     Student: [
//       { placeholder: "School/College Name", key: "school" },
//       { placeholder: "Standard", key: "standard" },
//       { placeholder: "Branch", key: "branch" },
//     ],
//   };

//   return (
//     <>
//       {occupationFields[member.occupation]?.map(({ placeholder, key }) => (
//         <input
//           key={key}
//           type="text"
//           placeholder={placeholder}
//           value={member.details[key] || ""}
//           onChange={(e) => handleChange(key, e.target.value)}
//         />
//       ))}
//     </>
//   );
// };

// export default OccupationFields;

const OccupationFields = ({ member, setMember }) => {
  if (!member.occupation) return null;

  // Ensure details is always an object
  const details = member.details || {};

  const handleChange = (field, value) => {
    setMember({
      ...member,
      details: { ...details, [field]: value }, // Spread the existing details
    });
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
          value={details[key] || ""} // Use the safe `details` object
          onChange={(e) => handleChange(key, e.target.value)}
        />
      ))}
    </>
  );
};

export default OccupationFields;
