import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api',
    timeout: 5000,
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
    getProfile: () => API.get('/users/profile'),
};

export const careerService = {
    getAll: () => API.post('/careers'),
    getById: (id) => API.get(`/careers/${id}`),
};

export const majorService = {
    getAll: () => API.get('/search/majors'),
    getById: (id) => API.get(`/majors/${id}`),
    getByField: (field) => API.get(`/majors/field/${field}`),
};

export const schoolService = {
    getAll: () => API.get('/schools'),
    getById: (id) => API.get(`/schools/${id}`),
    getByLocation: (location) => API.get(`/schools/location/${location}`),
};

export const scoreService = {
    getAll: () => API.get('/admissionScores'),
    getBySchool: (schoolId) => API.get(`/admissionScores/school/${schoolId}`),
    getByMajor: (majorId) => API.get(`/admissionScores/major/${majorId}`),
};

export const newsService = {
    getAll: (page = 1, limit = 10) =>
        API.get(`/news?page=${page}&limit=${limit}`),
    getById: (id) => API.get(`/news/${id}`),
    getByCategory: (category) => API.get(`/news/category/${category}`),
};

// Add interceptors for authentication
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default API;
