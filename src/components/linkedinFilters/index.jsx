import React from "react";
import Select from "react-select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
  dateOptions,
  experienceLevelOptions,
} from "../../services/selectOptions";

import "./style.css";
const styles = {
  control: (base) => ({
    ...base,
    fontSize: "2rem",
  }),
  menu: (base) => ({
    ...base,
    fontSize: "2rem",
    fontWeight: "bold",
  }),
};

const LinkedinFilters = ({
  onSelect,
  onInputChange,
  onFiltersSubmit,
  numOfJobs,
}) => {
  return (
    <>
      <div className="filters">
        <div className="filter-input">
          <TextField
            name="job"
            label="Job"
            variant="standard"
            inputProps={{ style: { fontSize: 18 } }}
            InputLabelProps={{ style: { fontSize: 18 } }}
            onChange={onInputChange}
          />
        </div>
        <div className="filter-input">
          <TextField
            name="location"
            label="Location"
            variant="standard"
            inputProps={{ style: { fontSize: 18 } }}
            InputLabelProps={{ style: { fontSize: 18 } }}
            onChange={onInputChange}
          />
        </div>
        <div className="filter-input">
          <Select
            options={dateOptions}
            onChange={onSelect}
            name="datePosted"
            styles={styles}
            placeholder="Date Posted"
          />
        </div>
        <div className="filter-input">
          <Select
            options={experienceLevelOptions}
            onChange={onSelect}
            name="experienceLevel"
            styles={styles}
            placeholder="Exp Level"
          />
        </div>
        <div className="filter-input">
          <TextField
            name="linkedinPassword"
            label="Linkedin Password"
            variant="standard"
            type="password"
            inputProps={{ style: { fontSize: 18 } }}
            InputLabelProps={{ style: { fontSize: 18 } }}
            onChange={onInputChange}
          />
        </div>
        <Button
          variant="contained"
          type="submit"
          style={{ width: 250, height: 50, fontSize: 30 }}
          onClick={onFiltersSubmit}
        >
          Find Jobs
        </Button>
      </div>
      <div className="jobs-count">
        <span>Total Jobs</span>
        <span>{numOfJobs}</span>
      </div>
    </>
  );
};

export default LinkedinFilters;
