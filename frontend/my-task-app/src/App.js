import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from "./components/Registration/registration";
import Verification from "./components/Verification/verification";
import Login from "./components/Login/login";
import TaskCreation from "./components/taskcreation";
import LandingPage from "./components/LandingPage/LandingPage";
import HomePage from "./components/HomePage/homepage";
import "./components/HomePage/homepage.css";
import "./components/Registration/registration.css";
import "./components/LandingPage/LandingPage.css";
import "./components/Verification/verification.css";
import "./components/Login/login.css";
import { AuthProvider } from "./components/authcontext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" exact element={<LandingPage />} />
          <Route path="/register" exact element={<Registration />} />
          <Route path="/confirm-signup" exact element={<Verification />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/homepage" exact element={<HomePage />} />{" "}
          <Route path="/create-task" exact element={<TaskCreation />} />{" "}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

export default App;
