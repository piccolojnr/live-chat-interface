import axios from 'axios';
export const BASE_API_URL = 'http://localhost:5000/api';


export const API = axios.create({
    baseURL: BASE_API_URL, withCredentials: true

});

export const setBasicAuth = (username: string, password: string) => {
    API.defaults.headers.common.Authorization = `Basic ${btoa(`${username}:${password}`)}`;
}

export const removeBasicAuth = () => {
    delete API.defaults.headers.common.Authorization;
}

