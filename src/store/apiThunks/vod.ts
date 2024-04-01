import {createAsyncThunk} from "@reduxjs/toolkit";
import {GenericResponseType} from "../../services/type";
import {
    InitBAMThunkApiConfig,
    InitCreateVodThunkArg, InitDeleteVODThunkArg,
    InitFetchAllVodThunkArg, InitUpdateVODThunkArg
} from "../../shared/types/thunkArgs";
import {getDeviceIpAddress} from "../../shared/helper";
import {CreateVODPayloadType, CreateVODRequestType} from "../../services/vod/type";
import {VODService} from "../../services/vod";

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
