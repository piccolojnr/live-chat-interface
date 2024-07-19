import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../types';

export type Message = {
    key: string;
    sender: string;
    message: string;
    timestamp: string;
};
interface UserState {
    isAuthenticated: boolean;
    userInfo: IUser | null;
    allUsers: IUser[];
    usersOnline: string[];
    messages: Message[];
    activeUser: IUser | null;
}

const initialState: UserState = {
    isAuthenticated: false,
    userInfo: null,
    allUsers: [],
    usersOnline: [],
    messages: [],
    activeUser: null,
};


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateProfile: (state, action: PayloadAction<IUser>) => {
            state.userInfo = action.payload;
        },
        login: (state, action: PayloadAction<IUser>) => {
            state.isAuthenticated = true;
            state.userInfo = action.payload;

        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.userInfo = null;
        },
        setUsers: (state, action: PayloadAction<IUser[]>) => {
            state.allUsers = action.payload;
        },
        updateOnlineUsers: (state, action: PayloadAction<string[]>) => {
            state.usersOnline = action.payload;
        },
        setMessages: (state, action: PayloadAction<Message[]>) => {
            state.messages = action.payload;
        },
        addMessage: (state, action: PayloadAction<Message & { username?: string }>) => {
            if (state.activeUser && state.userInfo) {
                if (action.payload.key.includes(state.activeUser._id) || action.payload.key.includes(state.userInfo._id)) {
                    state.messages.push(action.payload);
                }
                state.allUsers = state.allUsers.map((u) => {
                    if (action.payload.key.includes(u._id)) {
                        return { ...u, lastMessage: action.payload };
                    }
                    return u;
                });
            }
        },
        setActiveUser: (state, action: PayloadAction<IUser & { lastMessage: Message } | null>) => {
            state.activeUser = action.payload;
        },

    },
});

export const {
    updateProfile, login, logout,
    setUsers, updateOnlineUsers, addMessage,
    setActiveUser, setMessages }
    = userSlice.actions;

export const findUserById = (id: string, allUsers: IUser[]) => {
    return allUsers.find((user) => user._id === id);
};

export const isOnline = (id?: string) => (state: { user: { usersOnline: string[] } }) => {

    return id ? state.user.usersOnline.includes(id) : false;
}

export default userSlice.reducer;
