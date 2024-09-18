import axios from 'axios';



const axiosInstance = axios.create({
  baseURL: 'https://gorfa_web.gcc.iq/api',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Accept': '*/*',
  },
});

// Create an instance for file uploads (multipart/form-data)
const axiosUpload = axios.create({
  baseURL: 'https://archivingmainfolder.gcc.iq/api',
  headers: {
    'Content-Type': 'multipart/form-data',
    'Accept': '*/*',
  },
});

// Export the instances separately
export { axiosInstance, axiosUpload };
