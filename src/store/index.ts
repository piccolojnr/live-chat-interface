import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user-slice';
import notificationReducer from './notification-slice';
import listenerMiddleware from './middleware';

const store = configureStore({
    reducer: {
        user: userReducer,
        notification: notificationReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(listenerMiddleware.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
