import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IChat } from '../types';

export type Message = {
    sender: string;
    messages: string;
    timestamp: string;
};

interface ChatState {
    activeChatId: string | null;
    chats: IChat[];
    messages: Message[];
}

const initialState: ChatState = {
    activeChatId: null,
    chats: [],
    messages: [],
};




const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setActiveChat: (state, action: PayloadAction<string | null>) => {
            state.activeChatId = action.payload;
        },
        addChat: (state, action: PayloadAction<IChat>) => {
            state.chats.push({ ...action.payload });
            state.chats = state.chats.filter((chat, index, self) =>
                index === self.findIndex((t) => (
                    t._id === chat._id
                ))
            );
        },
        setChats: (state, action: PayloadAction<IChat[]>) => {
            state.chats = action.payload;
        },
        setMessages: (state, action: PayloadAction<Message[]>) => {
            state.messages = action.payload;
        },
        addMessage: (state, action: PayloadAction<Message>) => {
            state.messages.push(action.payload);
        },
        updateMessages: (state, action: PayloadAction<Message[]>) => {
            state.messages = action.payload;
        },
    },

});

export const { setActiveChat, addChat, setChats, updateMessages, addMessage, setMessages } = chatSlice.actions;

export default chatSlice.reducer;
