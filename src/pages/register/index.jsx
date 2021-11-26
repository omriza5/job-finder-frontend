import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import { useForm } from "react-hook-form";
import "./style.css";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };


  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="form-container">
          <h1>Signup</h1>
          <div className="form-content">
            <div className="personal-details">
              <h3 className="form-info-heading">Personal Details</h3>
              <div className="input-box">
                <TextField
                  id="firstName"
                  label="First Name"
                  variant="standard"
                  inputProps={{ style: { fontSize: 18 } }}
                  InputLabelProps={{ style: { fontSize: 18 } }}
                  {...register("firstName", {
                    required: "First name is required",
                    minLength: {
                      value: 3,
                      message: "First name must be at least 3 characters",
                    },
                  })}
                />
                {errors.firstName && (
                  <p className="form-error">{errors.firstName.message}</p>
                )}
              </div>
              <div className="input-box">
                <TextField
                  id="lastName"
                  label="Last Name"
                  variant="standard"
                  inputProps={{ style: { fontSize: 18 } }}
                  InputLabelProps={{ style: { fontSize: 18 } }}
                  {...register("lastName", {
                    required: "Last name is required",
                    minLength: {
                      value: 3,
                      message: "First name must be at least 3 characters",
                    },
                  })}
                />
                {errors.lastName && (
                  <p className="form-error">{errors.lastName.message}</p>
                )}
              </div>
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
            </div>
            <div className="social-media">
              <div className="social-media-box">
                <h3 className="form-info-heading">
                  Linkedin <LinkedInIcon fontSize="large" />
                </h3>
                <div className="input-box">
                  <TextField
                    id="linkedinUsername"
                    label="Linkedin username"
                    variant="standard"
                    inputProps={{ style: { fontSize: 18 } }}
                    InputLabelProps={{ style: { fontSize: 18 } }}
                    {...register("linkedinUsername", {
                      required: "Linkedin username is required",
                      pattern: {
                        value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                        message: "Invalid username",
                      },
                    })}
                  />
                  {errors.linkedinUsername && (
                    <p className="form-error">
                      {errors.linkedinUsername.message}
                    </p>
                  )}
                </div>
                <div className="input-box">
                  <TextField
                    id="linkedinPassword"
                    label="Password"
                    type="password"
                    variant="standard"
                    inputProps={{ style: { fontSize: 18 } }}
                    InputLabelProps={{ style: { fontSize: 18 } }}
                    {...register("linkedinPassword", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: `Password must be at least 6 characters`,
                      },
                    })}
                  />
                  {errors.linkedinPassword && (
                    <p className="form-error">
                      {errors.linkedinPassword.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="social-media-box">
                <h3 className="form-info-heading">
                  Facebook <FacebookIcon fontSize="large" />
                </h3>
                <div className="input-box">
                  <TextField
                    id="facebookUsername"
                    label="Facebook username"
                    variant="standard"
                    inputProps={{ style: { fontSize: 18 } }}
                    InputLabelProps={{ style: { fontSize: 18 } }}
                    {...register("facebookUsername", {
                      required: "Facebook username is required",
                      pattern: {
                        value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                        message: "Invalid username",
                      },
                    })}
                  />
                  {errors.facebookUsername && (
                    <p className="form-error">
                      {errors.facebookUsername.message}
                    </p>
                  )}
                </div>
                <div className="input-box">
                  <TextField
                    id="facebookPassword"
                    label="Password"
                    type="password"
                    variant="standard"
                    inputProps={{ style: { fontSize: 18 } }}
                    InputLabelProps={{ style: { fontSize: 18 } }}
                    {...register("facebookPassword", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: `Password must be at least 6 characters`,
                      },
                    })}
                  />
                  {errors.facebookPassword && (
                    <p className="form-error">
                      {errors.facebookPassword.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="form-button">
            <Button
              variant="contained"
              type="submit"
              style={{ width: 250, height: 50, fontSize: 30 }}
            >
              Submit
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Register;