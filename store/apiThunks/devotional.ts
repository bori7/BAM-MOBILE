import {createAsyncThunk} from "@reduxjs/toolkit";
import {GenericResponseType} from "../../services/type";
import {CreateNotePayloadType, CreateNoteRequestType} from "../../services/note/type";
import {
    InitBAMThunkApiConfig,
    InitCreateDevotionalThunkArg,
    InitCreateNoteThunkArg,
    InitCreateUserDevotionalThunkArg,
    InitDeleteDevotionalThunkArg,
    InitDeleteNoteThunkArg, InitDeleteUserDevotionalThunkArg,
    InitFetchAllDevotionalThunkArg,
    InitFetchAllNoteThunkArg,
    InitFetchDevotionalByIdThunkArg,
    InitFetchNoteByIdThunkArg, InitFetchUserDevotionalByIdThunkArg, InitFetchUserDevotionalThunkArg,
    InitUpdateDevotionalThunkArg,
    InitUpdateNoteThunkArg, InitUpdateUserDevotionalThunkArg
} from "../../shared/types/thunkArgs";
import {getDeviceIpAddress} from "../../shared/helper";
import {NoteService} from "../../services/note";
import {
    CreateDevotionalPayloadType,
    FetchDevotionalByParamPayloadType,
    FetchDevotionalPayloadType
} from "../../services/devotional/type";
import {DevotionalService} from "../../services/devotional";
import {
    CreateUserDevotionalPayloadType,
    CreateUserDevotionalRequestType,
    FetchUserDevotionalPayloadType
} from "../../services/userdevotional/type";
import {UserDevotionalService} from "../../services/userdevotional";


export const createDevotionalCall = createAsyncThunk<
    GenericResponseType<CreateDevotionalPayloadType>,
    InitCreateDevotionalThunkArg,
    InitBAMThunkApiConfig
>(
    "devotional/create",
    async ({createDevotionalRequest}, {rejectWithValue, getState, dispatch}) => {
        let ipAddress = await getDeviceIpAddress();
        const state = getState();

        const accessToken = state.user.userData?.token || "";
        return await DevotionalService.createDevotional(accessToken, createDevotionalRequest)
            .then((res) => {
                debug.api_success("createDevotional", res);

                return res;
            })
            .catch((err) => {
                debug.api_error("createDevotional Error", err);
                return rejectWithValue(err);
            });
    }
);

export const createUserDevotionalCall = createAsyncThunk<
    GenericResponseType<CreateUserDevotionalPayloadType>,
    InitCreateUserDevotionalThunkArg,
    InitBAMThunkApiConfig
>(
    "userdevotional/create",
    async ({createUserDevotionalRequest}, {rejectWithValue, getState, dispatch}) => {
        let ipAddress = await getDeviceIpAddress();
        const state = getState();

        const accessToken = state.user.userData?.token || "";
        return await UserDevotionalService.createUserDevotional(accessToken, createUserDevotionalRequest)
            .then((res) => {
                debug.api_success("createUserDevotional", res);

                return res;
            })
            .catch((err) => {
                debug.api_error("createUserDevotional Error", err);
                return rejectWithValue(err);
            });
    }
);

export const fetchAllDevotionalCall = createAsyncThunk<
    GenericResponseType<FetchDevotionalPayloadType>,
    InitFetchAllDevotionalThunkArg,
    InitBAMThunkApiConfig
>(
    "devotional/fetchAll",
    async ({fetchAllDevotionalRequest}, {rejectWithValue, getState, dispatch}) => {
        let ipAddress = await getDeviceIpAddress();
        const state = getState();

        const accessToken = state.user.userData?.token || "";
        return await DevotionalService.fetchAllDevotional(accessToken)
            .then((res) => {
                debug.api_success("fetchAllDevotional", res);

                return res;
            })
            .catch((err) => {
                debug.api_error("fetchAllDevotional Error", err);
                return rejectWithValue(err);
            });
    }
);

export const fetchUserDevotionalCall = createAsyncThunk<
    GenericResponseType<FetchUserDevotionalPayloadType>,
    InitFetchUserDevotionalThunkArg,
    InitBAMThunkApiConfig
>(
    "userdevotional/fetch",
    async ({fetchUserDevotionalRequest}, {rejectWithValue, getState, dispatch}) => {
        let ipAddress = await getDeviceIpAddress();
        const state = getState();

        const accessToken = state.user.userData?.token || "";
        return await UserDevotionalService.fetchUserDevotional(accessToken, state.user.userData?.id || "")
            .then((res) => {
                debug.api_success("fetchAllDevotional", res);

                return res;
            })
            .catch((err) => {
                debug.api_error("fetchAllDevotional Error", err);
                return rejectWithValue(err);
            });
    }
);


export const fetchDevotionalByIdCall = createAsyncThunk<
    GenericResponseType<FetchDevotionalByParamPayloadType>,
    InitFetchDevotionalByIdThunkArg,
    InitBAMThunkApiConfig
>(
    "devotional/fetchbyid",
    async (
        {fetchDevotionalByIdRequest},
        {rejectWithValue, getState, dispatch}
    ) => {
        let ipAddress = await getDeviceIpAddress();
        const state = getState();
        const accessToken = state.user.userData?.token || "";

        return await DevotionalService.fetchDevotionalById(
            accessToken,
            fetchDevotionalByIdRequest
        )
            .then((res) => {
                debug.api_success("fetchDevotionalById", res);

                return res;
            })
            .catch((err) => {
                debug.api_error("fetchDevotionalById Error", err);
                return rejectWithValue(err);
            });
    }
);

export const fetchUserDevotionalByIdCall = createAsyncThunk<
    GenericResponseType<FetchUserDevotionalPayloadType>,
    InitFetchUserDevotionalByIdThunkArg,
    InitBAMThunkApiConfig
>(
    "userdevotional/fetchbyid",
    async (
        {fetchUserDevotionalByIdRequest},
        {rejectWithValue, getState, dispatch}
    ) => {
        let ipAddress = await getDeviceIpAddress();
        const state = getState();
        const accessToken = state.user.userData?.token || "";

        return await UserDevotionalService.fetchUserDevotionalById(
            accessToken,
            fetchUserDevotionalByIdRequest
        )
            .then((res) => {
                debug.api_success("fetchUserDevotionalById", res);

                return res;
            })
            .catch((err) => {
                debug.api_error("fetchUserDevotionalById Error", err);
                return rejectWithValue(err);
            });
    }
);


export const fetchDevotionalByTitleCall = createAsyncThunk<
    GenericResponseType<FetchDevotionalByParamPayloadType>,
    InitFetchDevotionalByIdThunkArg,
    InitBAMThunkApiConfig
>(
    "devotional/fetchbytitle",
    async (
        {fetchDevotionalByIdRequest},
        {rejectWithValue, getState, dispatch}
    ) => {
        let ipAddress = await getDeviceIpAddress();
        const state = getState();
        const accessToken = state.user.userData?.token || "";

        return await DevotionalService.fetchDevotionalByTitle(
            accessToken,
            fetchDevotionalByIdRequest
        )
            .then((res) => {
                debug.api_success("fetchDevotionalByTitle", res);

                return res;
            })
            .catch((err) => {
                debug.api_error("fetchDevotionalByTitle Error", err);
                return rejectWithValue(err);
            });
    }
);

export const updateDevotionalCall = createAsyncThunk<
    GenericResponseType<CreateDevotionalPayloadType>,
    InitUpdateDevotionalThunkArg,
    InitBAMThunkApiConfig
>(
    "devotional/update",
    async ({updateDevotionalRequest}, {rejectWithValue, getState, dispatch}) => {
        let ipAddress = await getDeviceIpAddress();
        const state = getState();

        const accessToken = state.user.userData?.token || "";
        return await DevotionalService.updateDevotional(accessToken, updateDevotionalRequest)
            .then((res) => {
                debug.api_success("updateDevotional", res);

                return res;
            })
            .catch((err) => {
                debug.api_error("updateDevotional Error", err);
                return rejectWithValue(err);
            });
    }
);

export const updateUserDevotionalCall = createAsyncThunk<
    GenericResponseType<CreateUserDevotionalPayloadType>,
    InitUpdateUserDevotionalThunkArg,
    InitBAMThunkApiConfig
>(
    "devotional/update",
    async ({updateUserDevotionalRequest}, {rejectWithValue, getState, dispatch}) => {
        let ipAddress = await getDeviceIpAddress();
        const state = getState();

        const accessToken = state.user.userData?.token || "";
        return await UserDevotionalService.updateUserDevotional(accessToken, updateUserDevotionalRequest)
            .then((res) => {
                debug.api_success("updateDevotional", res);

                return res;
            })
            .catch((err) => {
                debug.api_error("updateDevotional Error", err);
                return rejectWithValue(err);
            });
    }
);

export const deleteDevotionaleCall = createAsyncThunk<
    GenericResponseType<CreateDevotionalPayloadType>,
    InitDeleteDevotionalThunkArg,
    InitBAMThunkApiConfig
>(
    "devotional/delete",
    async ({deleteDevotionalByIdRequest}, {rejectWithValue, getState, dispatch}) => {
        let ipAddress = await getDeviceIpAddress();
        const state = getState();
        const accessToken = state.user.userData?.token || "";

        return await DevotionalService.deleteDevotional(accessToken, deleteDevotionalByIdRequest)
            .then((res) => {
                debug.api_success("deleteDevotional", res);

                return res;
            })
            .catch((err) => {
                debug.api_error("deleteDevotional Error", err);
                return rejectWithValue(err);
            });
    }
);


export const deleteUserDevotionaleCall = createAsyncThunk<
    GenericResponseType<CreateUserDevotionalPayloadType>,
    InitDeleteUserDevotionalThunkArg,
    InitBAMThunkApiConfig
>(
    "userdevotional/delete",
    async ({deleteUserDevotionalByIdRequest}, {rejectWithValue, getState, dispatch}) => {
        let ipAddress = await getDeviceIpAddress();
        const state = getState();
        const accessToken = state.user.userData?.token || "";

        return await UserDevotionalService.deleteUserDevotional(accessToken, deleteUserDevotionalByIdRequest)
            .then((res) => {
                debug.api_success("deleteUserDevotional", res);

                return res;
            })
            .catch((err) => {
                debug.api_error("deleteUserDevotional Error", err);
                return rejectWithValue(err);
            });
    }
);

