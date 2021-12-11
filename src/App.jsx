import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { getCurrentUser } from "./services/userService";
import { ToastContainer } from "react-toastify";
import Register from "./pages/register";
import Login from "./pages/login";
import Home from "./pages/home";
import Facebook from "./pages/facebook";
import Linkedin from "./pages/linkedin";
import Profile from "./pages/profile/index";
import Summary from "./pages/summary/index";
import Logout from "./components/logout/index";
import "./App.css";

const App = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(getCurrentUser());
  }, []);
  console.log("app: ", user);
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />

        <Route path="/" element={<Home user={user} />}>
          <Route path="/summary" element={<Summary user={user} />} />
          <Route path="/facebook" element={<Facebook user={user} />} />
          <Route path="/linkedin" element={<Linkedin user={user} />} />
          <Route path="/profile" element={<Profile user={user} />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
