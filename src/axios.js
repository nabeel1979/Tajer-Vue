import axios from 'axios';


function getApiBaseUrl() {
  return window.config?.API_BASE_URL || 'https://gorfa_web.gcc.iq/api';
}
function getApiUploadUrl() {
  return window.config?.API_UPLOAD_URL || 'https://archivingmainfolder.gcc.iq/api';
}



const axiosInstance = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Accept': '*/*',
  },
});

// Create an instance for file uploads (multipart/form-data)
const axiosUpload = axios.create({
  baseURL: getApiUploadUrl(),
  headers: {
    'Content-Type': 'multipart/form-data',
    'Accept': '*/*',
  },
});

// Export the instances separately
export { axiosInstance, axiosUpload };
