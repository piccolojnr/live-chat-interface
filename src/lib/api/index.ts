import axios from 'axios';
import { BASE_API_URL } from '../constants';

export const API_URL = `${BASE_API_URL}/api`;
axios.defaults.withCredentials = true;
axios.defaults.headers.common['X-Token'] = localStorage.getItem('token');

export const API = axios.create({
    baseURL: API_URL,

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