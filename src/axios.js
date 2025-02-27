import axios from "axios";
import httpsRequestApi from "./appSetting";

const axiosInstance = axios.create({
  baseURL: httpsRequestApi.apiUrl,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    Accept: "*/*",
  },
});

const axiosUpload = axios.create({
  baseURL: httpsRequestApi.documentUrl2,
  headers: {
    "Content-Type": "multipart/form-data",
    Accept: "*/*",
  },
});

export { axiosInstance, axiosUpload };
