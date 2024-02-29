import {createAsyncThunk} from "@reduxjs/toolkit";
import {GenericResponseType} from "../../services/type";
import {CreateNotePayloadType, CreateNoteRequestType} from "../../services/note/type";
import {
    InitBAMThunkApiConfig,
    InitCreateNoteThunkArg,
    InitCreateNotificationThunkArg,
    InitFetchNoteByIdThunkArg,
    InitFetchNotificationByIdThunkArg,
    InitUpdateNoteThunkArg,
    InitUpdateNotificationThunkArg
} from "../../shared/types/thunkArgs";
import {getDeviceIpAddress} from "../../shared/helper";
import {CreateNotificationsPayloadType, CreateNotificationsRequestType} from "../../services/notifications/type";
import {NotificationService} from "../../services/notifications";
import {NoteService} from "../../services/note";


export const createNotificationCall = createAsyncThunk<
    GenericResponseType<CreateNotificationsPayloadType>,
    InitCreateNotificationThunkArg,
    InitBAMThunkApiConfig
>(
    "notification/create",
    async ({createNotificationRequest}, {rejectWithValue, getState, dispatch}) => {
        let ipAddress = await getDeviceIpAddress();
        const state = getState();

        const accessToken = state.user.userData?.token || "";
        return await NotificationService.createNotification(accessToken, createNotificationRequest)
            .then((res) => {
                debug.api_success("createNotification", res);

                return res;
            })
            .catch((err) => {
                debug.api_error("createNotificationError", err);
                return rejectWithValue(err);
            });
    }
);


export const fetchNotificationByIdCall = createAsyncThunk<
    GenericResponseType<CreateNotificationsRequestType>,
    InitFetchNotificationByIdThunkArg,
    InitBAMThunkApiConfig
>(
    "notififcation/fetchbyid",
    async (
        {fetchNotififcationByIdRequest},
        {rejectWithValue, getState, dispatch}
    ) => {
        let ipAddress = await getDeviceIpAddress();
        const state = getState();
        const accessToken = state.user.userData?.token || "";

        return await NotificationService.fetchNotification(
            accessToken,
            fetchNotififcationByIdRequest
        )
            .then((res) => {
                debug.api_success("fetchNotificationById", res);

                return res;
            })
            .catch((err) => {
                debug.api_error("fetchNotificationById Error", err);
                return rejectWithValue(err);
            });
    }
);

export const updateNotificationCall = createAsyncThunk<
    GenericResponseType<CreateNotificationsRequestType>,
    InitUpdateNotificationThunkArg,
    InitBAMThunkApiConfig
>(
    "notififcation/update",
    async ({updateNotificationRequest}, {rejectWithValue, getState, dispatch}) => {
        let ipAddress = await getDeviceIpAddress();
        const state = getState();

        const accessToken = state.user.userData?.token || "";
        return await NotificationService.updateNotification(accessToken, updateNotificationRequest)
            .then((res) => {
                debug.api_success("updateNotification", res);

                return res;
            })
            .catch((err) => {
                debug.api_error("updateNotification Error", err);
                return rejectWithValue(err);
            });
    }
);
