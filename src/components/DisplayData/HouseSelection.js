

import React, { useState, useEffect } from "react";
import axios from "axios";
import "../DisplayData/HouseSelection.scss";
import Header from "../Layout/Header";
import { Snackbar, Alert } from "@mui/material";
import GuranteeSchemes from "./GuaranteeSchemes";

const HouseSelection = () => {
  const [assemblies, setAssemblies] = useState([]);
  const [wards, setWards] = useState([]);
  const [booths, setBooths] = useState([]);
  const [streets, setStreets] = useState([]);
  const [houses, setHouses] = useState([]);
  const [members, setMembers] = useState([]);
  const [selectedHouse, setSelectedHouse] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [selectedSchemes, setSelectedSchemes] = useState([]);

  const [filters, setFilters] = useState({
    assembly: "",
    ward: "",
    booth: "",
    streetNo: "",
  });

  const [alertOpen, setAlertOpen] = useState(false);
  const [saveAlert, setSaveAlert] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/selection")
      .then((res) => setAssemblies([...new Set(res.data.map((item) => item.assembly))]))
      .catch((error) => console.error("Error fetching selection data:", error));
  }, []);

  useEffect(() => {
    if (filters.assembly) {
      axios
        .get(`http://localhost:5000/api/selection?assembly=${filters.assembly}`)
        .then((res) => setWards([...new Set(res.data.map((item) => item.ward))]))
        .catch((error) => console.error("Error fetching wards:", error));
    } else {
      setWards([]);
    }
  }, [filters.assembly]);

  useEffect(() => {
    if (filters.ward) {
      axios
        .get(`http://localhost:5000/api/selection?assembly=${filters.assembly}&ward=${filters.ward}`)
        .then((res) => setBooths([...new Set(res.data.map((item) => item.booth))]))
        .catch((error) => console.error("Error fetching booths:", error));
    } else {
      setBooths([]);
    }
  }, [filters.ward]);

  useEffect(() => {
    if (filters.booth) {
      axios
        .get(`http://localhost:5000/api/selection?assembly=${filters.assembly}&ward=${filters.ward}&booth=${filters.booth}`)
        .then((res) => setStreets([...new Set(res.data.map((item) => item.streetNo))]))
        .catch((error) => console.error("Error fetching streets:", error));
    } else {
      setStreets([]);
    }
  }, [filters.booth]);

  useEffect(() => {
    if (filters.streetNo) {
      axios
        .get(`http://localhost:5000/api/selection?assembly=${filters.assembly}&ward=${filters.ward}&booth=${filters.booth}&streetNo=${filters.streetNo}`)
        .then((res) => setHouses([...new Set(res.data.map((item) => item.houseNo))]))
        .catch((error) => console.error("Error fetching houses:", error));
    } else {
      setHouses([]);
    }
  }, [filters.streetNo]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleHouseChange = (e) => {
    const houseNo = e.target.value;
    setSelectedHouse(houseNo);
    setAlertOpen(true);
    setShowDetails(false);

    axios
      .get(`http://localhost:5000/api/houses/${houseNo}`)
      .then((response) => {
        setMembers(response.data.members);
        const schemes = response.data.members.flatMap((member) => member.selectedSchemes || []);
        setSelectedSchemes([...new Set(schemes)]);
      })
      .catch((error) => console.error("Error fetching house details:", error));
  };

  const handleMemberChange = (index, field, value) => {
    setMembers((prevMembers) =>
      prevMembers.map((member, i) =>
        i === index ? { ...member, [field]: value } : member
      )
    );
  };
  

  const saveMemberData = () => {
    axios
      .post("http://localhost:5000/api/houses", { houseNo: selectedHouse, members })
      .then(() => setSaveAlert(true))
      .catch((error) => console.error("Error updating members:", error));
  };

  return (
    <>
      <Header />
      <div className="house-selection">
        <h2>House Details</h2>
        <div>
          <label>Assembly:</label>
          <select name="assembly" value={filters.assembly} onChange={handleFilterChange}>
            <option value="">Select Assembly</option>
            {assemblies.map((assembly) => (
              <option key={assembly} value={assembly}>
                {assembly}
              </option>
            ))}
          </select>

          <label>Ward:</label>
          <select name="ward" value={filters.ward} onChange={handleFilterChange} disabled={!filters.assembly}>
            <option value="">Select Ward</option>
            {wards.map((ward) => (
              <option key={ward} value={ward}>
                {ward}
              </option>
            ))}
          </select>

          <label>Booth:</label>
          <select name="booth" value={filters.booth} onChange={handleFilterChange} disabled={!filters.ward}>
            <option value="">Select Booth</option>
            {booths.map((booth) => (
              <option key={booth} value={booth}>
                {booth}
              </option>
            ))}
          </select>

          <label>Street:</label>
          <select name="streetNo" value={filters.streetNo} onChange={handleFilterChange} disabled={!filters.booth}>
            <option value="">Select Street</option>
            {streets.map((street) => (
              <option key={street} value={street}>
                {street}
              </option>
            ))}
          </select>

          <label>House No:</label>
          <select value={selectedHouse} onChange={handleHouseChange} disabled={!filters.streetNo}>
            <option value="">Select House No</option>
            {houses.map((house) => (
              <option key={house} value={house}>
                {house}
              </option>
            ))}
          </select>
        </div>

        <h3>Members</h3>
        <table border="1">
          <thead>
            <tr>
              <th>Relation</th>
            <th>Name</th>
               <th>Age</th>
               <th>Aadhar Card No.</th>
               <th>BPL Card No.</th>
               <th>Voter ID</th>
               <th>Email</th>
               <th>Phone Number</th>
               <th>Occupation & Details</th>
               <th>Hobbies</th>
               <th>Activity</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, index) => (
              <tr key={index}>
                <td>{member.relation}</td>
                <td>
  <input 
    type="text" 
    value={member.name || ""} 
    onChange={(e) => handleMemberChange(index, "name", e.target.value)} 
  />
</td>
<td>
  <input 
    type="number" 
    value={member.age || ""} 
    onChange={(e) => handleMemberChange(index, "age", e.target.value)} 
  />
</td>
<td>
  <input 
    type="text" 
    value={member.aadhar || ""} 
    onChange={(e) => handleMemberChange(index, "aadhar", e.target.value)} 
  />
</td>
<td>
  <input 
    type="text" 
    value={member.bpl || ""} 
    onChange={(e) => handleMemberChange(index, "bpl", e.target.value)} 
  />
</td>
<td>
  <input 
    type="text" 
    value={member.voterId || ""} 
    onChange={(e) => handleMemberChange(index, "voterId", e.target.value)} 
  />
</td>
<td>
  <input 
    type="email" 
    value={member.email || ""} 
    onChange={(e) => handleMemberChange(index, "email", e.target.value)} 
  />
</td>
<td>
  <input 
    type="tel" 
    value={member.phone || ""} 
    onChange={(e) => handleMemberChange(index, "phone", e.target.value)} 
  />
</td>
<td>
  {/* <input 
    type="text" 
    value={member.occupation || ""} 
    onChange={(e) => handleMemberChange(index, "occupation", e.target.value)} 
  /> */}
  <input 
  type="text" 
  value={member.occupation || ""} 
  onChange={(e) => handleMemberChange(index, "occupation", e.target.value)} 
/>

<input 
  type="text" 
  placeholder="Department"
  value={member.details?.department || ""} 
  onChange={(e) => handleMemberChange(index, "details", { ...member.details, department: e.target.value })} 
/>

<input 
  type="text" 
  placeholder="Designation"
  value={member.details?.designation || ""} 
  onChange={(e) => handleMemberChange(index, "details", { ...member.details, designation: e.target.value })} 
/>

</td>
<td>
  <input 
    type="text" 
    value={member.hobbies || ""} 
    onChange={(e) => handleMemberChange(index, "hobbies", e.target.value)} 
  />
</td>   
              </tr>
            ))}
          </tbody>
        </table>
        <button  className="save-button" onClick={saveMemberData}>Save</button>
        <Snackbar open={saveAlert} autoHideDuration={3000} onClose={() => setSaveAlert(false)}>
          <Alert onClose={() => setSaveAlert(false)} severity="success">
            Members data saved successfully!
          </Alert>
        </Snackbar>

        <button className="toggle-btn" onClick={() => setShowDetails(!showDetails)} disabled={!selectedHouse}>
          {showDetails ? `Hide Schemes ` : `Show Schemes `}
        </button>

        {/* //(${selectedSchemes.length}) */}

        {/* (${selectedSchemes.length}) */}

        {showDetails && <GuranteeSchemes houseNo={selectedHouse} />}
      </div>
    </>
  );
};

export default HouseSelection;
