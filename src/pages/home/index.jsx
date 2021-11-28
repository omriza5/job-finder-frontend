import React from "react";
import { Outlet } from "react-router-dom";
import "./style.css";

import SideNav from "../../components/sideNav";
import Header from "../../components/header";
const Home = () => {
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
