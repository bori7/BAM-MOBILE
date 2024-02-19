import {CreateNotificationsPayloadType, CreateNotificationsRequestType} from "../notifications/type";
import {AxiosRequestHeaders} from "axios";
import {GenericResponseType} from "../type";
import {postCall} from "../index";
import {CREATE_NOTIFICATION_URL, REGISTER_FIRE_NOTIFICATION_URL, SEND_FIRE_NOTIFICATION_URL} from "../../constants/url";
import {
    RegisterDeviceTokenPayloadType,
    RegisterDeviceTokenRequestType,
    SendNotificationPayloadType,
    SendNotificationRequestType
} from "./type";

export class FireNotificationService {

    static async registerDeviceToken(
        token: string | undefined,
        request: RegisterDeviceTokenRequestType,
        extraHeaders?: AxiosRequestHeaders | undefined | {}
    ): Promise<GenericResponseType<RegisterDeviceTokenPayloadType>> {
        return await postCall(REGISTER_FIRE_NOTIFICATION_URL, token, extraHeaders, request);
    }

    static async sendNotification(
        token: string | undefined,
        request: SendNotificationRequestType,
        extraHeaders?: AxiosRequestHeaders | undefined | {}
    ): Promise<GenericResponseType<SendNotificationPayloadType>> {
        return await postCall(SEND_FIRE_NOTIFICATION_URL, token, extraHeaders, request);
    }
}