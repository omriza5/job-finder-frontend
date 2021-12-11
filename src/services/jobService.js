import http from "../services/httpService";
const apiBaseUrl = process.env.REACT_APP_PRO_BASE_URL;

export const deleteJob = async (jobId, userId) => {
  try {
    return await http.delete(`${apiBaseUrl}/jobs`, {
      data: {
        jobId,
        userId,
      },
    });
  } catch (error) {}
};
