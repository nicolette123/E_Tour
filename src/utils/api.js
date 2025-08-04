// src/utils/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://echoes-of-rwanda.onrender.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
