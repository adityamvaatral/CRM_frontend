
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../DisplayData/GuaranteeSchemes.scss"

const GuranteeSchemes = ({ houseNo }) => {
  const [members, setMembers] = useState([]);
  const [selectedSchemes, setSelectedSchemes] = useState({});

  useEffect(() => {
    if (houseNo) {
      fetchHouseDetails();
    }
  }, [houseNo]); // Fetch when houseNo changes

  const fetchHouseDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/houses/${houseNo}`);
      const data = response.data;
      setMembers(data.members || []);

      // Initialize scheme selection state
      const schemesMap = {};
      data.members?.forEach((member, index) => {
        schemesMap[index] = member.selectedSchemes || [];
      });
      setSelectedSchemes(schemesMap);
    } catch (error) {
      console.error("Error fetching house details:", error);
    }
  };

  const handleCheckboxChange = (memberIndex, scheme) => {
    setSelectedSchemes((prev) => {
      const updatedSchemes = { ...prev };
      const memberSchemes = updatedSchemes[memberIndex] || [];

      if (memberSchemes.includes(scheme)) {
        updatedSchemes[memberIndex] = memberSchemes.filter((s) => s !== scheme);
      } else {
        updatedSchemes[memberIndex] = [...memberSchemes, scheme];
      }

      return updatedSchemes;
    });
  };

  const handleSubmit = async () => {
    const updatedMembers = members.map((member, index) => ({
      ...member,
      selectedSchemes: selectedSchemes[index] || [],
    }));

    try {
      await axios.post("http://localhost:5000/api/houses", {
        houseNo,
        members: updatedMembers,
      });

      alert("Schemes Data saved successfully!");
    } catch (error) {
      console.error("Error saving Schemes details:", error);
      alert("Failed to save data.");
    }
  };

  return (
    <div className="house-details-container">
      <h2>House No: {houseNo}</h2>

      {members.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Member Name</th>
              <th>Gruha Laxmi</th>
              <th>Gruha Jyothi</th>
              <th>Yuva Nidhi</th>
              <th>Anna Bhagya</th>
              <th>Shakthi</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, index) => (
              <tr key={index}>
                <td>{member.name}</td>
                {["Gruha Laxmi", "Gruha Jyothi", "Yuva Nidhi", "Anna Bhagya", "Shakthi"].map(
                  (scheme) => (
                    <td key={scheme}>
                      <input
                        type="checkbox"
                        checked={selectedSchemes[index]?.includes(scheme) || false}
                        onChange={() => handleCheckboxChange(index, scheme)}
                      />
                    </td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Submit Button */}
      <button className="submit-btn" onClick={handleSubmit}>
        Save Schemes
      </button>
    </div>
  );
};

export default GuranteeSchemes;
