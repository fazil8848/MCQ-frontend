import api from "../utils/api";

export const submitFeedback = async (feedbackData) => {
  try {
    const response = await api.post("/feedback", feedbackData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to submit feedback";
  }
};

export const getFeedback = async (testResultId) => {
  try {
    const response = await api.get(`/feedback/${testResultId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch feedback";
  }
};
