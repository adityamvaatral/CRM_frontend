

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HouseDetails from "./components/HouseDetails/HouseDetails";
import SelectionForm from "./pages/SelectionForm";
import Login from "./pages/Login";

import HouseSelection from "./components/DisplayData/HouseSelection";

import GuranteeSchemes from "./components/DisplayData/GuaranteeSchemes";

// import GuaranteeSchemes from "../src/components/Schemes/GuaranteeSchemes";

function MainRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/view" element={<HouseSelection />} />
        <Route path="/schemes" element={<GuranteeSchemes />} />
        <Route path="/register" element={<SelectionForm />} />
        <Route path="/housedetails" element={<HouseDetails />} />

      </Routes>
    </Router>
  );
}

export default MainRouter;

