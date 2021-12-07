import http from "../services/httpService";

export const deleteJob = async (jobId, userId) => {
  try {
    return await http.delete("http://localhost:5000/api/jobs", {
      data: {
        jobId,
        userId,
      },
    });
  } catch (error) {}
};
