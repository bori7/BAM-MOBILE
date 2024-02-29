import {createAsyncThunk} from "@reduxjs/toolkit";

import {
    InitBAMThunkApiConfig,
    InitCreateNoteThunkArg, InitDeleteNoteThunkArg,
    InitFetchAllNoteThunkArg, InitFetchNoteByIdThunkArg,
    InitUpdateNoteThunkArg
} from "../../shared/types/thunkArgs";
import {CreateNotePayloadType, CreateNoteRequestType} from "../../services/note/type";
import {GenericResponseType} from "../../services/type";
import {getDeviceIpAddress} from "../../shared/helper";
import {NoteService} from "../../services/note";


export const createNoteCall = createAsyncThunk<
    GenericResponseType<CreateNotePayloadType>,
    InitCreateNoteThunkArg,
    InitBAMThunkApiConfig
>(
    "note/create",
    async ({createNoteRequest}, {rejectWithValue, getState, dispatch}) => {
        let ipAddress = await getDeviceIpAddress();
        const state = getState();

        const accessToken = state.user.userData?.token || "";
        return await NoteService.createNote(accessToken, createNoteRequest)
            .then((res) => {
                debug.api_success("createNote", res);

                return res;
            })
            .catch((err) => {
                debug.api_error("createNoteError", err);
                return rejectWithValue(err);
            });
    }
);

export const updateNoteCall = createAsyncThunk<
    GenericResponseType<CreateNotePayloadType>,
    InitUpdateNoteThunkArg,
    InitBAMThunkApiConfig
>(
    "note/update",
    async ({updateNoteRequest}, {rejectWithValue, getState, dispatch}) => {
        let ipAddress = await getDeviceIpAddress();
        const state = getState();

        const accessToken = state.user.userData?.token || "";
        return await NoteService.updateNote(accessToken, updateNoteRequest)
            .then((res) => {
                debug.api_success("updateNote", res);

                return res;
            })
            .catch((err) => {
                debug.api_error("updateNoteError", err);
                return rejectWithValue(err);
            });
    }
);

export const fetchAllNotesCall = createAsyncThunk<
    GenericResponseType<CreateNoteRequestType>,
    InitFetchAllNoteThunkArg,
    InitBAMThunkApiConfig
>(
    "note/fetchAll",
    async ({fetchAllNoteRequest}, {rejectWithValue, getState, dispatch}) => {
        let ipAddress = await getDeviceIpAddress();
        const state = getState();

        const accessToken = state.user.userData?.token || "";
        return await NoteService.fetchNote(accessToken, fetchAllNoteRequest)
            .then((res) => {
                debug.api_success("fetchAllNote", res);

                return res;
            })
            .catch((err) => {
                debug.api_error("fetchAllNoteError", err);
                return rejectWithValue(err);
            });
    }
);

export const fetchNoteByUserIdCall = createAsyncThunk<
    GenericResponseType<CreateNoteRequestType>,
    InitFetchNoteByIdThunkArg,
    InitBAMThunkApiConfig
>(
    "note/fetchnotebyid",
    async (
        {fetchNoteByIdRequest},
        {rejectWithValue, getState, dispatch}
    ) => {
        let ipAddress = await getDeviceIpAddress();
        const state = getState();
        const accessToken = state.user.userData?.token || "";

        return await NoteService.fetchNote(
            accessToken,
            fetchNoteByIdRequest
        )
            .then((res) => {
                debug.api_success("fetchNoteByUserId", res);

                return res;
            })
            .catch((err) => {
                debug.api_error("fetchNoteByUserId Error", err);
                return rejectWithValue(err);
            });
    }
);

export const deleteNoteCall = createAsyncThunk<
    GenericResponseType<CreateNotePayloadType>,
    InitDeleteNoteThunkArg,
    InitBAMThunkApiConfig
>(
    "note/deleteNote",
    async ({deleteNoteByIdRequest}, {rejectWithValue, getState, dispatch}) => {
        let ipAddress = await getDeviceIpAddress();
        const state = getState();
        const accessToken = state.user.userData?.token || "";

        return await NoteService.deleteNote(accessToken, deleteNoteByIdRequest)
            .then((res) => {
                debug.api_success("deleteNote", res);

                return res;
            })
            .catch((err) => {
                debug.api_error("deleteNote Error", err);
                return rejectWithValue(err);
            });
    }
);
