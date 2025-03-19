
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
  const houseNo = location.state?.houseNo || "";

  const [dependents, setDependents] = useState([]);
  const [head, setHead] = useState({ relation: "Head of the Family", name: "", age: "", aadhar: "", bpl: "", voterId: "", email: "", phone: "", occupation: "" });
  const [spouse, setSpouse] = useState({ relation: "Spouse", name: "", age: "", aadhar: "", bpl: "", voterId: "", email: "", phone: "", occupation: "" });
  const [father, setFather] = useState({ relation: "Father", name: "", age: "", aadhar: "", bpl: "", voterId: "", email: "", phone: "", occupation: "" });
  const [mother, setMother] = useState({ relation: "Mother", name: "", age: "", aadhar: "", bpl: "", voterId: "", email: "", phone: "", occupation: "" });

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const hobbiesList = ["Reading", "Sports", "Music", "Dancing", "Painting"];
  const activitiesList = ["Football", "Cricket", "Swimming", "Chess", "Running"];


  useEffect(() => {
    const fetchHouseDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/houses/${houseNo}`);
        const houseData = res.data;

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

  useEffect(() => {
    const validateForm = () => {
      const members = [head, spouse, father, mother, ...dependents];
      for (const member of members) {
        if (!member.name || !member.age || !/^\d+$/.test(member.age) || member.age < 1 || member.age > 120) return false;
        if (!/^\d{12}$/.test(member.aadhar)) return false;  // Aadhar validation
        if (member.age > 18 && (!member.voterId || !/^[A-Za-z0-9]{10,}$/.test(member.voterId))) return false; // Voter ID validation
        if (member.phone && !/^\d{10}$/.test(member.phone)) return false; // Phone validation
        if (member.email && !/^\S+@\S+\.\S+$/.test(member.email)) return false; // Email validation
        if (!member.occupation) return false; // Occupation required
      }
      return true;
    };

    setIsFormValid(validateForm());
  }, [head, spouse, father, mother, dependents]);

  const handleDependentSelection = (relation) => {
    setDependents((prevDependents) => [
      ...prevDependents,
      { relation, name: "", age: "", aadhar: "", bpl: "", voterId: "", email: "", phone: "", occupation: "" }
    ]);
  };

  const removeDependent = (index) => {
    setDependents((prevDependents) => prevDependents.filter((_, i) => i !== index));
  };

  const saveHouseDetails = async () => {
    if (!isFormValid) {
      setAlertMessage("Please fill in all required fields before saving.");
      setAlertSeverity("error");
      setAlertOpen(true);
      return;
    }

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

  return (
    <>
      <Header />
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
          <button className="save-button" onClick={saveHouseDetails} disabled={!isFormValid}>Save House Details</button>
        </div>

        
        

        <Snackbar open={alertOpen} autoHideDuration={4000} onClose={() => setAlertOpen(false)}>
          <Alert onClose={() => setAlertOpen(false)} severity={alertSeverity} variant="filled">
            {alertMessage}
          </Alert>
        </Snackbar>
      </div>
    </>
  );
};

export default HouseDetails;
