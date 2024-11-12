import CreateGroups from "./pages/CreateGroups";
import Home from "./pages/Home"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import IdentityPage from "./pages/Identity";
import AllGroups from "./pages/AllGroups";
import GroupDetails from "./pages/GroupDetails";


function App() {
  

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/identity" element={<IdentityPage />} />
          <Route path="/create" element={<CreateGroups />} />
          <Route path="/all" element={<AllGroups />} />
          <Route path="/group/:groupId" element={<GroupDetails />} />
        </Routes>
      </Router>
    </>
  );
}

export default App
