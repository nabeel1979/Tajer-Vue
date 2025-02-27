import axios from "axios";
const apis = "/apis.json";

const httpsRequestApi = async () => {
  try {
    const res = await axios.get(apis);
    return res.data;
  } catch (error) {
    console.error("Error fetching API data:", error.message);
    throw error;
  }
};

// Usage
const apiConfig = await httpsRequestApi();
export default apiConfig;
