import jwt_decode from "jwt-decode";

export const getCurrentUser = () => {
  try {
    const jwt = localStorage.getItem("token");
    const user = jwt_decode(jwt);
    return user;
  } catch (error) {}
};
