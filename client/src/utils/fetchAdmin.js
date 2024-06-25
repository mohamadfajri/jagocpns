import axios from 'axios';
import { useAdmin } from '../stores/useAdmin';

const fetchAdmin = axios.create({
  baseURL: 'https://api.jagocpns.id/api/admin',
});

fetchAdmin.interceptors.request.use(
  (config) => {
    const { token } = useAdmin.getState();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { fetchAdmin };
