import React, { useState, useEffect } from "react";
import {
  getAppliedColumns,
  getFilteredColumns,
} from "../../services/tableColumns.js";
import { jobStatusOptions } from "../../services/selectOptions";
import { toast } from "react-toastify";
import http from "../../services/httpService";
import Header from "../../components/header";
import JobsSummary from "../../components/jobsSummary/index";
import Table from "../../components/table";
import Select from "react-select";
import "./style.css";

const apiBaseUrl = process.env.REACT_APP_DEV_BASE_URL;
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

const Summary = ({ user }) => {
  const [allJobs, setAllJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    if (user) {
      const getAppliedJobs = async () => {
        const { data: jobs } = await http.get(`${apiBaseUrl}/jobs/${user._id}`);
        const applied = jobs.filter((job) => job.applied);
        setAppliedJobs(applied);
        setAllJobs(jobs);
      };
      getAppliedJobs();
    }
  }, [user]);

  const handleAppliedStatus = async (job, status) => {
    /** exit the function if selecting an option twice or more */
    if (status === job.original.status) return;

    try {
      /**call the server to update the status of the job */
      await http.put(`${apiBaseUrl}/jobs/status`, {
        jobId: job.original._id,
        userId: user._id,
        status,
      });
      toast.success(`Job status updated to ${status}`);
    } catch (error) {
      toast.error("Status upadte Failed");
    }
  };

  const handleFilter = ({ label: status }) => {
    const filtered = allJobs.filter((job) => job.status === status);

    setFilteredJobs(filtered);
  };

  return (
    <>
      <Header
        title="Summary"
        firstName={user && user.firstName}
        lastName={user && user.lastName}
      />
      <div className="summary-main">
        <div className="summary-main-upper">
          <JobsSummary jobs={allJobs} />
          <div className="appliedTable">
            <Table
              columns={getAppliedColumns(handleAppliedStatus)}
              data={appliedJobs}
            />
          </div>
        </div>
        <div className="summary-main-lower">
          <div className="summary-filter shadow-card">
            <p>Filter By Status</p>
            <Select
              options={jobStatusOptions}
              onChange={handleFilter}
              styles={styles}
            />
          </div>
          <div className="appliedTable">
            <Table columns={getFilteredColumns()} data={filteredJobs} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Summary;
