import axios from 'axios';
import useAuth from '../stores/useAuth';

const fetcher = axios.create({
  baseURL: 'https://api.jagocpns.id/api',
});

fetcher.interceptors.request.use(
  (config) => {
    const { token } = useAuth.getState();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { fetcher };
