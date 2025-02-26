import axios from 'axios';
import appSetting from './appSetting';



const axiosInstance = axios.create({
  baseURL: appSetting.apiUrl,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Accept': '*/*',
  },
});

const axiosUpload = axios.create({
  baseURL: appSetting.documentUrl2,
  headers: {
    'Content-Type': 'multipart/form-data',
    'Accept': '*/*',
  },
});

export { axiosInstance, axiosUpload };
