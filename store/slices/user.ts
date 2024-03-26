import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

import {apiPost} from "../../hooks/apiHooks";
import {secureSave} from "../../shared/helper";
import {InitialUserStateType, UserDataType} from "../../shared/types/slices";
import {
    signInCall,
    signInGoogleCall,
    signUpCall,
    signUpGoogleCall,
    updateUserCall,
    updateUserImageCall
} from "../apiThunks/user";

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
                ...payload.payload,
                email_address: payload.payload.emailAddress,
                first_name:payload.payload.firstName,
                last_name:payload.payload.lastName,
                username:payload.payload.username,
                fullname:payload.payload.fullName,
                phone_number:payload.payload.phoneNumber,
            };
        })
        builder.addCase(signInCall.rejected, (state, action: any) => {
            // state.userLoading = false;
            state.userMessage = "";
            state.userData = null;
            state.userError = {
                code: action.payload?.response?.data?.responseCode || "87",
                message:
                    action.payload?.response?.data?.message ||
                    // action.error?.message ||
                    "Unable to sign you in at the moment",
            }
        })
        builder.addCase(updateUserCall.pending, state => {
            state.userLoading = true;

        })
        builder.addCase(updateUserCall.rejected, (state, action: any) => {
            state.userLoading = false;
            state.userMessage = "";
            state.userData = null;
            state.userError = {
                code: action.payload?.response?.data?.responseCode || "88",
                message:
                    action.payload?.response?.data?.message ||
                    // action.error?.message ||
                    "Unable to update your info at the moment",
            }
        })
        builder.addCase(updateUserCall.fulfilled, (state, {payload}) => {
            state.userLoading = false;
            state.userError = null;
            state.userMessage = `Updated your info successfully  🎉` // "Profile was updated successfully 🎉",
            state.userData = {
                ...state.userData,
                ...payload.payload
            };
        })
        builder.addCase(updateUserImageCall.pending, state => {
            state.userLoading = true;
        })
        builder.addCase(updateUserImageCall.rejected, (state, action: any) => {
            state.userLoading = false;
            state.userMessage = "";
            state.userData = null;
            state.userError = {
                code: action.payload?.response?.data?.responseCode || "88",
                message:
                    action.payload?.response?.data?.message ||
                    // action.error?.message ||
                    "Unable to update your image at the moment",
            }
        })
        builder.addCase(updateUserImageCall.fulfilled, (state, {payload}) => {
            state.userLoading = false;
            state.userError = null;
            state.userMessage = `Updated your image successfully  🎉` // "Profile was updated successfully 🎉",
            state.userData = {
                ...state.userData,
                ...payload.payload
            };
        })
    }
});

export const {actions: userActions, reducer: userReducer} = userSlice;
