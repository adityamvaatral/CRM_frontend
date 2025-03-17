
import React from "react";
import OccupationFields from "./OccupationFields";

const MemberForm = ({ 
  title, member, setMember, hobbiesList = [], activite = [], 
  isMultiple, addDependent, deleteDependent 
}) => {
  return (
    <tr key={member.id}>
      <td>{title}</td>
      <td>
        <input type="text" placeholder="Name" value={member.name} 
          onChange={(e) => setMember({ ...member, name: e.target.value })} />
      </td>
      <td>
        <input type="number" placeholder="Age" value={member.age} 
          onChange={(e) => setMember({ ...member, age: e.target.value })} />
      </td>
      <td>
        <input type="text" placeholder="Aadhar Card No." value={member.aadhar} 
          onChange={(e) => setMember({ ...member, aadhar: e.target.value })} />
      </td>
      <td>
        <input type="text" placeholder="BPL Card No." value={member.bpl} 
          onChange={(e) => setMember({ ...member, bpl: e.target.value })} />
      </td>
      <td>
        <input type="text" placeholder="Voter ID" value={member.voterId} 
          onChange={(e) => setMember({ ...member, voterId: e.target.value })} />
      </td>
      <td>
        <input type="email" placeholder="Email" value={member.email} 
          onChange={(e) => setMember({ ...member, email: e.target.value })} />
      </td>
      <td>
        <input type="text" placeholder="Phone Number" value={member.phone} 
          onChange={(e) => setMember({ ...member, phone: e.target.value })} />
      </td>
      <td>
        <select value={member.occupation} 
          onChange={(e) => setMember({ ...member, occupation: e.target.value, details: {} })}>
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


            <button className="delete-button"onClick={() => deleteDependent(member.id, member.relation)}>Delete</button>
          </>
        )}
      </td>
    </tr>
  );
};

export default MemberForm;
