import axios from 'axios';


// function getApiBaseUrl() {
//   return window.config?.API_BASE_URL;
// }
// function getApiUploadUrl() {
//   return window.config?.API_UPLOAD_URL;
// }



const axiosInstance = axios.create({
  baseURL: `${process.env.VUE_APP_API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Accept': '*/*',
  },
});

// Create an instance for file uploads (multipart/form-data)
const axiosUpload = axios.create({
  baseURL: `${process.env.VUE_APP_API_UPLOAD_URL}/api`,
  headers: {
    'Content-Type': 'multipart/form-data',
    'Accept': '*/*',
  },
});

// Export the instances separately
export { axiosInstance, axiosUpload };
