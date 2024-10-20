import axios from 'axios';
import { server } from '../constant/config';

const apiClient = axios.create({
  baseURL: server, // Adjust the URL to match your backend
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
