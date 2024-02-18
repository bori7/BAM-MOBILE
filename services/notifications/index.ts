import {AxiosRequestHeaders} from "axios";
import {GenericResponseType} from "../type";
import {getByWithPathParam, postCall, putCall} from "../index";
import {
    CREATE_NOTIFICATION_URL,
    FETCH_NOTIFICATION_URL,
    UPDATE_NOTIFICATION_URL
} from "../../constants/url";
import {CreateNotificationsPayloadType, CreateNotificationsRequestType, FetchNotificationByIdType} from "./type";


export class NotificationService {

    static async createNotification(
        token: string | undefined,
        request: CreateNotificationsRequestType,
        extraHeaders?: AxiosRequestHeaders | undefined | {}
    ): Promise<GenericResponseType<CreateNotificationsPayloadType>> {
        return await postCall(CREATE_NOTIFICATION_URL, token, extraHeaders, request);
    }

    static fetchNotification = async (
        token: string | undefined,
        request: FetchNotificationByIdType
    ): Promise<GenericResponseType<CreateNotificationsRequestType>> => {
        const param = Object.keys(request);
        const paramValue = Object.values(request);
        return await getByWithPathParam(
            FETCH_NOTIFICATION_URL,
            token,
            param,
            paramValue
        );
    };

    static updateNotification = async (
        token: string | undefined,
        request: CreateNotificationsRequestType,
        extraHeaders?: AxiosRequestHeaders | undefined | {}
    ): Promise<GenericResponseType<CreateNotificationsRequestType>> => {
        return await putCall(UPDATE_NOTIFICATION_URL, token, extraHeaders, request);
    };
}