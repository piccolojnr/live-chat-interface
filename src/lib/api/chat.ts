import API from ".";

export const requestCreateChat = async (participants: string[]) => {
    const response = await API.post('/chat', { participants });
    return response.data;
};

export const requestChats = async (query = "") => {
    const response = await API.get(`/chat?query=${query}`);
    return response.data;
};

export const requestChatMessages = async (chatId: string) => {
    const response = await API.get(`/chat/${chatId}/messages`);
    return response.data;
};

export const requestSendMessage = async (chatId: string, message: string) => {
    const response = await API.post(`/chat/${chatId}/messages`, { message });
    return response.data;
};