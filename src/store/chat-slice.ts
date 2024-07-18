import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { IChat, IMessage } from '../types';
import {
    getChats as requestChats,
    createChat as requestCreateChat, getChatMessages as requestChatMessages,
    sendMessage as requestSendMessage

} from '../lib/api/chat';
import { AppThunk } from '.';
interface ChatState {
    activeChatId: string | null;
    chats: IChat[];
    messages: IMessage[];
    error: string | null;
}

const initialState: ChatState = {
    activeChatId: null,
    chats: [],
    messages: [],
    error: null,
};

export const getChats = createAsyncThunk('chat/getChats', async ({ query }: { query: string }, thunkAPI) => {
    try {
        const response = await requestChats(query);
        return response;
    } catch (error: any) {
        console.error('Error fetching chats:', error);
        return thunkAPI.rejectWithValue(error.message || 'An error occurred');
    }
});

export const createChat = createAsyncThunk('chat/createChat', async ({ participants }: { participants: string[] }, thunkAPI) => {
    try {
        const response = await requestCreateChat(participants);
        return response;
    } catch (error: any) {
        console.error('Error creating chat:', error);
        return thunkAPI.rejectWithValue(error.message || 'An error occurred');
    }
});

export const getChatMessages = createAsyncThunk('chat/getChatMessages', async ({ chatId }: { chatId: string }, thunkAPI) => {
    try {
        const response = await requestChatMessages(chatId);
        return response;
    } catch (error: any) {
        console.error('Error fetching chat messages:', error);
        return thunkAPI.rejectWithValue(error.message || 'An error occurred');
    }
});

export const sendMessage = createAsyncThunk('chat/sendMessage', async ({ chatId, message }: { chatId: string, message: string }, thunkAPI) => {
    try {
        const response = await requestSendMessage(chatId, message);
        return response;
    } catch (error: any) {
        console.error('Error sending message:', error);
        return thunkAPI.rejectWithValue(error.message || 'An error occurred');
    }
});

export const joinRooms = (rooms: string[]): AppThunk => (dispatch, getState, { socket }) => {
    socket.emit('joinRoom', rooms, (error: string) => {
        if (error) {
            console.log(error);
        }
    });
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
        addMessage: (state, action: PayloadAction<IMessage>) => {
            state.messages.push(action.payload);
        },
        updateMessages: (state, action: PayloadAction<IMessage[]>) => {
            state.messages = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.error = null;
            })
            .addCase(sendMessage.rejected, (state, action) => {
                state.error = action.payload as string;
                console.error(action.payload);
            })
            .addCase(getChatMessages.fulfilled, (state, action) => {
                state.messages = action.payload;
                state.error = null;
            })
            .addCase(getChatMessages.rejected, (state, action) => {
                state.messages = [];
                state.error = action.payload as string;
                console.error(action.payload);
            })
            .addCase(createChat.fulfilled, (state, action) => {
                state.chats.push(action.payload);
                state.error = null;
            })
            .addCase(createChat.rejected, (state, action) => {
                state.error = action.payload as string;
                console.error(action.payload);
            })
            .addCase(getChats.fulfilled, (state, action) => {
                state.chats = action.payload;
                state.error = null;
            })
            .addCase(getChats.rejected, (state, action) => {
                state.chats = [];
                state.error = action.payload as string;
                console.error(action.payload);
            });

    }
});

export const { setActiveChat, addChat, updateMessages, addMessage } = chatSlice.actions;

export default chatSlice.reducer;
