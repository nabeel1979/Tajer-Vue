import axios from 'axios';



const axiosInstance = axios.create({
  baseURL: 'https://api.gcc.iq/api',
  // baseURL: 'https://192.168.0.247:5277/api',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Accept': '*/*',
  },
});

// Create an instance for file uploads (multipart/form-data)
const axiosUpload = axios.create({
  baseURL: 'https://documents.gcc.iq/api',
  headers: {
    'Content-Type': 'multipart/form-data',
    'Accept': '*/*',
  },
});

// Export the instances separately
export { axiosInstance, axiosUpload };
