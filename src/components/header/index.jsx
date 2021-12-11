import React from "react";
import { Link } from "react-router-dom";
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
          <h3>
            Hello {firstName} {lastName},<Link to="/logout">Logout</Link>
          </h3>
          <div className="avatar">
            <Avatar />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
