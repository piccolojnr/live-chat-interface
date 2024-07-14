import { API } from "."


export const createChat = async (participants: string[]) => {
    const response = await API.post('/chat', { participants });
    return response.data;
}

export const getChat = async (id: string) => {
    const response = await API.get(`/chat/${id}`);
    return response.data;
}

export const getChats = async () => {
    const response = await API.get('/chat');
    return response.data;
}

export const sendMessage = async (chatId: string, content: string) => {
    const response = await API.post(`/chat/${chatId}/message`, { content });
    return response.data;
}

export const getMessages = async (chatId: string) => {
    const response = await API.get(`/chat/${chatId}/message`);
    return response.data;
}

export const getUnreadMessages = async () => {
    const response = await API.get('/chat/unread');
    return response.data;
}

export const markAsRead = async (chatId: string) => {
    const response = await API.post(`/chat/${chatId}/read`);
    return response.data;
}

export const deleteChat = async (chatId: string) => {
    const response = await API.delete(`/chat/${chatId}`);
    return response.data;
}

export const deleteMessage = async (chatId: string, messageId: string) => {
    const response = await API.delete(`/chat/${chatId}/message/${messageId}`);
    return response.data;
}

export const updateChat = async (chatId: string, participants: string[]) => {
    const response = await API.patch(`/chat/${chatId}`, { participants });
    return response.data;
}

export const updateMessage = async (chatId: string, messageId: string, content: string) => {
    const response = await API.patch(`/chat/${chatId}/message/${messageId}`, { content });
    return response.data;
}

export const getChatMessages = async (chatId: string) => {
    const response = await API.get(`/chat/${chatId}/message`);
    return response.data;
}

export const getChatParticipants = async (chatId: string) => {
    const response = await API.get(`/chat/${chatId}/participants`);
    return response.data;
}

export const getChatUnreadMessages = async (chatId: string) => {
    const response = await API.get(`/chat/${chatId}/unread`);
    return response.data;
}
