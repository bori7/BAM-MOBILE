import {
    CreateDevotionalPayloadType,
    CreateDevotionalRequestType, DevotionalType
    , FetchDevotionalByIdType, FetchDevotionalByParamPayloadType,
    FetchDevotionalPayloadType
} from "./type";
import {AxiosRequestHeaders} from "axios";
import {GenericResponseType} from "../type";
import {getBy, getByWithPathParam, getFor, postCall, putCall} from "../index";
import {
    CREATE_DEVOTIONAL_URL, DELETE_DEVOTIONAL_URL,
    FETCH_ALL_DEVOTIONAL_URL,
    FETCH_DEVOTIONAL_BY_ID_URL,
    FETCH_DEVOTIONAL_BY_TITLE_URL, UPDATE_DEVOTIONAL_URL
} from "../../constants/url";

export class DevotionalService {
    static async createDevotional(
        token: string | undefined,
        request: CreateDevotionalRequestType,
        extraHeaders?: AxiosRequestHeaders | undefined | {}
    ): Promise<GenericResponseType<CreateDevotionalPayloadType>> {
        return await postCall(CREATE_DEVOTIONAL_URL, token, extraHeaders, request);
    }

    static async fetchAllDevotional(
        token: string | undefined,
        extraHeaders?: AxiosRequestHeaders | undefined | {}
    ): Promise<GenericResponseType<FetchDevotionalPayloadType>> {
        return await getFor(FETCH_ALL_DEVOTIONAL_URL, token);
    }

    static fetchDevotionalById = async (
        token: string | undefined,
        request: FetchDevotionalByIdType
    ): Promise<GenericResponseType<FetchDevotionalByParamPayloadType>> => {
        // const param = Object.keys(request);
        const param = ["{id}"];
        const paramValue = Object.values(request);


        let url = FETCH_DEVOTIONAL_BY_ID_URL;
        param.forEach((p, idx) => {
            url = url.replace(p, paramValue[idx])
        })

        return await getByWithPathParam(
            url,
            token,
            param,
            paramValue
        );
    };

    static fetchDevotionalByTitle = async (
        token: string | undefined,
        request: FetchDevotionalByIdType
    ): Promise<GenericResponseType<FetchDevotionalByParamPayloadType>> => {
        const param = Object.keys(request);
        const paramValue = Object.values(request);
        return await getBy(
            FETCH_DEVOTIONAL_BY_TITLE_URL,
            token,
            param,
            paramValue
        );
    };

    static updateDevotional = async (
        token: string | undefined,
        request: DevotionalType,
        extraHeaders?: AxiosRequestHeaders | undefined | {}
    ): Promise<GenericResponseType<CreateDevotionalPayloadType>> => {
        return await putCall(UPDATE_DEVOTIONAL_URL, token, extraHeaders, request);
    };

    static deleteDevotional = async (
        token: string | undefined,
        request: DevotionalType,
        extraHeaders?: AxiosRequestHeaders | undefined | {}
    ): Promise<GenericResponseType<CreateDevotionalPayloadType>> => {
        return await putCall(DELETE_DEVOTIONAL_URL, token, extraHeaders, request);
    };
}