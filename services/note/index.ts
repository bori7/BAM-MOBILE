import {AxiosRequestHeaders} from "axios";
import {GenericResponseType} from "../type";
import {getByWithPathParam, postCall, putCall} from "../index";
import {
    CREATE_NOTE_URL,
    DELETE_NOTE_URL,
    FETCH_NOTE_BY_ID_URL,
    UPDATE_NOTE_URL,

} from "../../constants/url";
import {CreateNotePayloadType, CreateNoteRequestType, FetchNoteByIdType} from "./type";

export class NoteService {

    static async createNote(
        token: string | undefined,
        request: CreateNoteRequestType,
        extraHeaders?: AxiosRequestHeaders | undefined | {}
    ): Promise<GenericResponseType<CreateNotePayloadType>> {
        return await postCall(CREATE_NOTE_URL, token, extraHeaders, request);
    }

    static fetchNote = async (
        token: string | undefined,
        request: FetchNoteByIdType
    ): Promise<GenericResponseType<CreateNoteRequestType>> => {
        const param = Object.keys(request);
        const paramValue = Object.values(request);
        return await getByWithPathParam(
            FETCH_NOTE_BY_ID_URL,
            token,
            param,
            paramValue
        );
    };

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