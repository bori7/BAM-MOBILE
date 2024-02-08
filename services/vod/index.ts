import {CreateNotePayloadType, CreateNoteRequestType, FetchNoteByIdType} from "../note/type";
import {AxiosRequestHeaders} from "axios";
import {GenericResponseType} from "../type";
import {getByWithPathParam, getFor, postCall, putCall} from "../index";
import {
    CREATE_NOTE_URL,
    CREATE_VOD_URL,
    DELETE_NOTE_URL, DELETE_VOD_URL, FETCH_ALL_DEVOTIONAL_URL,
    FETCH_NOTE_BY_ID_URL, FETCH_VOD_URL,
    UPDATE_NOTE_URL, UPDATE_VOD_URL
} from "../../constants/url";
import {CreateVODPayloadType, CreateVODRequestType} from "./type";
import {FetchDevotionalPayloadType} from "../devotional/type";

export class VODService {

    static async createVOD(
        token: string | undefined,
        request: CreateVODRequestType,
        extraHeaders?: AxiosRequestHeaders | undefined | {}
    ): Promise<GenericResponseType<CreateVODPayloadType>> {
        return await postCall(CREATE_VOD_URL, token, extraHeaders, request);
    }


    static async fetchAllVOD(
        token: string | undefined,
        extraHeaders?: AxiosRequestHeaders | undefined | {}
    ): Promise<GenericResponseType<CreateVODRequestType[]>> {
        return await getFor(FETCH_VOD_URL, token);
    }

    static updateVOD = async (
        token: string | undefined,
        request: CreateVODRequestType,
        extraHeaders?: AxiosRequestHeaders | undefined | {}
    ): Promise<GenericResponseType<CreateVODPayloadType>> => {
        return await putCall(UPDATE_VOD_URL, token, extraHeaders, request);
    };

    static deleteVOD = async (
        token: string | undefined,
        request: CreateVODRequestType,
        extraHeaders?: AxiosRequestHeaders | undefined | {}
    ): Promise<GenericResponseType<CreateVODPayloadType>> => {
        return await putCall(DELETE_VOD_URL, token, extraHeaders, request);
    };
}