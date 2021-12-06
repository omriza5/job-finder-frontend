import React, { useState, useEffect } from "react";
import Header from "../../components/header";
import LinkedinFilters from "../../components/linkedinFilters";
import Table from "../../components/table";
import http from "../../services/httpService";
import { linkedinColumns } from "../../services/tableColumns";
import "./style.css";

const linkedinCrawlEndpoint = process.env.REACT_APP_DEV_LINKEDIN_ENDPOINT;

const Linkedin = () => {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    job: "",
    location: "",
    datePosted: "",
    experienceLevel: "",
    linkedinPassword: "",
  });

  useEffect(() => {
    const getJobs = async () => {
      try {
        const { data } = await http.get(
          "http://localhost:5000/api/jobs/61ac8abcce6a98411e4b291a"
        );
        setJobs(data.jobs);
      } catch (error) {}
    };

    getJobs();
  }, []);
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
      const { response: data } = await http.post(linkedinCrawlEndpoint, {
        filterOptions: {
          job: filters.job,
          location: filters.location,
          datePosted: filters.datePosted || "Any Time",
          experienceLevel: filters.experienceLevel || "Entry level",
        },
        platform: "linkedin",
        platformPass: filters.linkedinPassword,
      });
      console.log(data);
    } catch (error) {}
  };

  return (
    <>
      <Header title="Linkedin" />
      <div className="platform-main">
        <div className="platform-main-left shadow-card">
          <LinkedinFilters
            onSelect={handleSelect}
            onInputChange={handleTextInput}
            onFiltersSubmit={handleSubmit}
          />
        </div>
        <div className="platform-main-right shadow-card">
          {jobs.length > 0 && <Table columns={linkedinColumns} data={jobs} />}
        </div>
      </div>
    </>
  );
};

export default Linkedin;
