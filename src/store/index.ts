import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { screenNotificationReducer } from "./slices/notification";
import { userReducer } from "./slices/user";
import { notesReducer } from "./slices/notes";
import { devotionalReducer } from "./slices/devotional";
import { moreReducer } from "./slices/more";
import { prayersReducer } from "./slices/prayer";
import { generalReducer } from "./slices/general";

const rootReducer = {
  user: userReducer,
  screenNotification: screenNotificationReducer,
  notes: notesReducer,
  devotional: devotionalReducer,
  more: moreReducer,
  prayer: prayersReducer,
  general: generalReducer,
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
