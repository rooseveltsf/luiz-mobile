import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.120:3333',
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const err = error.response.data;
    throw err;
  }
);

export default api;
