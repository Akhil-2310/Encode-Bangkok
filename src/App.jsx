import CreateGroups from "./pages/CreateGroups";
import Home from "./pages/Home"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import IdentityPage from "./pages/Identity";


function App() {
  

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/identity" element={<IdentityPage />} />
          <Route path="/create" element={<CreateGroups />} />
        </Routes>
      </Router>
    </>
  );
}

export default App
