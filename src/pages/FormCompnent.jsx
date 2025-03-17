import React, { useState, useEffect } from "react";
import "../styles/FormComponent.scss"
import Header from "../components/Layout/Header";
import HouseDetails from "../components/HouseDetails/HouseDetails";

const FormComponent = () => {
  const [assemblyData, setAssemblyData] = useState([]);
  const [wardData, setWardData] = useState([]);
  const [boothData, setBoothData] = useState([]);
  const [streetData, setStreetData] = useState([]);
  const [houseData, setHouseData] = useState([]);

  const [assembly, setAssembly] = useState("");
  const [ward, setWard] = useState("");
  const [booth, setBooth] = useState("");
  const [street, setStreet] = useState("");
  const [house, setHouse] = useState("");

  const [loading, setLoading] = useState(true);
  const [showStreetDropdown, setShowStreetDropdown] = useState(false);
  const [showHouseDropdown, setShowHouseDropdown] = useState(false);
  const [showBoothOkButton, setShowBoothOkButton] = useState(true);
  const [showStreetOkButton, setShowStreetOkButton] = useState(false);

  const [showHouseDetails, setShowHouseDetails] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data.json"); // Adjust the path if necessary
        const data = await response.json();

        setAssemblyData(data.assemblies);
        setWardData(data.wards);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchBoothData = (assembly) => {
    setBoothData([]);
    setBooth("");
    setStreetData([]);
    setStreet("");
    setHouseData([]);
    setHouse("");
    setShowStreetDropdown(false);
    setShowHouseDropdown(false);
    setShowBoothOkButton(true);
    setShowStreetOkButton(false);
    setShowHouseDetails(false);

    

    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        setBoothData(data.booths[assembly] || []);
      })
      .catch((error) => console.error("Error fetching booth data:", error));
  };
const [showHouse, setShowHouse] = useState(false);

  const fetchStreetData = () => {
    if (!booth) {
      alert("Please select a Booth No.");
      return;
    }
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        setStreetData(data.streets[booth] || []);
        setShowStreetDropdown(true);
        setShowBoothOkButton(false);
        setShowStreetOkButton(true);
      })
      .catch((error) => console.error("Error fetching street data:", error));
      
      
  };



  const fetchHouseData = () => {
    if (!street) {
      alert("Please select a Street No.");
      return;
    }
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        setHouseData(data.houses[street] || []);
        setShowHouseDropdown(true);
        setShowStreetOkButton(false);
      })
      .catch((error) => console.error("Error fetching house data:", error));
      
  };

  const handleFinalSubmit = () => {
    if (house) {

      // setShowHouseDetails(true);;
          setShowHouse(true)

    }else{
      
      alert("Please select a House No.")
    }
  };

  return (
    <>
      <Header />
      {showHouseDetails ? (
        <HouseDetails houseNumber={house} />
      ) : (
        <div className="form-container">
          {loading ? (
            <p>Loading data...</p>
          ) : (
            <>
              <select
                value={assembly}
                onChange={(e) => {
                  setAssembly(e.target.value);
                  fetchBoothData(e.target.value);
                }}
              >
                <option value="">Assembly Number</option>
                {assemblyData.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <select value={ward} onChange={(e) => setWard(e.target.value)}>
                <option value="">Ward No</option>
                {wardData.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <select value={booth} onChange={(e) => setBooth(e.target.value)}>
                <option value="">Booth Number</option>
                {boothData.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              {showBoothOkButton && <button onClick={fetchStreetData}>Ok</button>}

              {showStreetDropdown && (
                <>
                  <select value={street} onChange={(e) => setStreet(e.target.value)}>
                    <option value="">Street No</option>
                    {streetData.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                  {showStreetOkButton && <button onClick={fetchHouseData }>Ok</button>}
                </>
              )}


              {showHouseDropdown && (
                <>
                  <select value={house} onChange={(e) => setHouse(e.target.value)}>
                    <option value="">House No</option>
                    {houseData.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>

                  <button onClick={handleFinalSubmit}>Ok</button>
                </>
              )}
            </>
          )}
        </div>
      )}

 {
  showHouse && ( <>
  <HouseDetails/>

  </>)
 }
      
    </>
  );
};

export default FormComponent;

// import React, { useState, useEffect } from "react";
// import "../components/styles/FormComponent.scss";
// import Header from "../components/Layout/Header";
// import HouseDetails from "./HouseDetails";

// const FormComponent = () => {
//   const [assemblyData, setAssemblyData] = useState([]);
//   const [wardData, setWardData] = useState([]);
//   const [boothData, setBoothData] = useState([]);
//   const [streetData, setStreetData] = useState([]);
//   const [houseData, setHouseData] = useState([]);

//   const [assembly, setAssembly] = useState("");
//   const [ward, setWard] = useState("");
//   const [booth, setBooth] = useState("");
//   const [street, setStreet] = useState("");
//   const [house, setHouse] = useState("");

//   const [loading, setLoading] = useState(true);
//   const [showStreetDropdown, setShowStreetDropdown] = useState(false);
//   const [showHouseDropdown, setShowHouseDropdown] = useState(false);
//   const [showBoothOkButton, setShowBoothOkButton] = useState(true);
//   const [showStreetOkButton, setShowStreetOkButton] = useState(false);

//   const [showHouse, setShowHouse] = useState(false);

//   useEffect(() => {
//     const fetchAssemblyData = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/assemblies");
//         const data = await response.json();
//         setAssemblyData(data.assemblies || []); // Ensure it's always an array
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching assembly data:", error);
//         setLoading(false);
//       }
//     };

//     fetchAssemblyData();
//   }, []);

//   const fetchWardData = async (selectedAssembly) => {
//     setWardData([]);
//     setWard("");
//     setBoothData([]);
//     setBooth("");
//     setStreetData([]);
//     setStreet("");
//     setHouseData([]);
//     setHouse("");
//     setShowStreetDropdown(false);
//     setShowHouseDropdown(false);
//     setShowBoothOkButton(true);
//     setShowStreetOkButton(false);
//     setShowHouse(false);

//     try {
//       const response = await fetch(`http://localhost:5000/api/wards/${selectedAssembly}`);
//       const data = await response.json();
//       setWardData(data.wards || []);
//     } catch (error) {
//       console.error("Error fetching ward data:", error);
//     }
//   };

//   const fetchBoothData = async (selectedWard) => {
//     setBoothData([]);
//     setBooth("");
//     setStreetData([]);
//     setStreet("");
//     setHouseData([]);
//     setHouse("");
//     setShowStreetDropdown(false);
//     setShowHouseDropdown(false);
//     setShowBoothOkButton(true);
//     setShowStreetOkButton(false);
//     setShowHouse(false);

//     try {
//       const response = await fetch(`http://localhost:5000/api/booths/${selectedWard}`);
//       const data = await response.json();
//       setBoothData(data.booths || []);
//     } catch (error) {
//       console.error("Error fetching booth data:", error);
//     }
//   };

//   const fetchStreetData = async () => {
//     if (!booth) {
//       alert("Please select a Booth No.");
//       return;
//     }

//     try {
//       const response = await fetch(`http://localhost:5000/api/streets/${booth}`);
//       const data = await response.json();
//       setStreetData(data.streets || []);
//       setShowStreetDropdown(true);
//       setShowBoothOkButton(false);
//       setShowStreetOkButton(true);
//     } catch (error) {
//       console.error("Error fetching street data:", error);
//     }
//   };

//   const fetchHouseData = async () => {
//     if (!street) {
//       alert("Please select a Street No.");
//       return;
//     }

//     try {
//       const response = await fetch(`http://localhost:5000/api/houses/${street}`);
//       const data = await response.json();
//       setHouseData(data.houses || []);
//       setShowHouseDropdown(true);
//       setShowStreetOkButton(false);
//     } catch (error) {
//       console.error("Error fetching house data:", error);
//     }
//   };

//   const handleFinalSubmit = () => {
//     if (house) {
//       setShowHouse(true);
//     } else {
//       alert("Please select a House No.");
//     }
//   };

//   return (
//     <>
//       <Header />
//       <div className="form-container">
//         {loading ? (
//           <p>Loading data...</p>
//         ) : (
//           <>
//             {/* Assembly Selection */}
//             <select
//               value={assembly}
//               onChange={(e) => {
//                 setAssembly(e.target.value);
//                 fetchWardData(e.target.value);
//               }}
//             >
//               <option value="">Assembly Number</option>
//               {(assemblyData || []).map((item, index) => (
//                 <option key={index} value={item}>
//                   {item}
//                 </option>
//               ))}
//             </select>

//             {/* Ward Selection */}
//             <select
//               value={ward}
//               onChange={(e) => {
//                 setWard(e.target.value);
//                 fetchBoothData(e.target.value);
//               }}
//             >
//               <option value="">Ward No</option>
//               {(wardData || []).map((item, index) => (
//                 <option key={index} value={item}>
//                   {item}
//                 </option>
//               ))}
//             </select>

//             {/* Booth Selection */}
//             <select value={booth} onChange={(e) => setBooth(e.target.value)}>
//               <option value="">Booth Number</option>
//               {(boothData || []).map((item, index) => (
//                 <option key={index} value={item}>
//                   {item}
//                 </option>
//               ))}
//             </select>

//             {showBoothOkButton && <button onClick={fetchStreetData}>Ok</button>}

//             {/* Street Selection */}
//             {showStreetDropdown && (
//               <>
//                 <select value={street} onChange={(e) => setStreet(e.target.value)}>
//                   <option value="">Street No</option>
//                   {(streetData || []).map((item, index) => (
//                     <option key={index} value={item}>
//                       {item}
//                     </option>
//                   ))}
//                 </select>
//                 {showStreetOkButton && <button onClick={fetchHouseData}>Ok</button>}
//               </>
//             )}

//             {/* House Selection */}
//             {showHouseDropdown && (
//               <>
//                 <select value={house} onChange={(e) => setHouse(e.target.value)}>
//                   <option value="">House No</option>
//                   {(houseData || []).map((item, index) => (
//                     <option key={index} value={item}>
//                       {item}
//                     </option>
//                   ))}
//                 </select>

//                 <button onClick={handleFinalSubmit}>Ok</button>
//               </>
//             )}
//           </>
//         )}
//       </div>

//       {/* Show House Details Component when House No is selected */}
//       {showHouse && <HouseDetails houseNumber={house} />}
//     </>
//   );
// };

// export default FormComponent;
