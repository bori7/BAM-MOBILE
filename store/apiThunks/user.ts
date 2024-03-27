import {createAsyncThunk} from "@reduxjs/toolkit";
import {GenericResponseType} from "../../services/type";
import {
    InitBAMThunkApiConfig,
    InitSignInGoogleThunkArg, InitSignInThunkArg,
    InitSignUpGoogleThunkArg, InitSignUpThunkArg, InitUpdateUserImageThunkArg, InitUpdateUserPasswordThunkArg
} from "../../shared/types/thunkArgs";
import {getDeviceIpAddress} from "../../shared/helper";
import {
    SignInPayloadType,
    SignUpPayloadType,
    UpdateUserImagePayloadType,
    UpdateUserPasswordPayloadType
} from "../../services/user/type";
import {UserService} from "../../services/user";
import * as Device from 'expo-device';
import {CipherUtils} from "../../shared/lib/cipher";
import {AES_SECRET_KEY} from "../../constants/props";


export const signUpGoogleCall = createAsyncThunk<
    GenericResponseType<SignUpPayloadType>,
    InitSignUpGoogleThunkArg,
    InitBAMThunkApiConfig
>(
    "google/signup",
    async ({signUpGoogleRequest}, {rejectWithValue, getState, dispatch}) => {
        let ipAddress = await getDeviceIpAddress();
        const state = getState();

        const accessToken = state.user.userData?.token || "";
        return await UserService.signUpGoogle(accessToken, signUpGoogleRequest)
            .then((res) => {
                debug.api_success("signUpGoogle", res);

                return res;
            })
            .catch((err) => {
                debug.api_error("signUpGoogle Error", err);
                return rejectWithValue(err);
            });
    }
);

export const signInGoogleCall = createAsyncThunk<
    GenericResponseType<SignInPayloadType>,
    InitSignInGoogleThunkArg,
    InitBAMThunkApiConfig
>(
    "google/signin",
    async ({signInGoogleRequest}, {rejectWithValue, getState, dispatch}) => {
        let ipAddress = await getDeviceIpAddress();
        const state = getState();

        const accessToken = state.user.userData?.token || "";
        return await UserService.signInGoogle(accessToken, signInGoogleRequest)
            .then((res) => {
                debug.api_success("signInGoogle", res);

                return res;
            })
            .catch((err) => {
                debug.api_error("signInGoogle Error", err);
                return rejectWithValue(err);
            });
    }
);


export const signUpCall = createAsyncThunk<
    GenericResponseType<SignUpPayloadType>,
    InitSignUpThunkArg,
    InitBAMThunkApiConfig
>(
    "user/signup",
    async ({signUpRequest}, {rejectWithValue, getState, dispatch}) => {
        let ipAddress = await getDeviceIpAddress();
        const state = getState();

        signUpRequest = {
            ...signUpRequest,
            // password: await  CipherUtils.encrypt(signUpRequest.password) || "",
            deviceId: `${Device.modelName}_${Device.osVersion}`
        }

        // debug.log("fruitful", CipherUtils.decryptAesGCM_NoPadding(signUpRequest.password))
        const accessToken = "";
        return await UserService.signUp(accessToken, signUpRequest)
            .then((res) => {
                debug.api_success("signUp", res);

                return res;
            })
            .catch((err) => {
                debug.api_error("signUp Error", err);
                return rejectWithValue(err);
            });
    }
);

export const signInCall = createAsyncThunk<
    GenericResponseType<SignInPayloadType>,
    InitSignInThunkArg,
    InitBAMThunkApiConfig
>(
    "user/signin",
    async ({signInRequest}, {rejectWithValue, getState, dispatch}) => {
        let ipAddress = await getDeviceIpAddress();
        const state = getState();

        const accessToken = state.user.userData?.token || "";
        return await UserService.signIn(accessToken, signInRequest)
            .then((res) => {
                debug.api_success("signIn", res);

                return res;
            })
            .catch((err) => {
                debug.api_error("signIn Error", err);
                return rejectWithValue(err);
            });
    }
);

export const deleteUserCall = createAsyncThunk<
    GenericResponseType<SignInPayloadType>,
    InitSignInThunkArg,
    InitBAMThunkApiConfig
>(
    "user/delete",
    async ({signInRequest}, {rejectWithValue, getState, dispatch}) => {
        let ipAddress = await getDeviceIpAddress();
        const state = getState();

        const accessToken = state.user.userData?.token || "";
        return await UserService.deleteUser(accessToken, signInRequest)
            .then((res) => {
                debug.api_success("deleteUser", res);

                return res;
            })
            .catch((err) => {
                debug.api_error("deleteUser Error", err);
                return rejectWithValue(err);
            });
    }
);

export const updateUserCall = createAsyncThunk<
    GenericResponseType<SignInPayloadType>,
    InitSignUpThunkArg,
    InitBAMThunkApiConfig
>(
    "user/update",
    async ({signUpRequest}, {rejectWithValue, getState, dispatch}) => {
        let ipAddress = await getDeviceIpAddress();
        const state = getState();

        signUpRequest = {
            ...signUpRequest,
            // password: await  CipherUtils.encrypt(signUpRequest.password) || "",
            deviceId: `${Device.modelName}_${Device.osVersion}`
        }
        const accessToken = state.user.userData?.token || "";
        return await UserService.updateUser(accessToken, signUpRequest)
            .then((res) => {
                debug.api_success("updateUser", res);

                return res;
            })
            .catch((err) => {
                debug.api_error("updateUser Error", err);
                return rejectWithValue(err);
            });
    }
);


export const updateUserImageCall = createAsyncThunk<
    GenericResponseType<UpdateUserImagePayloadType>,
    InitUpdateUserImageThunkArg,
    InitBAMThunkApiConfig
>(
    "user/updateimage",
    async ({updateUserImageRequest}, {rejectWithValue, getState, dispatch}) => {
        let ipAddress = await getDeviceIpAddress();
        const state = getState();

        updateUserImageRequest = {
            ...updateUserImageRequest,
            userId: state.user.userData?.id || ""
            // password: await  CipherUtils.encrypt(signUpRequest.password) || "",
            // deviceId: `${Device.modelName}_${Device.osVersion}`
        }
        const accessToken = state.user.userData?.token || "";
        return await UserService.updateUserImage(accessToken, updateUserImageRequest)
            .then((res) => {
                debug.api_success("updateUserImage", res);

                return res;
            })
            .catch((err) => {
                debug.api_error("updateUserImage Error", err);
                return rejectWithValue(err);
            });
    }
);

export const updateUserPasswordCall = createAsyncThunk<
    GenericResponseType<UpdateUserPasswordPayloadType>,
    InitUpdateUserPasswordThunkArg,
    InitBAMThunkApiConfig
>(
    "user/updatepassword",
    async ({updateUserPasswordRequest}, {rejectWithValue, getState, dispatch}) => {
        let ipAddress = await getDeviceIpAddress();
        const state = getState();

        updateUserPasswordRequest = {
            ...updateUserPasswordRequest,
            userId: state.user.userData?.id || ""
            // password: await  CipherUtils.encrypt(signUpRequest.password) || "",
            // deviceId: `${Device.modelName}_${Device.osVersion}`
        }
        const accessToken = state.user.userData?.token || "";
        return await UserService.updateUserPassword(accessToken, updateUserPasswordRequest)
            .then((res) => {
                debug.api_success("updateUserPassword", res);

                return res;
            })
            .catch((err) => {
                debug.api_error("updateUserPassword Error", err);
                return rejectWithValue(err);
            });
    }
);