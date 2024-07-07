import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { chats } from '../_moke/chats';
import { IChat } from '../types';

interface ChatState {
    activeChatId: string | null;
    chats: IChat[];
}

const initialState: ChatState = {
    activeChatId: null,
    chats: chats,
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setActiveChat: (state, action: PayloadAction<string>) => {
            state.activeChatId = action.payload;
        },
        addChat: (state, action: PayloadAction<IChat>) => {
            state.chats.push({ ...action.payload });
        },
    },
});

export const { setActiveChat, addChat } = chatSlice.actions;

export default chatSlice.reducer;
