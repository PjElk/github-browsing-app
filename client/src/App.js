import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UserDetailsPage from "./pages/UserDetailsPage";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap styles

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />{" "}
        {/* Use element prop for components */}
        <Route path="/users/:username" element={<UserDetailsPage />} />{" "}
        {/* Use element prop for components */}
      </Routes>
    </Router>
  );
};

export default App;
