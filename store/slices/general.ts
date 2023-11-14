import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  InitialGeneralStateType,
  GeneralDataType,
  NotificationsFormSliceType,
} from "../../shared/types/slices";
import { testNotificationsForm } from "../../constants/values";
import { NotificationsFormType } from "../../pages/More/EmailNotifications";

const initialGeneralState: InitialGeneralStateType = {
  generalData: null,
  generalEmailNotificationForms: testNotificationsForm,
  generalPushNotificationForms: testNotificationsForm,
  generalLoading: false,
  generalError: null,
  generalMessage: "",
};

export const generalSlice = createSlice({
  name: "generalslice",
  initialState: initialGeneralState,
  reducers: {
    updateGeneralData: (state, action: PayloadAction<GeneralDataType>) => {
      state.generalData = action.payload;
    },
    updateGeneralState: (
      state,
      action: PayloadAction<InitialGeneralStateType>
    ) => {
      state.generalData = action.payload.generalData;
      state.generalError = action.payload.generalError;
      state.generalLoading = action.payload.generalLoading;
      state.generalMessage = action.payload.generalMessage;
    },
    clearGeneralState: (state) => {
      state.generalLoading = false;
      state.generalError = null;
      state.generalMessage = "";
      state.generalData = null;
    },
    updateEmailNotificationsForm: (
      state,
      action: PayloadAction<
        Pick<NotificationsFormType, "name" | "enable" | "timeValue">
      >
    ) => {
      // let newNotificationsForm = state.generalNotificationForms || {};
      state.generalEmailNotificationForms[action.payload.name] = {
        timeValue: action.payload.timeValue,
        enable: action.payload.enable,
      };
    },
    updatePushNotificationsForm: (
      state,
      action: PayloadAction<
        Pick<NotificationsFormType, "name" | "enable" | "timeValue">
      >
    ) => {
      // let newNotificationsForm = state.generalNotificationForms || {};
      state.generalPushNotificationForms[action.payload.name] = {
        timeValue: action.payload.timeValue,
        enable: action.payload.enable,
      };
    },
  },
});

export const { actions: generalActions, reducer: generalReducer } =
  generalSlice;
