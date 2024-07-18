import API, { setBasicAuth } from ".";

export const loginRequest = async (username: string, password: string, rememberMe: boolean) => {
    setBasicAuth(username, password);
    const response = await API.post('/auth/connect', { rememberMe });
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
    }
    return response.data;
};

export const logoutRequest = async () => {
    const response = await API.post('/auth/disconnect');
    if (response.status === 200) {
        localStorage.removeItem('token');
    }
    return response.data;
};

export const registerRequest = async (username: string, password: string, phone: string,) => {
    const response = await API.post('/user', {
        username, password, profilePicture: "", phone, bio: ""
    });
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
    }
    return response.data;
};

export const userRequest = async () => {
    const response = await API.get('/user/me');
    return response.data;
};

export const getUsersRequest = async (query = "") => {
    const response = await API.get(`/user?query=${query}`);
    return response.data;
};