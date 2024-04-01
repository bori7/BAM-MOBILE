import {RegisterDeviceTokenPayloadType, RegisterDeviceTokenRequestType} from "../firenotification/type";
import {AxiosRequestHeaders} from "axios";
import {GenericResponseType} from "../type";
import {postCall} from "../index";
import {HTML_MAIL_URL, REGISTER_FIRE_NOTIFICATION_URL, SIMPLE_MAIL_URL} from "../../constants/url";
import {SendEmailPayloadType, SendEmailRequestType} from "./type";

export class EmailService {

    static async sendSimpleMail(
        token: string | undefined,
        request: SendEmailRequestType,
        extraHeaders?: AxiosRequestHeaders | undefined | {}
    ): Promise<GenericResponseType<SendEmailPayloadType>> {
        return await postCall(SIMPLE_MAIL_URL, token, extraHeaders, request);
    }

    static async sendHtmlMail(
        token: string | undefined,
        request: SendEmailRequestType,
        extraHeaders?: AxiosRequestHeaders | undefined | {}
    ): Promise<GenericResponseType<SendEmailPayloadType>> {
        return await postCall(HTML_MAIL_URL, token, extraHeaders, request);
    }
}