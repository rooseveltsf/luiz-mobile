import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.0.0.224:3333',
});
// exp://10.0.0.224:19000
// exp://nc-fyz.rooseveltrn.project-mobile.exp.direct:80

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const err = error.response.data;
    throw err;
  }
);

export default api;
