import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import http from "./services/httpService";
import { ToastContainer } from "react-toastify";
import Register from "./pages/register";
import Login from "./pages/login";
import Home from "./pages/home";

import "./App.css";
import Facebook from "./pages/facebook";
import Linkedin from "./pages/linkedin";
import Profile from "./pages/profile/index";

const App = () => {
  useEffect(() => {}, []);
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Home />}>
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
