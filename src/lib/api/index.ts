import axios from 'axios';
import { BASE_API_URL } from '../constants';

axios.defaults.withCredentials = true;
axios.defaults.headers.common['X-Token'] = localStorage.getItem('token');

export const API = axios.create(
    {
        baseURL: BASE_API_URL + "/api",
        withCredentials: true,
        headers: {
            'X-Token': localStorage.getItem('token'),
        }
    }
);

export const setBasicAuth = (username: string, password: string) => {
    API.defaults.headers.common.Authorization = `Basic ${btoa(`${username}:${password}`)}`;
}

