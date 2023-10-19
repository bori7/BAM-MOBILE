import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { screenNotificationReducer } from "./slices/notification";
import { userReducer } from "./slices/user";
import { notesReducer } from "./slices/notes";

const rootReducer = {
  user: userReducer,
  screenNotification: screenNotificationReducer,
  notes: notesReducer,
};

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
