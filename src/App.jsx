import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/register";
import Login from "./pages/login";
import http from "./services/httpService";
import { ToastContainer } from "react-toastify";

import "./App.css";

const App = () => {
  useEffect(() => {}, []);
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={null} />
        <Route path="/" element={null} />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
