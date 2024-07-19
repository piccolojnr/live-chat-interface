import API from ".";

export const requestGetMessages = async (userId: string) => {
    const response = await API.get(`/message/${userId}`);
    return response.data;
}