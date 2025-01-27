import axios from 'axios';
import { TOKEN } from './const';

const baseURL = import.meta.env.VITE_API_BASE_URL;


const axiosInstance = axios.create({
  baseURL, 
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN);

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error('Token expirado o no autorizado');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;