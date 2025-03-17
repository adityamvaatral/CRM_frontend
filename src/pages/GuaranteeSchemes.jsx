import React, { useState, useEffect } from "react";
import "../components/styles/GuaranteeSchemes.scss"; // Import SCSS file

const GuaranteeSchemes = () => {
  const [members, setMembers] = useState([]);
  const [schemesList, setSchemesList] = useState([]);

  // Fetch data from JSON API
  useEffect(() => {
    fetch("/schemesData.json")
      .then((response) => response.json())
      .then((data) => {
        setMembers(data.members);
        setSchemesList(data.schemesList);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Handle Checkbox Toggle
  const handleCheckboxChange = (memberId, scheme) => {
    setMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.id === memberId
          ? { ...member, schemes: { ...member.schemes, [scheme]: !member.schemes[scheme] } }
          : member
      )
    );
  };

  return (
    <div className="guarantee-schemes">
      <h2>Guarantee Schemes</h2>
      <table>
        <thead>
          <tr>
            <th>Member Name</th>
            {schemesList.map((scheme, index) => (
              <th key={index}>{scheme}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id}>
              <td>{member.name}</td>
              {schemesList.map((scheme, index) => (
                <td key={index}>
                  <input
                    type="checkbox"
                    checked={!!member.schemes[scheme]}
                    onChange={() => handleCheckboxChange(member.id, scheme)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GuaranteeSchemes;
