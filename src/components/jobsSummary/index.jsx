import React, { useState, useEffect } from "react";
import "./style.css";
const JobsSummary = ({ jobs }) => {
  const [relevantJobs, setRelevantJobs] = useState(0);
  const [pendingJobs, setPendingJobs] = useState(0);
  const [phoneInterviewJobs, setPhoneInterviewJobs] = useState(0);
  const [techInterviewJobs, setTechInterviewJobs] = useState(0);
  const [HrInterviewJobs, setHrInterviewJobs] = useState(0);
  const [rejectedJobs, setRejectedJobs] = useState(0);

  useEffect(() => {
    setRelevantJobs(jobs.filter((j) => j.isRelevant && !j.applied).length);
    setPendingJobs(jobs.filter((j) => j.status === "CV Sent").length);
    setPhoneInterviewJobs(
      jobs.filter((j) => j.status === "Phone Interview").length
    );
    setTechInterviewJobs(
      jobs.filter((j) => j.status === "Technical Interview").length
    );
    setHrInterviewJobs(jobs.filter((j) => j.status === "HR Interview").length);
    setRejectedJobs(jobs.filter((j) => j.status === "Rejected").length);
  }, [jobs]);
  return (
    <>
      <div className="jobs-summary shadow-card">
        <div className="summary-par">
          <p>Relevant:</p>
          <span>{relevantJobs}</span>
        </div>
        <div className="summary-par">
          <p>CV Sent:</p>
          <span>{pendingJobs}</span>
        </div>
        <div className="summary-par">
          <p>Phone Interview:</p>
          <span>{phoneInterviewJobs}</span>
        </div>
        <div className="summary-par">
          <p>Tech Interview:</p>
          <span>{techInterviewJobs}</span>
        </div>
        <div className="summary-par">
          <p>HR Interview:</p>
          <span>{HrInterviewJobs}</span>
        </div>
        <div className="summary-par">
          <p>Rejected:</p>
          <span>{rejectedJobs}</span>
        </div>
      </div>
    </>
  );
};

export default JobsSummary;
