import React from "react";
import { Outlet } from "react-router-dom";
import SideNav from "../../components/sideNav";
const Home = () => {
  return (
    <>
      <div className="home">
        <SideNav />
        <Outlet />
      </div>
    </>
  );
};

export default Home;
