import {AxiosRequestHeaders} from "axios";
import {GenericResponseType} from "../../type";
import {VerifyPaystackRequestType} from "../paystack/type";
import {getByWithPathParam, getFor} from "../../index";
import {
    FETCH_NOTE_BY_ID_URL,
    GIVING_FETCH_ALL_URL,
    GIVING_FETCH_URL,
    PAYSTACK_VERIFY_URL
} from "../../../constants/url";
import {CreateNoteRequestType, FetchNoteByIdType} from "../../note/type";
import {FetchGivingPayloadType} from "./type";

export class GivingService {

    static async fetchAllGiving(
        token: string | undefined,
        extraHeaders?: AxiosRequestHeaders | undefined | {}
    ): Promise<GenericResponseType<FetchGivingPayloadType[]>> {
        return await getFor(GIVING_FETCH_ALL_URL, token);
    }

    static async fetchGiving(
        token: string | undefined,
        extraHeaders?: AxiosRequestHeaders | undefined | {}
    ): Promise<GenericResponseType<FetchGivingPayloadType>> {
        return await getFor(GIVING_FETCH_URL, token);
    }
}