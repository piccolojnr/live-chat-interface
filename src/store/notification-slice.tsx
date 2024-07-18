import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type NotiType = "error" | "success" | "info";

type Notification = {
  message: string;
  type: NotiType;
};

interface NotificationState {
  notification: Notification | null;
}

const initialState: NotificationState = {
  notification: {
    message: "Welcome to the chat app",
    type: "info",
  },
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification(state, action: PayloadAction<Notification>) {
      state.notification = action.payload;
    },
    clearNotification(state) {
      state.notification = null;
    },
  },
});

export const { showNotification, clearNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;
