import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '../types';

interface UserState {
    isAuthenticated: boolean;
    userInfo: IUser | null;
    allUsers: IUser[];
}

const initialState: UserState = {
    isAuthenticated: false,
    userInfo: null,
    allUsers: [],
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
        }
    },
});

export const { updateProfile, login, logout, setUsers, setUser } = userSlice.actions;

export default userSlice.reducer;
