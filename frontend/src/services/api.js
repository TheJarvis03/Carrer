import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 5000
});

// Update image URL handling
export const getImageUrl = (path) => {
  if (!path) return '/images/placeholder.png';
  if (path.startsWith('http')) return path;
  return path.startsWith('/') ? path : `/images/${path}`;
};

export const userService = {
  login: (credentials) => API.post('/users/login', credentials),
  register: (userData) => API.post('/users/register', userData),
  getProfile: () => API.get('/users/profile')
};

export const careerService = {
  getAll: () => API.post('/careers'),
  getById: (id) => API.get(`/careers/${id}`)
};

// ... other services ...
