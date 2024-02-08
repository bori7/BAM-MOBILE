import {AxiosRequestHeaders} from "axios";
import {GenericResponseType} from "../type";
import {getByWithPathParam, postCall, putCall} from "../index";
import {
    CREATE_PRAYER_URL,
    DELETE_PRAYER_URL,
    FETCH_PRAYER_BY_ID_URL,
    UPDATE_PRAYER_URL,
} from "../../constants/url";
import {CreatePrayerPayloadType, CreatePrayerRequestType, FetchPrayerByIdType} from "./type";

export class PrayerService {

    static async createPrayer(
        token: string | undefined,
        request: CreatePrayerRequestType,
        extraHeaders?: AxiosRequestHeaders | undefined | {}
    ): Promise<GenericResponseType<CreatePrayerPayloadType>> {
        return await postCall(CREATE_PRAYER_URL, token, extraHeaders, request);
    }

    static fetchPrayer = async (
        token: string | undefined,
        request: FetchPrayerByIdType
    ): Promise<GenericResponseType<CreatePrayerRequestType>> => {
        const param = Object.keys(request);
        const paramValue = Object.values(request);
        return await getByWithPathParam(
            FETCH_PRAYER_BY_ID_URL,
            token,
            param,
            paramValue
        );
    };

    static updatePrayer = async (
        token: string | undefined,
        request: CreatePrayerRequestType,
        extraHeaders?: AxiosRequestHeaders | undefined | {}
    ): Promise<GenericResponseType<CreatePrayerPayloadType>> => {
        return await putCall(UPDATE_PRAYER_URL, token, extraHeaders, request);
    };

    static deletePrayer = async (
        token: string | undefined,
        request: CreatePrayerRequestType,
        extraHeaders?: AxiosRequestHeaders | undefined | {}
    ): Promise<GenericResponseType<CreatePrayerPayloadType>> => {
        return await putCall(DELETE_PRAYER_URL, token, extraHeaders, request);
    };
}