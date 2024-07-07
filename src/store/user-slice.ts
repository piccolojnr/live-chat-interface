import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../types';
import { faker } from '@faker-js/faker';
import { users } from '../_moke/users';
import { account } from '../_moke/account';
interface UserState {
    isAuthenticated: boolean;
    userInfo: IUser | null;
    allUsers: IUser[];
}

const initialState: UserState = {
    isAuthenticated: false,
    userInfo: account,
    allUsers: users,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<IUser>) => {
            state.isAuthenticated = true;
            state.userInfo = action.payload;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.userInfo = null;
        },
    },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
