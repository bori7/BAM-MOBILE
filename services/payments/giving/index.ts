import {AxiosRequestHeaders} from "axios";
import {GenericResponseType} from "../../type";
import {FetchGivingRequestType, VerifyPaystackRequestType} from "../paystack/type";
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
        request: FetchGivingRequestType,
        extraHeaders?: AxiosRequestHeaders | undefined | {}
    ): Promise<GenericResponseType<FetchGivingPayloadType[]>> {
        const url = GIVING_FETCH_ALL_URL.replace("{userId}", request.userId || "")
        return await getFor(url, token);
    }

    static async fetchGiving(
        token: string | undefined,
        request: FetchGivingRequestType,
        extraHeaders?: AxiosRequestHeaders | undefined | {}
    ): Promise<GenericResponseType<FetchGivingPayloadType>> {
        const url = GIVING_FETCH_URL.replace("{giving_ref}", request.reference || "")
        return await getFor(url, token);
    }
}