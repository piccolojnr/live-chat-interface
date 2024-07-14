import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUser } from '../types';
import {
    login as loginRequest,
    logout as logoutRequest, getUser, register as registerRequest, updateProfile as updateProfileRequest, getUsers as getUsersRequest
} from '../lib/api/user';

interface UserState {
    isAuthenticated: boolean;
    userInfo: IUser | null;
    allUsers: IUser[];
    error: string | null;
}

const initialState: UserState = {
    isAuthenticated: false,
    userInfo: null,
    allUsers: [],
    error: null,
};

// Async actions
export const login = createAsyncThunk(
    'user/login',
    async ({ username, password, rememberMe }: { username: string; password: string, rememberMe?: boolean }, thunkAPI) => {
        try {
            const response = await loginRequest(username, password, rememberMe);
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || 'An error occurred');
        }
    }
);

export const logout = createAsyncThunk(
    'user/logout',
    async (_, thunkAPI) => {
        try {
            await logoutRequest();
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || 'An error occurred');
        }
    }
);

export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async (_, thunkAPI) => {
        try {
            const response = await getUser();
            return response;
        } catch (error: any) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.message || 'An error occurred');
        }
    }
);

export const register = createAsyncThunk(
    'user/register',
    async ({ username, password, phone, profilePicture, bio }: { username: string; profilePicture: string | null; phone: string | null; bio: string | null; password: string }, thunkAPI) => {
        try {
            const response = await registerRequest(username, password, profilePicture, phone, bio);
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || 'An error occurred');
        }
    }
);

export const updateProfile = createAsyncThunk(
    'user/updateProfile',
    async ({ profilePicture, bio }: { profilePicture: string | null; bio: string }, thunkAPI) => {
        try {
            const response = await updateProfileRequest(profilePicture, bio);
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || 'An error occurred');
        }
    }
);

export const getUsers = createAsyncThunk(
    'user/getUsers',
    async (query: string = "", thunkAPI) => {
        try {
            const response = await getUsersRequest(query);
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || 'An error occurred');
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.userInfo = action.payload;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            .addCase(logout.fulfilled, (state) => {
                state.isAuthenticated = false;
                state.userInfo = null;
                state.error = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.userInfo = action.payload;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.userInfo = action.payload;
                state.error = null;
            })
            .addCase(register.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.userInfo = action.payload;
                state.error = null;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.allUsers = action.payload;
                state.error = null;
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.error = action.payload as string;
            });

    }
});

export default userSlice.reducer;
