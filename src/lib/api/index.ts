import axios from 'axios';
export const BASE_API_URL = 'http://localhost:5000/api';
axios.defaults.withCredentials = true;

export const API = axios.create({
    baseURL: BASE_API_URL,
});

export const setBasicAuth = (username: string, password: string) => {
    API.defaults.headers.common.Authorization = `Basic ${btoa(`${username}:${password}`)}`;
}

export const removeBasicAuth = () => {
    delete API.defaults.headers.common.Authorization;
}

export const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await API.post('/upload', formData);
    return response.data;
}