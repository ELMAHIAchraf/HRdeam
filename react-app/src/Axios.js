import axios from "axios";
export const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    timeout: 10000,
  });

axiosInstance.interceptors.request.use(
  function(config){
    const token = sessionStorage.getItem('token');
    if(token){
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config
  }
)


