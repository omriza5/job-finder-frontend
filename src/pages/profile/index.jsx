import React from "react";
import Header from "../../components/header";
import "./style.css";

const Profile = ({ user }) => {
  return (
    <>
      <Header
        title="Profile"
        firstName={user && user.firstName}
        lastName={user && user.lastName}
      />
      <div className="profile-main">
        <img
          src="https://www.graphicsfactory.com/clip-art/image_files/image/0/1706700-work-in-progress-street-sign-vector-icon.jpg"
          alt="work in progress"
        />
      </div>
    </>
  );
};

export default Profile;
