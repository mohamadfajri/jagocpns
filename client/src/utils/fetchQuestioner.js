import axios from 'axios';
import { useQuestioner } from '../stores/useQuestioner';

const fetchQuestioner = axios.create({
  baseURL: 'https://jagocpns.id/api',
});

fetchQuestioner.interceptors.request.use(
  (config) => {
    const { token } = useQuestioner.getState();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { fetchQuestioner };
