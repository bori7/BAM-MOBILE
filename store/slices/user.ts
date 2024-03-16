import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

import {apiPost} from "../../hooks/apiHooks";
import {secureSave} from "../../shared/helper";
import {InitialUserStateType, UserDataType} from "../../shared/types/slices";
import {signInCall, signInGoogleCall, signUpCall, signUpGoogleCall} from "../apiThunks/user";

const initialUserState: InitialUserStateType = {
    userData: {
        hasSubscribed: false,
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
        clearUserMessage: (state) => {
            state.userMessage = "";
        },
        clearUserError: (state) => {
            state.userError = null;
        },
        stopUserLoading: (state) => {
            state.userLoading = false;
        },
    },
    extraReducers: builder => {
        builder.addCase(signUpCall.pending, state => {
            state.userLoading = true
        })
        builder.addCase(signUpCall.fulfilled, (state, {payload}) => {
            debug.log("Sign_up", payload)
            state.userLoading = false;
            state.userError = null;
            state.userMessage = ""
            state.userData = null;
        })
        builder.addCase(signUpCall.rejected, (state, action: any) => {
            state.userLoading = false;
            state.userMessage = "";
            state.userData = null;
            state.userError = {
                code: action.payload?.response?.data?.responseCode || "89",
                message:
                    action.payload?.response?.data?.message ||
                    // action.error?.message ||
                    "Unable to sign you up at the moment",
            }

        })
        builder.addCase(signInCall.pending, state => {
            state.userLoading = true;

        })
        builder.addCase(signInCall.fulfilled, (state, {payload}) => {
            // state.userLoading = false;
            state.userError = null;
            state.userMessage = `Welcome ${payload.payload.firstName || payload.payload.username} !!!`
            state.userData = {
                ...state.userData,
                ...payload.payload
            };
        })
        builder.addCase(signInCall.rejected, (state, action: any) => {
            // state.userLoading = false;
            state.userMessage = "";
            state.userData = null;
            state.userError = {
                code: action.payload?.response?.data?.responseCode || "88",
                message:
                    action.payload?.response?.data?.message ||
                    // action.error?.message ||
                    "Unable to sign you in at the moment",
            }
        })
    }
});

export const {actions: userActions, reducer: userReducer} = userSlice;
