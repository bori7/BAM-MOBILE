import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  InitialGeneralStateType,
  GeneralDataType,
} from "../../shared/types/slices";

const initialGeneralState: InitialGeneralStateType = {
  generalData: {
    hasSubscribed: true,
  },
  generalLoading: false,
  generalError: null,
  generalMessage: "",
};

export const generalSlice = createSlice({
  name: "generalSlice",
  initialState: initialGeneralState,
  reducers: {
    updateGeneralData: (state, action: PayloadAction<GeneralDataType>) => {
      state.generalData = action.payload;
    },
    updateGeneralSubscriptionStatus: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.generalData = {
        ...state.generalData,
        hasSubscribed: action.payload,
      };
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
  },
});

export const { actions: generalActions, reducer: generalReducer } =
  generalSlice;
