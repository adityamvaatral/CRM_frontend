
// import React from "react";
// import OccupationFields from "./OccupationFields";

// const MemberForm = ({ 
//   title, member, setMember, hobbiesList = [], activite = [], 
//   isMultiple, addDependent, deleteDependent 
// }) => {
//   return (
//     <tr key={member.id}>
//       <td>{title}</td>
//       <td>
//         <input type="text" placeholder="Name" value={member.name} 
//           onChange={(e) => setMember({ ...member, name: e.target.value })} />
//       </td>
//       <td>
//         <input type="number" placeholder="Age" value={member.age} 
//           onChange={(e) => setMember({ ...member, age: e.target.value })} />
//       </td>
//       <td>
//         <input type="text" placeholder="Aadhar Card No." value={member.aadhar} 
//           onChange={(e) => setMember({ ...member, aadhar: e.target.value })} />
//       </td>
//       <td>
//         <input type="text" placeholder="BPL Card No." value={member.bpl} 
//           onChange={(e) => setMember({ ...member, bpl: e.target.value })} />
//       </td>
//       <td>
//         <input type="text" placeholder="Voter ID" value={member.voterId} 
//           onChange={(e) => setMember({ ...member, voterId: e.target.value })} />
//       </td>
//       <td>
//         <input type="email" placeholder="Email" value={member.email} 
//           onChange={(e) => setMember({ ...member, email: e.target.value })} />
//       </td>
//       <td>
//         <input type="text" placeholder="Phone Number" value={member.phone} 
//           onChange={(e) => setMember({ ...member, phone: e.target.value })} />
//       </td>
//       <td>
//         <select value={member.occupation} 
//           onChange={(e) => setMember({ ...member, occupation: e.target.value, details: {} })}>
//           <option value="">Select Occupation</option>
//           <option value="Private">Private</option>
//           <option value="Government">Government</option>
//           <option value="Self-Employed">Self-Employed</option>
//           <option value="Student">Student</option>
//         </select>
//         <OccupationFields member={member} setMember={setMember} />
//       </td>
//       <td>
//         <select value={member.hobbies} 
//           onChange={(e) => setMember({ ...member, hobbies: e.target.value })}>
//           <option value="">Select Hobby</option>
//           {hobbiesList.map((hobby, idx) => (
//             <option key={idx} value={hobby}>{hobby}</option>
//           ))}
//         </select>
//       </td>
//       <td>
//         <select value={member.sportsactivit} 
//           onChange={(e) => setMember({ ...member, sportsactivit: e.target.value })}>
//           <option value="">Select Activity</option>
//           {activite.map((activ, idx) => (
//             <option key={idx} value={activ}>{activ}</option>
//           ))}
//         </select>
//       </td>
//       <td>
//         {isMultiple && (
//           <>
         
//             <button className="add-button" onClick={() => addDependent(member.relation)}>Add</button>


//             <button className="delete-button"onClick={() => deleteDependent(member.id, member.relation)}>Delete</button>
//           </>
//         )}
//       </td>
//     </tr>
//   );
// };

// export default MemberForm;


import React, { useState } from "react";
import OccupationFields from "./OccupationFields";

const MemberForm = ({ 
  title, member, setMember, hobbiesList = [], activite = [], 
  isMultiple, addDependent, deleteDependent 
}) => {
  const [errors, setErrors] = useState({});

  // Validation function
  const validate = (field, value) => {
    let newErrors = { ...errors };

    if (field === "name") {
      if (!value || !/^[A-Za-z\s]{2,}$/.test(value)) {
        newErrors.name = "Enter a valid name (at least 2 letters).";
      } else {
        delete newErrors.name;
      }
    }
    if (field === "age") {
      if (!value || value < 1 || value > 120) {
        newErrors.age = "Enter a valid age (1-120).";
      } else {
        delete newErrors.age;
      }
    }
    if (field === "aadhar") {
      if (!/^\d{12}$/.test(value)) {
        newErrors.aadhar = "Aadhar must be a 12-digit number.";
      } else {
        delete newErrors.aadhar;
      }
    }
    if (field === "voterId") {
      if (member.age > 18 && (!value || !/^[A-Za-z0-9]{10,}$/.test(value))) {
        newErrors.voterId = "Voter ID is required for age above 18 (min 10 characters).";
      } else {
        delete newErrors.voterId;
      }
    }
    if (field === "email") {
      if (value && !/^\S+@\S+\.\S+$/.test(value)) {
        newErrors.email = "Enter a valid email.";
      } else {
        delete newErrors.email;
      }
    }
    if (field === "phone") {
      if (!/^\d{10}$/.test(value)) {
        newErrors.phone = "Phone must be a 10-digit number.";
      } else {
        delete newErrors.phone;
      }
    }
    if (field === "occupation") {
      if (!value) {
        newErrors.occupation = "Please select an occupation.";
      } else {
        delete newErrors.occupation;
      }
    }

    setErrors(newErrors);
  };

  return (
    <tr key={member.id}>
      <td>{title}</td>
      <td>
        <input type="text" placeholder="Name" value={member.name} 
          onChange={(e) => {
            setMember({ ...member, name: e.target.value });
            validate("name", e.target.value);
          }} />
        {errors.name && <span className="error">{errors.name}</span>}
      </td>
      <td>
        <input type="number" placeholder="Age" value={member.age} 
          onChange={(e) => {
            setMember({ ...member, age: e.target.value });
            validate("age", e.target.value);
          }} />
        {errors.age && <span className="error">{errors.age}</span>}
      </td>
      <td>
        <input type="text" placeholder="Aadhar Card No." value={member.aadhar} 
          onChange={(e) => {
            setMember({ ...member, aadhar: e.target.value });
            validate("aadhar", e.target.value);
          }} />
        {errors.aadhar && <span className="error">{errors.aadhar}</span>}
      </td>
      <td>
        <input type="text" placeholder="BPL Card No." value={member.bpl} 
          onChange={(e) => setMember({ ...member, bpl: e.target.value })} />
      </td>
      <td>
        <input type="text" placeholder="Voter ID" value={member.voterId} 
          onChange={(e) => {
            setMember({ ...member, voterId: e.target.value });
            validate("voterId", e.target.value);
          }} />
        {errors.voterId && <span className="error">{errors.voterId}</span>}
      </td>
      <td>
        <input type="email" placeholder="Email" value={member.email} 
          onChange={(e) => {
            setMember({ ...member, email: e.target.value });
            validate("email", e.target.value);
          }} />
        {errors.email && <span className="error">{errors.email}</span>}
      </td>
      <td>
        <input type="text" placeholder="Phone Number" value={member.phone} 
          onChange={(e) => {
            setMember({ ...member, phone: e.target.value });
            validate("phone", e.target.value);
          }} />
        {errors.phone && <span className="error">{errors.phone}</span>}
      </td>
      {/* <td>
        <select value={member.occupation} 
          onChange={(e) => {
            setMember({ ...member, occupation: e.target.value, details: {} });
            validate("occupation", e.target.value);
          }}>
          <option value="">Select Occupation</option>
          <option value="Private">Private</option>
          <option value="Government">Government</option>
          <option value="Self-Employed">Self-Employed</option>
          <option value="Student">Student</option>
        </select>
        {errors.occupation && <span className="error">{errors.occupation}</span>}
        <OccupationFields member={member} setMember={setMember} />
      </td> */}
      <td>
  <select
    value={member.occupation}
    onChange={(e) =>
      setMember({
        ...member,
        occupation: e.target.value,
        details: member.details || {}, // Ensure details is always an object
      })
    }
  >
    <option value="">Select Occupation</option>
    <option value="Private">Private</option>
    <option value="Government">Government</option>
    <option value="Self-Employed">Self-Employed</option>
    <option value="Student">Student</option>
  </select>
  <OccupationFields member={member} setMember={setMember} />
</td>

      <td>
        <select value={member.hobbies} 
          onChange={(e) => setMember({ ...member, hobbies: e.target.value })}>
          <option value="">Select Hobby</option>
          {hobbiesList.map((hobby, idx) => (
            <option key={idx} value={hobby}>{hobby}</option>
          ))}
        </select>
      </td>
      <td>
        <select value={member.sportsactivit} 
          onChange={(e) => setMember({ ...member, sportsactivit: e.target.value })}>
          <option value="">Select Activity</option>
          {activite.map((activ, idx) => (
            <option key={idx} value={activ}>{activ}</option>
          ))}
        </select>
      </td>
      <td>
        {isMultiple && (
          <>
            <button className="add-button" onClick={() => addDependent(member.relation)}>Add</button>
            <button className="delete-button" onClick={() => deleteDependent(member.id, member.relation)}>Delete</button>
          </>
        )}
      </td>
    </tr>
  );
};

export default MemberForm;
