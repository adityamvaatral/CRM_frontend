
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../DisplayData/HouseSelection.scss";
// import Header from "../Layout/Header";

// const HouseSelection = () => {
//   const [assemblies, setAssemblies] = useState([]);
//   const [wards, setWards] = useState([]);
//   const [booths, setBooths] = useState([]);
//   const [streets, setStreets] = useState([]);
//   const [houses, setHouses] = useState([]);
//   const [members, setMembers] = useState([]);
//   const [selectedHouse, setSelectedHouse] = useState("");

//   const [filters, setFilters] = useState({
//     assembly: "",
//     ward: "",
//     booth: "",
//     streetNo: "",
//   });

//   // Fetch initial assemblies
//   useEffect(() => {
//     const fetchAssemblies = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/selection");
//         setAssemblies([...new Set(res.data.map((item) => item.assembly))]);
//       } catch (error) {
//         console.error("Error fetching selection data:", error);
//       }
//     };
//     fetchAssemblies();
//   }, []);

//   // Fetch wards based on assembly
//   useEffect(() => {
//     if (filters.assembly) {
//       axios
//         .get(`http://localhost:5000/api/selection?assembly=${filters.assembly}`)
//         .then((res) => setWards([...new Set(res.data.map((item) => item.ward))]))
//         .catch((error) => console.error("Error fetching wards:", error));
//     } else {
//       setWards([]);
//     }
//   }, [filters.assembly]);

//   // Fetch booths based on ward
//   useEffect(() => {
//     if (filters.ward) {
//       axios
//         .get(`http://localhost:5000/api/selection?assembly=${filters.assembly}&ward=${filters.ward}`)
//         .then((res) => setBooths([...new Set(res.data.map((item) => item.booth))]))
//         .catch((error) => console.error("Error fetching booths:", error));
//     } else {
//       setBooths([]);
//     }
//   }, [filters.ward]);

//   // Fetch streets based on booth
//   useEffect(() => {
//     if (filters.booth) {
//       axios
//         .get(`http://localhost:5000/api/selection?assembly=${filters.assembly}&ward=${filters.ward}&booth=${filters.booth}`)
//         .then((res) => setStreets([...new Set(res.data.map((item) => item.streetNo))]))
//         .catch((error) => console.error("Error fetching streets:", error));
//     } else {
//       setStreets([]);
//     }
//   }, [filters.booth]);

//   // Fetch house numbers based on street
//   useEffect(() => {
//     if (filters.streetNo) {
//       axios
//         .get(`http://localhost:5000/api/selection?assembly=${filters.assembly}&ward=${filters.ward}&booth=${filters.booth}&streetNo=${filters.streetNo}`)
//         .then((res) => setHouses([...new Set(res.data.map((item) => item.houseNo))]))
//         .catch((error) => console.error("Error fetching houses:", error));
//     } else {
//       setHouses([]);
//     }
//   }, [filters.streetNo]);

//   // Handle dropdown changes
//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters((prev) => ({
//       ...prev,
//       [name]: value,
//       ...(name === "streetNo" ? { houseNo: "" } : {}), // Reset houseNo when street changes
//     }));
//   };

//   // Fetch members when house is selected
//   const handleHouseChange = (e) => {
//     const houseNo = e.target.value;
//     setSelectedHouse(houseNo);

//     axios
//       .get(`http://localhost:5000/api/houses/${houseNo}`)
//       .then((response) => setMembers(response.data.members))
//       .catch((error) => console.error("Error fetching house details:", error.response?.data || error.message));
//   };

//   return (
//     <>
//     <Header/>
//     <div className="house-selection">
//       <h2>House Details</h2>

//       <div>
//         <label>Assembly:</label>
//         <select name="assembly" value={filters.assembly} onChange={handleFilterChange}>
//           <option value="">Select Assembly</option>
//           {assemblies.map((assembly) => (
//             <option key={assembly} value={assembly}>{assembly}</option>
//           ))}
//         </select>

//         <label>Ward:</label>
//         <select name="ward" value={filters.ward} onChange={handleFilterChange}>
//           <option value="">Select Ward</option>
//           {wards.map((ward) => (
//             <option key={ward} value={ward}>{ward}</option>
//           ))}
//         </select>

//         <label>Booth:</label>
//         <select name="booth" value={filters.booth} onChange={handleFilterChange}>
//           <option value="">Select Booth</option>
//           {booths.map((booth) => (
//             <option key={booth} value={booth}>{booth}</option>
//           ))}
//         </select>

//         <label>Street:</label>
//         <select name="streetNo" value={filters.streetNo} onChange={handleFilterChange}>
//           <option value="">Select Street</option>
//           {streets.map((street) => (
//             <option key={street} value={street}>{street}</option>
//           ))}
//         </select>

//         <label>House No:</label>
//         <select value={selectedHouse} onChange={handleHouseChange}>
//           <option value="">Select House No</option>
//           {houses.map((house) => (
//             <option key={house} value={house}>{house}</option>
//           ))}
//         </select>
//       </div>

//       <h3>Members</h3>
//       <table border="1">
//         <thead>
//           <tr>
//             <th>Relation</th>
//             <th>Name</th>
//             <th>Age</th>
//             <th>Aadhar Card No.</th>
//             <th>BPL Card No.</th>
//             <th>Voter ID</th>
//             <th>Email</th>
//             <th>Phone Number</th>
//             <th>Occupation & Details</th>
//             <th>Hobbies</th>
//             <th>Activity</th>
//             {/* <th>Actions</th> */}
//           </tr>
//         </thead>
//         <tbody>
//           {members.map((member, index) => (
//             <tr key={index}>
//               <td>{member.relation}</td>
//               <td><input type="text" value={member.name} readOnly /></td>
//               <td><input type="text" value={member.age} readOnly /></td>
//               <td><input type="text" value={member.aadharCardNo} readOnly /></td>
//               <td><input type="text" value={member.bplCardNo} readOnly /></td>
//               <td><input type="text" value={member.voterId} readOnly /></td>
//               <td><input type="text" value={member.email} readOnly /></td>
//               <td><input type="text" value={member.phoneNumber} readOnly /></td>
//               <td><input type="text" value={member.occupation} readOnly /></td>
//               {/* <td><input type="text" value={`${member.occupation} - ${member.occupationDetails}`} readOnly /></td> */}

//               <td><input type="text" value={member.hobbies} readOnly /></td>
//               <td><input type="text" value={member.activity} readOnly /></td>
              
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//     </>
//   );
// };

// export default HouseSelection;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "../DisplayData/HouseSelection.scss";
import Header from "../Layout/Header";

const HouseSelection = () => {
  const [assemblies, setAssemblies] = useState([]);
  const [wards, setWards] = useState([]);
  const [booths, setBooths] = useState([]);
  const [streets, setStreets] = useState([]);
  const [houses, setHouses] = useState([]);
  const [members, setMembers] = useState([]);
  const [selectedHouse, setSelectedHouse] = useState("");

  const [filters, setFilters] = useState({
    assembly: "",
    ward: "",
    booth: "",
    streetNo: "",
  });

  useEffect(() => {
    axios.get("http://localhost:5000/api/selection")
      .then((res) => setAssemblies([...new Set(res.data.map((item) => item.assembly))]))
      .catch((error) => console.error("Error fetching selection data:", error));
  }, []);

  useEffect(() => {
    if (filters.assembly) {
      axios.get(`http://localhost:5000/api/selection?assembly=${filters.assembly}`)
        .then((res) => setWards([...new Set(res.data.map((item) => item.ward))]))
        .catch((error) => console.error("Error fetching wards:", error));
    } else {
      setWards([]);
    }
  }, [filters.assembly]);

  useEffect(() => {
    if (filters.ward) {
      axios.get(`http://localhost:5000/api/selection?assembly=${filters.assembly}&ward=${filters.ward}`)
        .then((res) => setBooths([...new Set(res.data.map((item) => item.booth))]))
        .catch((error) => console.error("Error fetching booths:", error));
    } else {
      setBooths([]);
    }
  }, [filters.ward]);

  useEffect(() => {
    if (filters.booth) {
      axios.get(`http://localhost:5000/api/selection?assembly=${filters.assembly}&ward=${filters.ward}&booth=${filters.booth}`)
        .then((res) => setStreets([...new Set(res.data.map((item) => item.streetNo))]))
        .catch((error) => console.error("Error fetching streets:", error));
    } else {
      setStreets([]);
    }
  }, [filters.booth]);

  useEffect(() => {
    if (filters.streetNo) {
      axios.get(`http://localhost:5000/api/selection?assembly=${filters.assembly}&ward=${filters.ward}&booth=${filters.booth}&streetNo=${filters.streetNo}`)
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

    axios.get(`http://localhost:5000/api/houses/${houseNo}`)
      .then((response) => setMembers(response.data.members))
      .catch((error) => console.error("Error fetching house details:", error));
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
              <option key={assembly} value={assembly}>{assembly}</option>
            ))}
          </select>

          <label>Ward:</label>
          <select name="ward" value={filters.ward} onChange={handleFilterChange} disabled={!filters.assembly}>
            <option value="">Select Ward</option>
            {wards.map((ward) => (
              <option key={ward} value={ward}>{ward}</option>
            ))}
          </select>

          <label>Booth:</label>
          <select name="booth" value={filters.booth} onChange={handleFilterChange} disabled={!filters.ward}>
            <option value="">Select Booth</option>
            {booths.map((booth) => (
              <option key={booth} value={booth}>{booth}</option>
            ))}
          </select>

          <label>Street:</label>
          <select name="streetNo" value={filters.streetNo} onChange={handleFilterChange} disabled={!filters.booth}>
            <option value="">Select Street</option>
            {streets.map((street) => (
              <option key={street} value={street}>{street}</option>
            ))}
          </select>

          <label>House No:</label>
          <select value={selectedHouse} onChange={handleHouseChange} disabled={!filters.streetNo}>
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
              <th>Occupation & Details</th>
              <th>Hobbies</th>
              <th>Activity</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, index) => (
              <tr key={index}>
                <td>{member.relation}</td>
                <td>{member.name}</td>
                <td>{member.age}</td>
                <td>{member.aadharCardNo}</td>
                <td>{member.bplCardNo}</td>
                <td>{member.voterId}</td>
                <td>{member.email}</td>
                <td>{member.phoneNumber}</td>
                <td>{member.occupation}</td>
                <td>{member.hobbies}</td>
                <td>{member.activity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default HouseSelection;
