import React, { useState, useEffect } from "react";
import {
  getAppliedColumns,
  getFilteredColumns,
} from "../../services/tableColumns.js";
import { jobStatusOptions } from "../../services/selectOptions";
import { toast } from "react-toastify";
import http from "../../services/httpService";
import CircularProgress from "@mui/material/CircularProgress";
import Header from "../../components/header";
import JobsSummary from "../../components/jobsSummary/index";
import Table from "../../components/table";
import Select from "react-select";
import Modal from "react-modal";
import AddJob from "../../components/addJob/index.jsx";
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
  const [isFetching, setIsFetching] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    if (user) {
      const getAppliedJobs = async () => {
        setIsFetching(true);
        const { data: jobs } = await http.get(`${apiBaseUrl}/jobs/${user._id}`);
        const applied = jobs.filter((job) => job.applied);
        setAppliedJobs(applied);
        setAllJobs(jobs);
        setIsFetching(false);
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

  const handleJobAdd = async (data) => {
    try {
      const { data: job } = await http.post(
        `${apiBaseUrl}/jobs/${user._id}`,
        data
      );
      const jobs = [...appliedJobs];
      jobs.push(job);
      setAppliedJobs(jobs);
      toast.success("Job added successfully");
      setTimeout(() => {
        setModalIsOpen(false);
      }, 2000);
    } catch (error) {
      toast.error("Somthing went wrong");
    }
  };
  return (
    <>
      <Header
        title="Summary"
        firstName={user && user.firstName}
        lastName={user && user.lastName}
      />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        // styles={modalStyles}
      >
        <AddJob onSubmit={handleJobAdd} />
      </Modal>
      <div className="summary-main">
        <div className="summary-main-upper">
          <JobsSummary jobs={allJobs} />
          <div className="appliedTable">
            {isFetching && <CircularProgress />}
            {appliedJobs.length > 0 && (
              <Table
                columns={getAppliedColumns(handleAppliedStatus)}
                data={appliedJobs}
              />
            )}
            {!isFetching && appliedJobs.length === 0 && (
              <p className="message">
                You dont have any relevant jobs yet...
                <br />
                Go to Linkedin tab{" "}
              </p>
            )}
          </div>
        </div>
        <div className="summary-main-lower">
          <div className="summary-lower-container">
            <div
              className="add-manual shadow-card"
              onClick={() => setModalIsOpen(true)}
            >
              +
            </div>
            <div className="summary-filter shadow-card">
              <p>Filter By Status</p>
              <Select
                options={jobStatusOptions}
                onChange={handleFilter}
                styles={styles}
              />
            </div>
          </div>

          <div className="appliedTable">
            {appliedJobs.length > 0 && (
              <Table columns={getFilteredColumns()} data={filteredJobs} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Summary;
