import {AxiosRequestHeaders} from "axios";
import {GenericResponseType} from "../../type";
import {getFor, postCall} from "../../index";
import {
    PAYSTACK_INITIATE_URL, PAYSTACK_VERIFY_URL
} from "../../../constants/url";
import {InitiatePaystackPayloadType, InitiatePaystackRequestType, VerifyPaystackRequestType} from "./type";
import {FetchDevotionalPayloadType} from "../../devotional/type";

export class PaystackService {

    static async initiatePayment(
        token: string | undefined,
        request: InitiatePaystackRequestType,
        extraHeaders?: AxiosRequestHeaders | undefined | {}
    ): Promise<GenericResponseType<InitiatePaystackPayloadType>> {
        return await postCall(PAYSTACK_INITIATE_URL, token, extraHeaders, request);
    }



    static async verifyPayment(
        token: string | undefined,
        extraHeaders?: AxiosRequestHeaders | undefined | {}
    ): Promise<GenericResponseType<VerifyPaystackRequestType>> {
        return await getFor(PAYSTACK_VERIFY_URL, token);
    }
}