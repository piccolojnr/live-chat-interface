import { API } from "."


export const createChat = async (participants: string[]) => {
    const response = await API.post('/chat', { participants });
    return response.data;
}


export const getChats = async (query: string = "") => {
    const response = await API.get(`/chat?query=${query}`);
    return response.data;
}

export const getChatMessages = async (chatId: string) => {
    const response = await API.get(`/chat/${chatId}/messages`);
    return response.data;
}


export const sendMessage = async (chatId: string, message: string) => {
    const response = await API.post(`/chat/${chatId}/messages`, { message });
    return response.data;
}
