

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HouseDetails from "./components/HouseDetails/HouseDetails";
import SelectionForm from "./pages/SelectionForm";
import Login from "./pages/Login";
import FormComponent from "./pages/FormCompnent";
import FamilyDetails from "./pages/FamilyDetails";
// import GuaranteeSchemes from "../src/components/Schemes/GuaranteeSchemes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/display" element={<FamilyDetails />} />
        <Route path="/formcomponent" element={<FormComponent />} />
        <Route path="/register" element={<SelectionForm />} />
        <Route path="/assembly" element={<HouseDetails />} />
        {/* <Route path="/schemes/:houseNo" element={<GuaranteeSchemes />} /> New Route */}
      </Routes>
    </Router>
  );
}

export default App;

