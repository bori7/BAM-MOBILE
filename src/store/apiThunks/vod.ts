import {createAsyncThunk} from "@reduxjs/toolkit";
import {GenericResponseType} from "@services/type";
import {
    InitBAMThunkApiConfig, InitCreatePdThunkArg,
    InitCreateVodThunkArg, InitDeletePdThunkArg, InitDeleteVODThunkArg, InitFetchAllPdThunkArg,
    InitFetchAllVodThunkArg, InitUpdatePdThunkArg, InitUpdateVODThunkArg
} from "@shared/types/thunkArgs";
import {getDeviceIpAddress} from "@shared/helper";
import {
    CreatePropheticDeclarationPayloadType,
    CreatePropheticDeclarationRequestType,
    CreateVODPayloadType,
    CreateVODRequestType
} from "@services/vod/type";
import {VODService} from "@services/vod";

export const createVodCall = createAsyncThunk<
    GenericResponseType<CreateVODPayloadType>,
    InitCreateVodThunkArg,
    InitBAMThunkApiConfig
>(
    "vod/create",
    async ({createVodRequest}, {rejectWithValue, getState, dispatch}) => {
        let ipAddress = await getDeviceIpAddress();
        const state = getState();

        const accessToken = state.user.userData?.token || "";
        return await VODService.createVOD(accessToken, createVodRequest)
            .then((res) => {
                debug.api_success("createVod", res);

                return res;
            })
            .catch((err) => {
                debug.api_error("createVod Error", err);
                return rejectWithValue(err);
            });
    }
);


export const fetchAllVodCall = createAsyncThunk<
    GenericResponseType<CreateVODRequestType[]>,
    InitFetchAllVodThunkArg,
    InitBAMThunkApiConfig
>(
    "vod/fetchAll",
    async ({fetchAllVodRequest}, {rejectWithValue, getState, dispatch}) => {
        let ipAddress = await getDeviceIpAddress();
        const state = getState();

        const accessToken = state.user.userData?.token || "";
        return await VODService.fetchAllVOD(accessToken)
            .then((res) => {
                debug.api_success("fetchAllVOD", res);

                return res;
            })
            .catch((err) => {
                debug.api_error("fetchAllVOD Error", err);
                return rejectWithValue(err);
            });
    }
);

export const updateVodCall = createAsyncThunk<
    GenericResponseType<CreateVODPayloadType>,
    InitUpdateVODThunkArg,
    InitBAMThunkApiConfig
>(
    "vod/update",
    async ({updateVodRequest}, {rejectWithValue, getState, dispatch}) => {
        let ipAddress = await getDeviceIpAddress();
        const state = getState();

        const accessToken = state.user.userData?.token || "";
        return await VODService.updateVOD(accessToken, updateVodRequest)
            .then((res) => {
                debug.api_success("updateVOD", res);

                return res;
            })
            .catch((err) => {
                debug.api_error("updateVOD Error", err);
                return rejectWithValue(err);
            });
    }
);

export const deleteVODCall = createAsyncThunk<
    GenericResponseType<CreateVODPayloadType>,
    InitDeleteVODThunkArg,
    InitBAMThunkApiConfig
>(
    "vod/delete",
    async ({deleteVODdRequest}, {rejectWithValue, getState, dispatch}) => {
        let ipAddress = await getDeviceIpAddress();
        const state = getState();
        const accessToken = state.user.userData?.token || "";

        return await VODService.deleteVOD(accessToken, deleteVODdRequest)
            .then((res) => {
                debug.api_success("deleteVOD", res);

                return res;
            })
            .catch((err) => {
                debug.api_error("deleteVOD Error", err);
                return rejectWithValue(err);
            });
    }
);

export const createPdCall = createAsyncThunk<
    GenericResponseType<CreatePropheticDeclarationPayloadType>,
    InitCreatePdThunkArg,
    InitBAMThunkApiConfig
>(
    "prophetic-declaration/create",
    async ({createPdRequest}, {rejectWithValue, getState, dispatch}) => {
        let ipAddress = await getDeviceIpAddress();
        const state = getState();

        const accessToken = state.user.userData?.token || "";
        return await VODService.createPropheticDeclaration(accessToken, createPdRequest)
            .then((res) => {
                debug.api_success("createPd", res);

                return res;
            })
            .catch((err) => {
                debug.api_error("createPd Error", err);
                return rejectWithValue(err);
            });
    }
);


export const fetchAllPdCall = createAsyncThunk<
    GenericResponseType<CreatePropheticDeclarationRequestType[]>,
    InitFetchAllPdThunkArg,
    InitBAMThunkApiConfig
>(
    "prophetic-declaration/fetchAll",
    async ({fetchAllPdRequest}, {rejectWithValue, getState, dispatch}) => {
        let ipAddress = await getDeviceIpAddress();
        const state = getState();

        const accessToken = state.user.userData?.token || "";
        return await VODService.fetchAllPropheticDeclaration(accessToken)
            .then((res) => {
                debug.api_success("fetchAllPd", res);

                return res;
            })
            .catch((err) => {
                debug.api_error("fetchAllPd Error", err);
                return rejectWithValue(err);
            });
    }
);

export const updatePdCall = createAsyncThunk<
    GenericResponseType<CreatePropheticDeclarationPayloadType>,
    InitUpdatePdThunkArg,
    InitBAMThunkApiConfig
>(
    "prophetic-declaration/update",
    async ({updatePdRequest}, {rejectWithValue, getState, dispatch}) => {
        let ipAddress = await getDeviceIpAddress();
        const state = getState();

        const accessToken = state.user.userData?.token || "";
        return await VODService.updatePropheticDeclaration(accessToken, updatePdRequest)
            .then((res) => {
                debug.api_success("updatePd", res);

                return res;
            })
            .catch((err) => {
                debug.api_error("updatePd Error", err);
                return rejectWithValue(err);
            });
    }
);

export const deletePdCall = createAsyncThunk<
    GenericResponseType<CreatePropheticDeclarationPayloadType>,
    InitDeletePdThunkArg,
    InitBAMThunkApiConfig
>(
    "prophetic-declaration/delete",
    async ({deletePdRequest}, {rejectWithValue, getState, dispatch}) => {
        let ipAddress = await getDeviceIpAddress();
        const state = getState();
        const accessToken = state.user.userData?.token || "";

        return await VODService.deletePropheticDeclaration(accessToken, deletePdRequest)
            .then((res) => {
                debug.api_success("deletePd", res);

                return res;
            })
            .catch((err) => {
                debug.api_error("deletePd Error", err);
                return rejectWithValue(err);
            });
    }
);
