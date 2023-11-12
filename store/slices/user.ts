import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { apiPost } from "../../hooks/apiHooks";
import { secureSave } from "../../shared/helper";
import { InitialUserStateType, UserDataType } from "../../shared/types/slices";

const initialUserState: InitialUserStateType = {
  userData: {
    hasSubscribed: true,
  },
  userLoading: false,
  userError: null,
  userMessage: "",
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState: initialUserState,
  reducers: {
    updateUserData: (state, action: PayloadAction<UserDataType>) => {
      state.userData = action.payload;
    },
    updateUserSubscriptionStatus: (state, action: PayloadAction<boolean>) => {
      state.userData = {
        ...state.userData,
        hasSubscribed: action.payload,
      };
    },
    updateImageBase64: (state, action: PayloadAction<string>) => {
      state.userImageBase64 = action.payload;
    },
    updateUserState: (state, action: PayloadAction<InitialUserStateType>) => {
      state.userData = action.payload.userData;
      state.userError = action.payload.userError;
      state.userLoading = action.payload.userLoading;
      state.userMessage = action.payload.userMessage;
    },
    clearUserState: (state) => {
      state.userLoading = false;
      state.userError = null;
      state.userMessage = "";
      state.userData = null;
    },
  },
});

export const { actions: userActions, reducer: userReducer } = userSlice;
