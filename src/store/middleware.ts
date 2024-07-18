import { createListenerMiddleware } from '@reduxjs/toolkit';
import { addMessage, updateMessages } from './chat-slice';
import { RootState } from '.';
import { updateLastMessage } from './user-slice';

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
    actionCreator: addMessage,
    effect: async (action, listenerApi) => {
        const state = listenerApi.getState() as RootState;
        const activeUser = state.user.activeUser;
        console.log('message', action.payload);
        if (activeUser) {
            listenerApi.dispatch(updateLastMessage({ message: action.payload }));
        }
    },
});

listenerMiddleware.startListening({
    actionCreator: updateMessages,
    effect: async (action, listenerApi) => {
        const state = listenerApi.getState() as RootState;
        const activeUser = state.user.activeUser;
        console.log('message', action.payload);

        if (activeUser) {
            activeUser.lastMessage = action.payload[-1];
        }
    },
});

export default listenerMiddleware;
