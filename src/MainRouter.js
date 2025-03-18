

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
        <Route path="/display" element={<HouseSelection />} />
        <Route path="/schemes" element={<GuranteeSchemes />} />
        {/* <Route path="/formcomponent" element={<FormComponent />} /> */}
        
        <Route path="/register" element={<SelectionForm />} />
        <Route path="/assembly" element={<HouseDetails />} />
        {/* <Route path="/schemes/:houseNo" element={<GuaranteeSchemes />} /> New Route */}
      </Routes>
    </Router>
  );
}

export default MainRouter;

