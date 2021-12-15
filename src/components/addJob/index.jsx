import React from "react";
import http from "../../services/httpService";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./style.css";

const apiBaseUrl = process.env.REACT_APP_DEV_BASE_URL;

const AddJob = ({ onSubmit, x }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      <div className="add-job-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Add Job Manually</h1>
          <div className="input-box">
            <TextField
              id="title"
              label="Title"
              variant="standard"
              inputProps={{ style: { fontSize: 18 } }}
              InputLabelProps={{ style: { fontSize: 18 } }}
              {...register("title", {
                required: "Title is required",
                minLength: {
                  value: 3,
                  message: "Title must be at least 3 characters",
                },
              })}
            />
            {errors.title && (
              <p className="form-error">{errors.title.message}</p>
            )}
          </div>
          <div className="input-box">
            <TextField
              id="company"
              label="Company"
              variant="standard"
              inputProps={{ style: { fontSize: 18 } }}
              InputLabelProps={{ style: { fontSize: 18 } }}
              {...register("company", {
                required: "Company is required",
                minLength: {
                  value: 3,
                  message: "Company must be at least 3 characters",
                },
              })}
            />
            {errors.company && (
              <p className="form-error">{errors.company.message}</p>
            )}
          </div>
          <div className="input-box">
            <TextField
              id="location"
              label="Location"
              variant="standard"
              inputProps={{ style: { fontSize: 18 } }}
              InputLabelProps={{ style: { fontSize: 18 } }}
              {...register("location")}
            />
          </div>
          <div className="input-box">
            <TextField
              id="link"
              label="Link"
              variant="standard"
              inputProps={{ style: { fontSize: 18 } }}
              InputLabelProps={{ style: { fontSize: 18 } }}
              {...register("link")}
            />
          </div>
          <div className="input-box">
            <TextField
              id="note"
              label="Notes"
              multiline
              inputProps={{ style: { fontSize: 18 } }}
              InputLabelProps={{ style: { fontSize: 18 } }}
              {...register("notes")}
            />
          </div>
          <Button
            variant="contained"
            type="submit"
            style={{ width: 250, height: 50, fontSize: 30 }}
          >
            Add
          </Button>
          {x && <p>its okay</p>}
        </form>
      </div>
    </>
  );
};

export default AddJob;
