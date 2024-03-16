import {AxiosRequestHeaders} from "axios";
import {GenericResponseType} from "../type";
import {getByWithPathParam, getFor, postCall, putCall} from "../index";
import {
    CREATE_USER_DEVOTIONAL_URL, DELETE_USER_DEVOTIONAL_URL,
    FETCH_USER_DEVOTIONAL_BY_ID_URL, UPDATE_USER_DEVOTIONAL_URL
} from "../../constants/url";
import {
    CreateUserDevotionalPayloadType,
    CreateUserDevotionalRequestType,
    FetchUserDevotionalByIdType,
    FetchUserDevotionalPayloadType
} from "./type";

export class UserDevotionalService {
    static async createUserDevotional(
        token: string | undefined,
        request: CreateUserDevotionalRequestType,
        extraHeaders?: AxiosRequestHeaders | undefined | {}
    ): Promise<GenericResponseType<CreateUserDevotionalPayloadType>> {
        return await postCall(CREATE_USER_DEVOTIONAL_URL, token, extraHeaders, request);
    }

    static async fetchUserDevotional(
        token: string | undefined,
        userId: string,
        extraHeaders?: AxiosRequestHeaders | undefined | {}
    ): Promise<GenericResponseType<FetchUserDevotionalPayloadType>> {
        const url = FETCH_USER_DEVOTIONAL_BY_ID_URL.replace("{id}", userId);
        return await getFor(url, token);
    }

    static fetchUserDevotionalById = async (
        token: string | undefined,
        request: FetchUserDevotionalByIdType
    ): Promise<GenericResponseType<FetchUserDevotionalPayloadType>> => {
        const param = Object.keys(request);
        const paramValue = Object.values(request);
        return await getByWithPathParam(
            FETCH_USER_DEVOTIONAL_BY_ID_URL,
            token,
            param,
            paramValue
        );
    };

    static updateUserDevotional = async (
        token: string | undefined,
        request: CreateUserDevotionalRequestType,
        extraHeaders?: AxiosRequestHeaders | undefined | {}
    ): Promise<GenericResponseType<CreateUserDevotionalPayloadType>> => {
        return await putCall(UPDATE_USER_DEVOTIONAL_URL, token, extraHeaders, request);
    };

    static deleteUserDevotional = async (
        token: string | undefined,
        request: CreateUserDevotionalRequestType,
        extraHeaders?: AxiosRequestHeaders | undefined | {}
    ): Promise<GenericResponseType<CreateUserDevotionalPayloadType>> => {
        return await putCall(DELETE_USER_DEVOTIONAL_URL, token, extraHeaders, request);
    };


}
