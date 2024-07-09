import { API, setBasicAuth } from ".";


export const login = async (username: string, password: string, rememberMe?: boolean) => {
    setBasicAuth(username, password)
    const response = await API.post('/auth/connect', { rememberMe });
    return response.data;
}

export const logout = async () => {
    const response = await API.post('/auth/disconnect');
    return response.data;
}

export const register = async (username: string, password: string, profilePicture?: string,
    phone?: string, bio?: string
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

