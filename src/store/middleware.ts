import { createListenerMiddleware } from "@reduxjs/toolkit";
import { RootState } from ".";
import { addMessage } from "./user-slice";
import { showNotification } from "./notification-slice";


const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
    actionCreator: addMessage,
    effect: async (action, listenerAPI) => {
        const state = listenerAPI.getState() as RootState;
        const message = action.payload;


        if (state.user.activeUser && state.user.userInfo && (state.user.activeUser._id === action.payload.sender || state.user.userInfo._id === action.payload.sender)) {
            return;
        }
        listenerAPI.dispatch(
            showNotification({
                type: "info",
                message: "You have a new message from " + message.username,
            })
        );
    },
})

export default listenerMiddleware