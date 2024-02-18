import {CreatePrayerPayloadType, CreatePrayerRequestType} from "../../prayer/type";
import {AxiosRequestHeaders} from "axios";
import {GenericResponseType} from "../../type";
import {getByWithPathParam, postCall} from "../../index";
import {
    CALLBACK_GET_URL,
    CALLBACK_POST_URL,
    CREATE_PRAYER_URL,
    FETCH_DEVOTIONAL_BY_ID_URL
} from "../../../constants/url";
import {CallbackGetRequestType, CallbackGetResponsePayload, CallbackPostRequestType} from "./type";
import {FetchDevotionalByIdType, FetchDevotionalByParamPayloadType} from "../../devotional/type";

export class CallbackService {

    static async paystackPost(
        token: string | undefined,
        request: CallbackPostRequestType,
        extraHeaders?: AxiosRequestHeaders | undefined | {}
    ): Promise<GenericResponseType<null>> {
        return await postCall(CALLBACK_POST_URL, token, extraHeaders, request);
    }


    static paystackGet = async (
        token: string | undefined,
        request: CallbackGetRequestType
    ): Promise<GenericResponseType<CallbackGetResponsePayload>> => {
        const param = Object.keys(request);
        const paramValue = Object.values(request);
        return await getByWithPathParam(
            CALLBACK_GET_URL,
            token,
            param,
            paramValue
        );
    };

}