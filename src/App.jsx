import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import http from "./services/httpService";

import { ToastContainer } from "react-toastify";
import Register from "./pages/register";
import Login from "./pages/login";
import Home from "./pages/home";
import Facebook from "./pages/facebook";
import Linkedin from "./pages/linkedin";
import Profile from "./pages/profile/index";
import Summary from "./pages/summary/index";
import "./App.css";
import { getCurrentUser } from "./services/userService";
import Logout from "./components/logout/index";

const App = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />

        <Route path="/" element={<Home />} user={user}>
          <Route path="/summary" element={<Summary />} />
          <Route path="/facebook" element={<Facebook />} />
          <Route path="/linkedin" element={<Linkedin />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
