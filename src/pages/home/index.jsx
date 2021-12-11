import React, { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import "./style.css";

import SideNav from "../../components/sideNav";
import { getCurrentUser } from "../../services/userService";
const Home = () => {
  useEffect(() => {
    if (!getCurrentUser()) {
      return <Navigate to="/login" replace />;
    }
  }, []);

  return (
    <>
      <div className="home">
        <SideNav />
        <div className="home-main">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Home;
