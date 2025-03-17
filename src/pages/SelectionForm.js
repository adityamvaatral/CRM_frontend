//Working 

import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/SelectionForm.scss"
import { useNavigate } from "react-router-dom";
import Header from "../components/Layout/Header";
import HouseDetails from "../components/HouseDetails/HouseDetails";

const SelectionForm = () => {
  const [assemblies, setAssemblies] = useState([]);
  const [wards, setWards] = useState([]);
  const [booths, setBooths] = useState([]);
  const [streets, setStreets] = useState([]);
  const [houses, setHouses] = useState([]);

  const [assembly, setAssembly] = useState("");
  const [ward, setWard] = useState("");
  const [booth, setBooth] = useState("");
  const [streetNo, setStreetNo] = useState("");
  const [houseNo, setHouseNo] = useState("");


  const navigate = useNavigate();

  useEffect(() => {
    const fetchselection = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/selection");
        setAssemblies([...new Set(res.data.map((item) => item.assembly))]);
      } catch (error) {
        console.error("Error fetching selection data:", error);
      }
    };
    fetchselection();
  }, []);

  useEffect(() => {
    if (assembly) {
      axios
        .get(`http://localhost:5000/api/selection?assembly=${assembly}`)
        .then((res) => setWards([...new Set(res.data.map((item) => item.ward))]))
        .catch((error) => console.error("Error fetching wards:", error));
    }
  }, [assembly]);

  useEffect(() => {
    if (ward) {
      axios
        .get(`http://localhost:5000/api/selection?assembly=${assembly}&ward=${ward}`)
        .then((res) => setBooths([...new Set(res.data.map((item) => item.booth))]))
        .catch((error) => console.error("Error fetching booths:", error));
    }
  }, [ward]);

  useEffect(() => {
    if (booth) {
      axios
        .get(`http://localhost:5000/api/selection?assembly=${assembly}&ward=${ward}&booth=${booth}`)
        .then((res) => setStreets([...new Set(res.data.map((item) => item.streetNo))]))
        .catch((error) => console.error("Error fetching streets:", error));
    }
  }, [booth]);

  useEffect(() => {
    if (streetNo) {
      axios
        .get(`http://localhost:5000/api/selection?assembly=${assembly}&ward=${ward}&booth=${booth}&streetNo=${streetNo}`)
        .then((res) => setHouses([...new Set(res.data.map((item) => item.houseNo))]))
        .catch((error) => console.error("Error fetching houses:", error));
    }
  }, [streetNo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!assembly || !ward || !booth || !streetNo || !houseNo) {
      alert("All fields are required");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/selection", { assembly, ward, booth, streetNo, houseNo });
      alert("House Selection Saved");
      console.log("houseNo",houseNo)
      // Navigate to HouseDetails with houseNo
      navigate("/assembly", { state: { houseNo } });
     
    } catch (error) {
      console.error("Error saving selection:", error);
      alert("Failed to save selection");
    }
  };

  return (
    <>
    <Header/>
    <div className="selection-form">
      <h2>New Registration</h2>
      <form onSubmit={handleSubmit}>
        <label>Assembly No:</label>
        <select value={assembly} onChange={(e) => setAssembly(e.target.value)} required>
          <option value="">Select Assembly</option>
          {assemblies.map((item, index) => (
            <option key={index} value={item}>{item}</option>
          ))}
        </select>

        <label>Ward No:</label>
        <select value={ward} onChange={(e) => setWard(e.target.value)} required disabled={!assembly}>
          <option value="">Select Ward</option>
          {wards.map((item, index) => (
            <option key={index} value={item}>{item}</option>
          ))}
        </select>

        <label>Booth No:</label>
        <select value={booth} onChange={(e) => setBooth(e.target.value)} required disabled={!ward}>
          <option value="">Select Booth</option>
          {booths.map((item, index) => (
            <option key={index} value={item}>{item}</option>
          ))}
        </select>

        <label>Street No:</label>
        <select value={streetNo} onChange={(e) => setStreetNo(e.target.value)} required disabled={!booth}>
          <option value="">Select Street</option>
          {streets.map((item, index) => (
            <option key={index} value={item}>{item}</option>
          ))}
        </select>

        <label>House No:</label>
        <input type="text" value={houseNo} onChange={(e) => setHouseNo(e.target.value)} required disabled={!streetNo} />

        <button type="submit">Okay</button>
      </form>
      
    </div>
    </>
  );
};

export default SelectionForm;


