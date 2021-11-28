import React from "react";
import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import SettingsIcon from "@mui/icons-material/Settings";
import "./style.css";

const sideNavItems = [
  {
    id: 1,
    label: "Summary",
    icon: <HomeIcon style={{ fill: "#fff", fontSize: "3rem" }} />,
    path: "/summary",
    default: true,
  },
  {
    id: 2,
    label: "Linkedin",
    icon: <LinkedInIcon style={{ fill: "#fff", fontSize: "3rem" }} />,
    path: "/linkedin",
  },
  {
    id: 3,
    label: "Facebook",
    icon: <FacebookIcon style={{ fill: "#fff", fontSize: "3rem" }} />,
    path: "/facebook",
  },
  {
    id: 4,
    label: "Profile",
    icon: <SettingsIcon style={{ fill: "#fff", fontSize: "3rem" }} />,
    path: "/profile",
  },
];
const SideNav = () => {
  return (
    <>
      <div className="side-nav">
        <div className="side-nav-main-title border-bottom-grey">
          <h1>Job Finder</h1>
        </div>

        <ul className="side-nav-items">
          {sideNavItems.map((item) => (
            <div className="side-nav-item" key={item.id}>
              <div className="side-nav-icon">{item.icon}</div>
              <NavLink
                className={({ isActive }) => (isActive ? "active" : "inactive")}
                to={item.path}
                end={item.default ? true : false}
              >
                {item.label}
              </NavLink>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SideNav;
