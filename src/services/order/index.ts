import {AxiosRequestHeaders} from 'axios';

import {
    ORDER_CREATE_SESSION_URL,
    PLACE_ORDER_URL,
} from '@constants/url';

import {getBy, postCall, putCall} from '@services/index';
import {
    CreateCheckOutSessionPayloadType,
    PlaceOrderPayloadType,
    PlaceOrderRequestType,
} from '@services/order/type';
import {GenericResponseType} from "@services/type";

export class OrderService {
    static async placeOrder(
        token: string | undefined,
        request: PlaceOrderRequestType,
        extraHeaders?: AxiosRequestHeaders | undefined,
    ): Promise<GenericResponseType<PlaceOrderPayloadType>> {
        return await postCall(PLACE_ORDER_URL, token, extraHeaders, request);
    }

 static async createCheckoutSession(
        token: string | undefined,
        request: PlaceOrderRequestType,
        extraHeaders?: AxiosRequestHeaders | undefined,
    ): Promise<GenericResponseType<CreateCheckOutSessionPayloadType>> {
        return await postCall(ORDER_CREATE_SESSION_URL, token, extraHeaders, request);
    }


}
