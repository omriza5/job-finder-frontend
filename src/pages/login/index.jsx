import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import http from "../../services/httpService";
import { Link, useNavigate, Navigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { getCurrentUser } from "../../services/userService";

const authEndpoint = process.env.REACT_APP_DEV_AUTH_ENDPOINT;
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const { data: token } = await http.post(authEndpoint, data);
      localStorage.setItem("token", token);
      toast.success(`Welcome back`);
      navigate("/summary", { replace: true });
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  if (getCurrentUser()) {
    return <Navigate to="/summary" replace />;
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="form-container">
          <h1>Login</h1>

          <div className="input-box">
            <TextField
              id="email"
              label="Email"
              variant="standard"
              inputProps={{ style: { fontSize: 18 } }}
              InputLabelProps={{ style: { fontSize: 18 } }}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Invalid email",
                },
              })}
            />
            {errors.email && (
              <p className="form-error">{errors.email.message}</p>
            )}
          </div>
          <div className="input-box">
            <TextField
              id="password"
              label="Password"
              type="password"
              variant="standard"
              inputProps={{ style: { fontSize: 18 } }}
              InputLabelProps={{ style: { fontSize: 18 } }}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: `Password must be at least 6 characters`,
                },
              })}
            />
            {errors.password && (
              <p className="form-error">{errors.password.message}</p>
            )}
          </div>
          <div className="form-button-section">
            <Button
              variant="contained"
              type="submit"
              style={{ width: 250, height: 50, fontSize: 30 }}
            >
              Login
            </Button>

            <p>
              New user? <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
