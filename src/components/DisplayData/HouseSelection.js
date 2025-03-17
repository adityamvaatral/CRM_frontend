

import React, { useState, useEffect } from "react";
import axios from "axios";
import "../DisplayData/HouseSelection.scss"

const HouseSelection = () => {
  const [assemblies, setAssemblies] = useState([]);
  const [wards, setWards] = useState([]);
  const [booths, setBooths] = useState([]);
  const [streets, setStreets] = useState([]);
  const [houses, setHouses] = useState([]);
  const [selectedHouse, setSelectedHouse] = useState("");
  const [members, setMembers] = useState([]);

  const [filters, setFilters] = useState({
    assembly: "",
    ward: "",
    booth: "",
    streetNo: "",
  });

  // Fetch initial dropdown values
  useEffect(() => {
    axios.get("http://localhost:5000/api/selection").then((response) => {
      const data = response.data;
      setAssemblies([...new Set(data.map((item) => item.assembly))]);
      setWards([...new Set(data.map((item) => item.ward))]);
      setBooths([...new Set(data.map((item) => item.booth))]);
      setStreets([...new Set(data.map((item) => item.streetNo))]);
    });
  }, []);

  // Fetch house numbers based on selected filters
  useEffect(() => {
    if (filters.streetNo) {
      axios
        .get("http://localhost:5000/api/selection", { params: filters })
        .then((response) => {
          setHouses([...new Set(response.data.map((item) => item.houseNo))]);
        });
    } else {
      setHouses([]);
    }
  }, [filters]);

  // Handle dropdown changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "streetNo" ? { houseNo: "" } : {}), // Reset houseNo when street changes
    }));
  };

  // Fetch members when house is selected
  const handleHouseChange = (e) => {
    const houseNo = e.target.value;
    setSelectedHouse(houseNo);
  
    console.log("Fetching details for house:", houseNo);
  
    axios
      .get(`http://localhost:5000/api/houses/${houseNo}`) // ✅ Ensure correct URL
      .then((response) => {
        setMembers(response.data.members); // ✅ Ensure response structure matches frontend usage
      })
      .catch((error) => {
        console.error("Error fetching house details:", error.response?.data || error.message);
      });
  };
  

  return (
    <div className="house-selection">
      <h2>House Selection</h2>

      <div>
        <label>Assembly:</label>
        <select name="assembly" value={filters.assembly} onChange={handleFilterChange}>
          <option value="">Select Assembly</option>
          {assemblies.map((assembly) => (
            <option key={assembly} value={assembly}>{assembly}</option>
          ))}
        </select>

        <label>Ward:</label>
        <select name="ward" value={filters.ward} onChange={handleFilterChange}>
          <option value="">Select Ward</option>
          {wards.map((ward) => (
            <option key={ward} value={ward}>{ward}</option>
          ))}
        </select>

        <label>Booth:</label>
        <select name="booth" value={filters.booth} onChange={handleFilterChange}>
          <option value="">Select Booth</option>
          {booths.map((booth) => (
            <option key={booth} value={booth}>{booth}</option>
          ))}
        </select>

        <label>Street:</label>
        <select name="streetNo" value={filters.streetNo} onChange={handleFilterChange}>
          <option value="">Select Street</option>
          {streets.map((street) => (
            <option key={street} value={street}>{street}</option>
          ))}
        </select>

        <label>House No:</label>
        <select value={selectedHouse} onChange={handleHouseChange}>
          <option value="">Select House No</option>
          {houses.map((house) => (
            <option key={house} value={house}>{house}</option>
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
            <th>Occupation</th>
            <th>Hobbies</th>
            <th>Activity</th>
            <th>Actions</th>
            
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) => (
            <tr key={index}>
              <td>{member.relation}</td>
              <td><input type="text" value={member.name} readOnly /></td>
              <td><input type="text" value={member.age} readOnly /></td>
              <td><input type="text" value={member.aadharCardNo} readOnly /></td>
              <td><input type="text" value={member.bplCardNo} readOnly /></td>
              <td><input type="text" value={member.voterId} readOnly /></td>
              <td><input type="text" value={member.email} readOnly /></td>
              <td><input type="text" value={member.phoneNumber} readOnly /></td>
              <td><input type="text" value={member.occupation} readOnly /></td>
              <td><input type="text" value={member.hobbies} readOnly /></td>
              <td><input type="text" value={member.activity} readOnly /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HouseSelection;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// // import "../styles/SelectionForm.scss";
// import { useNavigate } from "react-router-dom";



// const SelectionForm = () => {
//   const [assemblies, setAssemblies] = useState([]);
//   const [wards, setWards] = useState([]);
//   const [booths, setBooths] = useState([]);
//   const [streets, setStreets] = useState([]);
//   const [houses, setHouses] = useState([]);

//   const [alertOpen, setAlertOpen] = useState(false);
//   const [alertMessage, setAlertMessage] = useState("");
//   const [alertSeverity, setAlertSeverity] = useState("error");

//   const [assembly, setAssembly] = useState("");
//   const [ward, setWard] = useState("");
//   const [booth, setBooth] = useState("");
//   const [streetNo, setStreetNo] = useState("");
//   const [houseNo, setHouseNo] = useState("");

//   const navigate = useNavigate();

//   // Fetch all assemblies
//   useEffect(() => {
//     axios.get("http://localhost:5000/api/assemblies")
//       .then(res => setAssemblies(res.data))
//       .catch(error => console.error("Error fetching assemblies:", error));
//   }, []);

//   // Fetch wards based on selected assembly
//   useEffect(() => {
//     if (assembly) {
//       axios.get(`http://localhost:5000/api/wards?assembly=${assembly}`)
//         .then(res => setWards(res.data))
//         .catch(error => console.error("Error fetching wards:", error));
//     } else {
//       setWards([]);
//     }
//   }, [assembly]);

//   // Fetch booths based on selected ward
//   useEffect(() => {
//     if (ward) {
//       axios.get(`http://localhost:5000/api/booths?assembly=${assembly}&ward=${ward}`)
//         .then(res => setBooths(res.data))
//         .catch(error => console.error("Error fetching booths:", error));
//     } else {
//       setBooths([]);
//     }
//   }, [ward]);

//   // Fetch streets based on selected booth
//   useEffect(() => {
//     if (booth) {
//       axios.get(`http://localhost:5000/api/streets?assembly=${assembly}&ward=${ward}&booth=${booth}`)
//         .then(res => setStreets(res.data))
//         .catch(error => console.error("Error fetching streets:", error));
//     } else {
//       setStreets([]);
//     }
//   }, [booth]);

//   // Fetch houses based on selected street
//   useEffect(() => {
//     if (streetNo) {
//       axios.get(`http://localhost:5000/api/houses?assembly=${assembly}&ward=${ward}&booth=${booth}&streetNo=${streetNo}`)
//         .then(res => setHouses(res.data))
//         .catch(error => console.error("Error fetching houses:", error));
//     } else {
//       setHouses([]);
//     }
//   }, [streetNo]);

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!assembly || !ward || !booth || !streetNo || !houseNo) {
//       setAlertMessage("All fields are required");
//       setAlertSeverity("error");
//       setAlertOpen(true);
//       return;
//     }

//     try {
//       await axios.post("http://localhost:5000/api/selection", { assembly, ward, booth, streetNo, houseNo });
//       setAlertMessage("House Number Saved");
//       setAlertSeverity("success");
//       setAlertOpen(true);

//       setTimeout(() => navigate("/assembly", { state: { houseNo } }), 1000);
//     } catch (error) {
//       console.error("Error saving house Number:", error);
//       setAlertMessage("Failed to save house Number");
//       setAlertSeverity("error");
//       setAlertOpen(true);
//     }
//   };

//   return (
//     <>
      
//       <div className="selection-form">
//         <h2>New Registration</h2>
//         <form onSubmit={handleSubmit}>
//           <label>Assembly No:</label>
//           <select value={assembly} onChange={(e) => setAssembly(e.target.value)} required>
//             <option value="">Select Assembly</option>
//             {assemblies.map((item, index) => (
//               <option key={index} value={item}>{item}</option>
//             ))}
//           </select>

//           <label>Ward No:</label>
//           <select value={ward} onChange={(e) => setWard(e.target.value)} required disabled={!assembly}>
//             <option value="">Select Ward</option>
//             {wards.map((item, index) => (
//               <option key={index} value={item}>{item}</option>
//             ))}
//           </select>

//           <label>Booth No:</label>
//           <select value={booth} onChange={(e) => setBooth(e.target.value)} required disabled={!ward}>
//             <option value="">Select Booth</option>
//             {booths.map((item, index) => (
//               <option key={index} value={item}>{item}</option>
//             ))}
//           </select>

//           <label>Street No:</label>
//           <select value={streetNo} onChange={(e) => setStreetNo(e.target.value)} required disabled={!booth}>
//             <option value="">Select Street</option>
//             {streets.map((item, index) => (
//               <option key={index} value={item}>{item}</option>
//             ))}
//           </select>

//           <label>House No:</label>
//           <select value={houseNo} onChange={(e) => setHouseNo(e.target.value)} required disabled={!streetNo}>
//             <option value="">Select House</option>
//             {houses.map((item, index) => (
//               <option key={index} value={item}>{item}</option>
//             ))}
//           </select>

//           <button type="submit">Okay</button>
//         </form>
//       </div>

//       {/* Alert Message */}
     
//     </>
//   );
// };

// export default SelectionForm;
