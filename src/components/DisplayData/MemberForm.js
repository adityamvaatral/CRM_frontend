import React from "react";

const MemberForm = ({ title, member, setMember, hobbiesList, activitiesList }) => {
  const handleChange = (e) => {
    setMember({ ...member, [e.target.name]: e.target.value });
  };

  return (
    <tr>
      <td>{title}</td>
      <td>
        <input type="text" name="name" value={member.name} onChange={handleChange} placeholder="Enter Name" />
      </td>
      <td>
        <input type="number" name="age" value={member.age} onChange={handleChange} placeholder="Enter Age" />
      </td>
      <td>
        <input type="text" name="aadhar" value={member.aadhar || ""} onChange={handleChange} placeholder="Aadhar No." />
      </td>
      <td>
        <input type="text" name="bpl" value={member.bpl || ""} onChange={handleChange} placeholder="BPL Card No." />
      </td>
      <td>
        <input type="text" name="voterId" value={member.voterId || ""} onChange={handleChange} placeholder="Voter ID" />
      </td>
      <td>
        <input type="email" name="email" value={member.email || ""} onChange={handleChange} placeholder="Email" />
      </td>
      <td>
        <input type="tel" name="phone" value={member.phone || ""} onChange={handleChange} placeholder="Phone No." />
      </td>
      <td>
        <input type="text" name="occupation" value={member.occupation || ""} onChange={handleChange} placeholder="Occupation" />
      </td>
      <td>
        <select name="hobby" value={member.hobby || ""} onChange={handleChange}>
          <option value="">Select Hobby</option>
          {hobbiesList.map((hobby, index) => (
            <option key={index} value={hobby}>{hobby}</option>
          ))}
        </select>
      </td>
      <td>
        <select name="activity" value={member.activity || ""} onChange={handleChange}>
          <option value="">Select Activity</option>
          {activitiesList.map((activity, index) => (
            <option key={index} value={activity}>{activity}</option>
          ))}
        </select>
      </td>
    </tr>
  );
};

export default MemberForm;
