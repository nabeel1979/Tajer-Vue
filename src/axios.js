import axios from 'axios';



const axiosInstance = axios.create({
  baseURL: 'https://api.gcc.iq/api',
  // baseURL: 'http://192.168.0.50:4200/api',
  // baseURL: 'https://tager.bcc.iq/api',
  // baseURL: 'http://192.168.0.247:5277/api',
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
