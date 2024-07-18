import axios from 'axios';
import { BASE_API_URL } from '../constants';

const API = axios.create({
    baseURL: BASE_API_URL + "/api",
    withCredentials: true,
});

API.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['X-Token'] = token;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

API.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response.status === 401) {
        // Handle token expiration, refresh token logic can be added here
    }
    return Promise.reject(error);
});

export default API;

export const setBasicAuth = (username: string, password: string) => {
    API.defaults.headers.common.Authorization = `Basic ${btoa(`${username.toLowerCase()}:${password}`)}`;
};
