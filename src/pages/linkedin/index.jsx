import React, { useState, useEffect } from "react";
import http from "../../services/httpService";
import { getLinkedinColumns } from "../../services/tableColumns";
import { deleteJob } from "../../services/jobService";
import { toast } from "react-toastify";
import Header from "../../components/header";
import LinkedinFilters from "../../components/linkedinFilters";
import Table from "../../components/table";
import CircularProgress from "@mui/material/CircularProgress";
import "./style.css";

const apiBaseUrl = process.env.REACT_APP_PRO_BASE_URL;
const Linkedin = ({ user }) => {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    job: "",
    location: "",
    datePosted: "",
    experienceLevel: "",
    linkedinPassword: "",
  });
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (user) {
      const getJobs = async () => {
        try {
          setIsFetching(true);
          const { data: jobs } = await http.get(
            `${apiBaseUrl}/jobs/${user._id}`
          );
          setJobs(jobs.filter((job) => !job.applied));
          setIsFetching(false);
        } catch (error) {}
      };
      getJobs();
    }
  }, [user]);

  const handleSelect = (select, action) => {
    const prop = action.name;
    setFilters({ ...filters, [prop]: select.label });
  };
  const handleTextInput = (e) => {
    const prop = e.target.name;
    const value = e.target.value;
    setFilters({ ...filters, [prop]: value });
  };
  const handleSubmit = async () => {
    try {
      setIsFetching(true);
      const { data } = await http.post(`${apiBaseUrl}/crawl/linkedin`, {
        filterOptions: {
          job: filters.job,
          location: filters.location,
          datePosted: filters.datePosted || "Any Time",
          experienceLevel: filters.experienceLevel || "Entry level",
        },
        platform: "linkedin",
        platformPass: filters.linkedinPassword,
      });

      const relevantJobs = data.jobs.filter((j) => j.isRelevant && !j.applied);
      const numOfNewJobsFound = data.jobs.length - jobs.length;

      setJobs(relevantJobs);
      setIsFetching(false);
      toast.success(`Search Finished with ${numOfNewJobsFound} results`);
    } catch (error) {
      setIsFetching(false);
      if (error && error.response && error.response.status === 400) {
        toast.error(error.response.data);
      }
    }
  };

  const handleDelete = async (jobId) => {
    const originalJobs = [...jobs];
    try {
      const filteredJobs = jobs.filter((job) => job._id !== jobId);
      setJobs(filteredJobs);
      const { status } = await deleteJob(jobId, user._id);

      if (status === 200) {
        toast.success("Job Deleted Successfully");
      }
    } catch (error) {
      toast.error("Deletion Failed!");
      setJobs(originalJobs);
    }
    /** update the view */
  };
  const handleSave = async (jobId) => {
    try {
      const { data: updatedUser } = await http.put(
        "http://localhost:5000/api/jobs",
        {
          jobId,
          userId: user._id,
        }
      );
      const newJobs = updatedUser.jobs.filter(
        (job) => job.isRelevant && !job.applied
      );
      setJobs(newJobs);
      toast.success("Job Saved Successfully");
    } catch (error) {
      toast.error("Save Failed");
    }
  };

  return (
    <>
      <Header
        title="Linkedin"
        firstName={user && user.firstName}
        lastName={user && user.lastName}
      />
      <div className="platform-main">
        <div className="platform-main-left shadow-card">
          <LinkedinFilters
            onSelect={handleSelect}
            onInputChange={handleTextInput}
            onFiltersSubmit={handleSubmit}
            numOfJobs={jobs.length}
          />
        </div>
        <div className="platform-main-right shadow-card">
          {isFetching && (
            <div className="circular-progress">
              <CircularProgress />
            </div>
          )}
          {jobs.length > 0 && (
            <Table
              columns={getLinkedinColumns(handleDelete, handleSave)}
              data={jobs}
            />
          )}
          {jobs.length <= 0 && (
            <p className="message">You dont have any relevant jobs yet... </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Linkedin;
