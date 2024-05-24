import {AxiosRequestHeaders} from "axios";
import {GenericResponseType} from "../type";
import {getByWithPathParam, postCall, putCall} from "../index";
import {
    CREATE_NOTE_URL,
    DELETE_NOTE_URL,
    FETCH_NOTE_BY_ID_URL, FETCH_NOTE_BY_USER_ID_URL,
    UPDATE_NOTE_URL,

} from "@constants/url";
import {CreateNotePayloadType, CreateNoteRequestType, FetchNoteByIdType, FetchNoteByUserIdType} from "./type";

export class NoteService {

    static async createNote(
        token: string | undefined,
        request: CreateNoteRequestType,
        extraHeaders?: AxiosRequestHeaders | undefined | {}
    ): Promise<GenericResponseType<CreateNotePayloadType>> {
        return await postCall(CREATE_NOTE_URL, token, extraHeaders, request);
    }

    static fetchUserNotes = async (
        token: string | undefined,
        request: FetchNoteByUserIdType
    ): Promise<GenericResponseType<CreateNoteRequestType[]>> => {
        // const param = Object.keys(request);
        const param = ["{userId}"];
        const paramValue = Object.values(request);
        const url = FETCH_NOTE_BY_USER_ID_URL.replace(param[0], paramValue[0])
        return await getByWithPathParam(
            url,
            token,
            param,
            paramValue
        );
    };

    // static fetchAllNote = async (
    //     token: string | undefined,
    //     request: FetchNoteByUserIdType
    // ): Promise<GenericResponseType<CreateNoteRequestType[]>> => {
    //     // const param = Object.keys(request);
    //     const param = ["{userId}"];
    //     const paramValue = Object.values(request);
    //     const url = FETCH_NOTE_BY_USER_ID_URL.replace(param[0], paramValue[0])
    //     return await getByWithPathParam(
    //         url,
    //         token,
    //         param,
    //         paramValue
    //     );
    // };

    static updateNote = async (
        token: string | undefined,
        request: CreateNoteRequestType,
        extraHeaders?: AxiosRequestHeaders | undefined | {}
    ): Promise<GenericResponseType<CreateNotePayloadType>> => {
        return await putCall(UPDATE_NOTE_URL, token, extraHeaders, request);
    };

    static deleteNote = async (
        token: string | undefined,
        request: CreateNoteRequestType,
        extraHeaders?: AxiosRequestHeaders | undefined | {}
    ): Promise<GenericResponseType<CreateNotePayloadType>> => {
        return await putCall(DELETE_NOTE_URL, token, extraHeaders, request);
    };
}