import { API, setBasicAuth } from ".";
import axios from 'axios';


export const login = async (username: string, password: string, rememberMe?: boolean) => {
    setBasicAuth(username, password)
    const response = await API.post('/auth/connect', { rememberMe });
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        axios.defaults.headers["X-Token"] = response.data.token;
    }
    return response.data;
}

export const logout = async () => {
    const response = await API.post('/auth/disconnect');
    return response.data;
}

export const register = async (username: string, password: string, profilePicture: string | null,
    phone: string | null, bio: string | null
) => {
    const response = await API.post('/user', {
        username, password,
        profilePicture, phone, bio
    });
    return response.data;
}

export const getUser = async () => {
    const response = await API.get('/user/me');
    return response.data;
}

export const getUsers = async (query: string = "") => {
    const response = await API.get(`/user?query=${query}`);
    return response.data;

}

export const updateProfile = async (profilePicture: string | null, bio: string) => {
    const response = await API.patch('/user/me', { profilePicture, bio });
    return response.data;
}