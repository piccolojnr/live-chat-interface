import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '../types';
import { find } from '@reduxjs/toolkit/dist/utils';
import { Message } from './chat-slice';

interface UserState {
    isAuthenticated: boolean;
    userInfo: IUser | null;
    allUsers: IUser[];
    activeUser: IUser & { lastMessage: Message } | null;
    usersOnline: string[];
}

const initialState: UserState = {
    isAuthenticated: false,
    userInfo: null,
    allUsers: [],
    activeUser: null,
    usersOnline: [],
};




const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateProfile: (state, action) => {
            state.userInfo = action.payload;
        },
        login: (state, action) => {
            state.isAuthenticated = true;
            state.userInfo = action.payload;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.userInfo = null;
        },
        setUsers: (state, action) => {
            state.allUsers = action.payload;
        },
        setUser: (state, action) => {
            state.userInfo = action.payload;
        },
        setActiveUser: (state, action) => {
            state.activeUser = action.payload;
        },
        updateOnlineUsers: (state, action) => {
            state.usersOnline = action.payload;
        },
        updateLastMessage: (state, action) => {
            if (state.activeUser) {
                state.activeUser.lastMessage = action.payload.message;
            }
        }
    },
});

export const { updateProfile, login, logout, setUsers, setUser, setActiveUser, updateOnlineUsers, updateLastMessage } = userSlice.actions;

export const findUserById = (id: string) => (state: { user: { allUsers: IUser[] } }) => {
    return state.user.allUsers.find((user) => user._id === id);
};

export const isOnline = (id: string) => (state: { user: { usersOnline: string[] } }) => {
    return state.user.usersOnline.includes(id);
}

export default userSlice.reducer;
