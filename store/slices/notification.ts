import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  InitialScreenNotificationStateType,
  NotificationDataType,
  ScreenDataType,
} from "../../shared/types/slices";

const initialScreenNotificationState: InitialScreenNotificationStateType = {
  notificationData: null,
  notificationLoading: false,
  notificationError: null,
  notificationMessage: "",
  notificationFunction: () => {},

  screenData: null,
  screenLoading: false,
  screenError: null,
  screenMessage: "",
  screenFunction: () => {},
};

export const screeNotificationSlice = createSlice({
  name: "screenNotificationSlice",
  initialState: initialScreenNotificationState,
  reducers: {
    updateNotificationData: (
      state,
      action: PayloadAction<NotificationDataType>
    ) => {
      state.notificationData = action.payload;
    },
    updateScreenData: (state, action: PayloadAction<ScreenDataType>) => {
      state.screenData = action.payload;
    },
    updateNotificationLoading: (state, action: PayloadAction<boolean>) => {
      state.notificationLoading = action.payload;
    },
    updateScreenLoading: (state, action: PayloadAction<boolean>) => {
      state.screenLoading = action.payload;
    },
    updateNotificationLoadingFunc: (
      state,
      action: PayloadAction<
        Pick<
          InitialScreenNotificationStateType,
          "notificationLoading" | "notificationFunction"
        >
      >
    ) => {
      state.notificationLoading = action.payload.notificationLoading;
      state.notificationFunction = action.payload.notificationFunction;
    },
    updateScreenLoadingFunc: (
      state,
      action: PayloadAction<
        Pick<
          InitialScreenNotificationStateType,
          "screenLoading" | "screenFunction"
        >
      >
    ) => {
      state.screenLoading = action.payload.screenLoading;
      state.screenFunction = action.payload.screenFunction;
    },
    updateScreenNotificationState: (
      state,
      action: PayloadAction<InitialScreenNotificationStateType>
    ) => {
      state.notificationData = action.payload.notificationData;
      state.notificationError = action.payload.notificationError;
      state.notificationLoading = action.payload.notificationLoading;
      state.notificationMessage = action.payload.notificationMessage;
      state.screenData = action.payload.screenData;
      state.screenError = action.payload.screenError;
      state.screenLoading = action.payload.screenLoading;
      state.screenMessage = action.payload.screenMessage;
    },

    clearScreenNotificationState: (state) => {
      state.notificationLoading = false;
      state.notificationError = null;
      state.notificationMessage = "";
      state.notificationData = null;
    },
    clearScreenState: (state) => {
      state.screenLoading = false;
      state.screenError = null;
      state.screenMessage = "";
      state.screenData = null;
    },
    clearNotificationState: (state) => {
      state.notificationLoading = false;
      state.notificationError = null;
      state.notificationMessage = "";
      state.notificationData = null;
    },
  },
});

export const {
  updateNotificationData,
  updateScreenData,
  updateScreenNotificationState,
  clearScreenNotificationState,
} = screeNotificationSlice.actions;
export default screeNotificationSlice.reducer;

export const {
  actions: screenNotificationActions,
  reducer: screenNotificationReducer,
} = screeNotificationSlice;
