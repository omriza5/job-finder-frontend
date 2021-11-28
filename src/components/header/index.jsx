import React from "react";
import Avatar from "@mui/material/Avatar";
import "./style.css";
const Header = ({ title, firstName, lastName }) => {
  return (
    <>
      <div className="header">
        <div className="header-content">
          <h1>{title}</h1>
        </div>
        <div className="header-user-info">
          <h3>Hello Omri Zaher</h3>
          <div className="avatar">
            <Avatar />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
