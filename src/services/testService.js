import api from "../utils/api";

export const getQuestions = async () => {
  try {
    const response = await api.get("/test/questions");
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch questions";
  }
};

export const submitTest = async (answers) => {
  try {
    const response = await api.post("/test/submit", { answers });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to submit test";
  }
};


export const getTestResult = async (resultId) => {
  try {
    const response = await api.get(`/test/result/${resultId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch test result";
  }
};