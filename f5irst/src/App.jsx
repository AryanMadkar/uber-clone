import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignup from "./pages/CaptainSignup";
import Eroorpage from "./pages/Eroorpage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/userlogin" element={<UserLogin />} />
        <Route path="/usersignin" element={<UserSignup />} />
        <Route path="/Captainlogin" element={<CaptainLogin />} />
        <Route path="/CaptainSignup" element={<CaptainSignup />} />
        <Route path="*" element={<Eroorpage />} />
        {/* Add more routes here */}
      </Routes>
    </div>
  );
}

export default App;
