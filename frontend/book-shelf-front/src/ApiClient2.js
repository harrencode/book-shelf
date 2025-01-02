import axios from 'axios';

const apiClient2 = axios.create({
  baseURL: "http://localhost:8080/api/categories",
});

export default apiClient2;
