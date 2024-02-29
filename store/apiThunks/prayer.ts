import {createAsyncThunk} from "@reduxjs/toolkit";
import {GenericResponseType} from "../../services/type";
import {
    InitBAMThunkApiConfig,
    InitCreatePrayerThunkArg, InitDeleteNoteThunkArg, InitDeletePrayerThunkArg,
    InitFetchNoteByIdThunkArg,
    InitFetchPrayerByIdThunkArg, InitUpdateNoteThunkArg, InitUpdatePrayerThunkArg
} from "../../shared/types/thunkArgs";
import {getDeviceIpAddress} from "../../shared/helper";
import {CreatePrayerPayloadType, CreatePrayerRequestType} from "../../services/prayer/type";
import {PrayerService} from "../../services/prayer";
import {CreateNotePayloadType, CreateNoteRequestType} from "../../services/note/type";
import {NoteService} from "../../services/note";


export const createPrayerCall = createAsyncThunk<
    GenericResponseType<CreatePrayerPayloadType>,
    InitCreatePrayerThunkArg,
    InitBAMThunkApiConfig
>(
    "prayer/create",
    async ({createPrayerRequest}, {rejectWithValue, getState, dispatch}) => {
        let ipAddress = await getDeviceIpAddress();
        const state = getState();

        const accessToken = state.user.userData?.token || "";
        return await PrayerService.createPrayer(accessToken, createPrayerRequest)
            .then((res) => {
                debug.api_success("createPrayer", res);

                return res;
            })
            .catch((err) => {
                debug.api_error("createPrayer Error", err);
                return rejectWithValue(err);
            });
    }
);

export const fetchPrayerByIdCall = createAsyncThunk<
    GenericResponseType<CreatePrayerRequestType>,
    InitFetchPrayerByIdThunkArg,
    InitBAMThunkApiConfig
>(
    "prayer/fetchbyid",
    async (
        {fetchPrayerByIdRequest},
        {rejectWithValue, getState, dispatch}
    ) => {
        let ipAddress = await getDeviceIpAddress();
        const state = getState();
        const accessToken = state.user.userData?.token || "";

        return await PrayerService.fetchPrayer(
            accessToken,
            fetchPrayerByIdRequest
        )
            .then((res) => {
                debug.api_success("fetchPrayerById", res);

                return res;
            })
            .catch((err) => {
                debug.api_error("fetchPrayerById Error", err);
                return rejectWithValue(err);
            });
    }
);


export const updatePrayerCall = createAsyncThunk<
    GenericResponseType<CreatePrayerPayloadType>,
    InitUpdatePrayerThunkArg,
    InitBAMThunkApiConfig
>(
    "prayer/update",
    async ({updatePrayerRequest}, {rejectWithValue, getState, dispatch}) => {
        let ipAddress = await getDeviceIpAddress();
        const state = getState();

        const accessToken = state.user.userData?.token || "";
        return await PrayerService.updatePrayer(accessToken, updatePrayerRequest)
            .then((res) => {
                debug.api_success("updatePrayer", res);

                return res;
            })
            .catch((err) => {
                debug.api_error("updatePrayer Error", err);
                return rejectWithValue(err);
            });
    }
);

export const deletePrayerCall = createAsyncThunk<
    GenericResponseType<CreatePrayerPayloadType>,
    InitDeletePrayerThunkArg,
    InitBAMThunkApiConfig
>(
    "prayer/delete",
    async ({deletePrayerByIdRequest}, {rejectWithValue, getState, dispatch}) => {
        let ipAddress = await getDeviceIpAddress();
        const state = getState();
        const accessToken = state.user.userData?.token || "";

        return await PrayerService.deletePrayer(accessToken, deletePrayerByIdRequest)
            .then((res) => {
                debug.api_success("deletePrayer", res);

                return res;
            })
            .catch((err) => {
                debug.api_error("deletePrayer Error", err);
                return rejectWithValue(err);
            });
    }
);
