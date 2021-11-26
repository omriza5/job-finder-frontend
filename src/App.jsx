import React, { useEffect } from "react";
import Register from "./pages/register";
import http from "./services/httpService";
import { ToastContainer } from "react-toastify";

import "./App.css";

const App = () => {
  useEffect(() => {}, []);
  return (
    <>
      <div className="App">
        <Register />
      </div>
      <ToastContainer />
    </>
  );
};

export default App;
