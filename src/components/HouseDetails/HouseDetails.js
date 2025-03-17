
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "../HouseDetails/HouseDetails.scss";
import SelectDependents from "../HouseDetails/SelectDependents";
import MemberForm from "../HouseDetails/MemberForm";
import Header from "../Layout/Header";

import Alert from '@mui/material/Alert';
import Snackbar from "@mui/material/Snackbar";


const HouseDetails = () => {
  const location = useLocation();
  // const navigate = useNavigate();
 
  const houseNo = location.state?.houseNo || "";

  const [dependents, setDependents] = useState([]);
  const [head, setHead] = useState({ relation: "Head of the Family", name: "", age: "" });
  const [spouse, setSpouse] = useState({ relation: "Spouse", name: "", age: "" });
  const [father, setFather] = useState({ relation: "Father", name: "", age: "" });
  const [mother, setMother] = useState({ relation: "Mother", name: "", age: "" });

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");

  // Common lists for hobbies and activities
  const hobbiesList = ["Reading", "Sports", "Music", "Dancing", "Painting"];
  const activitiesList = ["Football", "Cricket", "Swimming", "Chess", "Running"];

  useEffect(() => {
    const fetchHouseDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/houses/${houseNo}`);
        const houseData = res.data;
       
        // setSelecthouseno(houseData.)

        setHead(houseData.members.find((m) => m.relation === "Head of the Family") || head);
        setSpouse(houseData.members.find((m) => m.relation === "Spouse") || spouse);
        setFather(houseData.members.find((m) => m.relation === "Father") || father);
        setMother(houseData.members.find((m) => m.relation === "Mother") || mother);
        setDependents(houseData.members.filter((m) => !["Head of the Family", "Spouse", "Father", "Mother"].includes(m.relation)));
      } catch (error) {
        console.error("Error fetching house details:", error);
      }
    };

    fetchHouseDetails();
  }, [houseNo]);

  const handleDependentSelection = (relation) => {
    setDependents((prevDependents) => [
      ...prevDependents,
      { relation, name: "", age: "", aadhar: "", bpl: "", voterId: "", email: "", phone: "", occupation: "", hobby: "", activity: "" }
    ]);
  };

  const removeDependent = (index) => {
    setDependents((prevDependents) => prevDependents.filter((_, i) => i !== index));
  };

  const saveHouseDetails = async () => {
    try {
      const members = [head, spouse, father, mother, ...dependents];
      await axios.post("http://localhost:5000/api/houses", { houseNo, members });
      setAlertMessage("House details saved successfully!");
      setAlertSeverity("success");
      setAlertOpen(true);
    } catch (error) {
      console.error("Error saving house details:", error);
      setAlertMessage("Error saving house details. Please try again!");
      setAlertSeverity("error");
      setAlertOpen(true);
    }
  };

  // Navigate to View Schemes Page
  // const handleViewSchemes = () => {
  //   navigate(`/schemes/${houseNo}`);
  // };

  //Activity

  

  return (
    
    <>
   
    <Header/>
    <div className="house-details">
      <h2>House No - {houseNo}</h2>

      <SelectDependents selectedDependents={dependents} handleDependentSelection={handleDependentSelection} />

      <table className="house-details-table">
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <MemberForm title="Head of the Family" member={head} setMember={setHead} hobbiesList={hobbiesList} activitiesList={activitiesList} />
          <MemberForm title="Spouse" member={spouse} setMember={setSpouse} hobbiesList={hobbiesList} activitiesList={activitiesList} />
          <MemberForm title="Father" member={father} setMember={setFather} hobbiesList={hobbiesList} activitiesList={activitiesList} />
          <MemberForm title="Mother" member={mother} setMember={setMother} hobbiesList={hobbiesList} activitiesList={activitiesList} />

          {dependents.map((dependent, index) => (
            <MemberForm
              key={index}
              title={dependent.relation}
              member={dependent}
              setMember={(updatedMember) =>
                setDependents((prevDependents) =>
                  prevDependents.map((dep, i) => (i === index ? updatedMember : dep))
                )
              }
              hobbiesList={hobbiesList}
              activitiesList={activitiesList}
              isMultiple={true}
              
              addDependent={handleDependentSelection}
              deleteDependent={() => removeDependent(index)}
            />
          ))}
        </tbody>
      </table>
      
      <h3>Total Members: {4 + dependents.length}</h3>

      <div className="button-group">
        <button className="save-button" onClick={saveHouseDetails}>Save House Details</button>
        
        {/* <button className="view-schemes-button" onClick={() => navigate(`/schemes/${houseNo}`)}>
        View Schemes
      </button> */}
      <Snackbar
        open={alertOpen}
        autoHideDuration={4000}
        onClose={() => setAlertOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert sx={{
    fontSize: "1.2rem",  // Increase text size
    padding: "20px",     // Increase padding
    width: "400px"       // Increase width
  }} onClose={() => setAlertOpen(false)} severity={alertSeverity} variant="filled">
          {alertMessage}
        </Alert>
      </Snackbar>
      </div>
    </div>
    </>
  );
};

export default HouseDetails;
