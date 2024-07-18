import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import userReducer from './user-slice';
import chatReducer from './chat-slice';
import notificationReducer from './notification-slice';
import { BASE_API_URL } from '../lib/constants';
import { io } from 'socket.io-client';

const store = configureStore({
    reducer: {
        user: userReducer,
        chat: chatReducer,
        notification: notificationReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: {
                extraArgument: {
                    socket: io(BASE_API_URL, {
                        withCredentials: true,
                        auth: {
                            token: localStorage.getItem("token"),
                        },
                    }),
                },
            },
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// create AppThunk

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    { socket: any },  // Define the extra argument type
    Action<string>
>;

export default store;
