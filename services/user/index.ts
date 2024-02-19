import {RegisterDeviceTokenPayloadType, RegisterDeviceTokenRequestType} from "../firenotification/type";
import {AxiosRequestHeaders} from "axios";
import {GenericResponseType} from "../type";
import {postCall} from "../index";
import {REGISTER_FIRE_NOTIFICATION_URL, USER_SIGN_IN_URL, USER_SIGN_UP_URL} from "../../constants/url";
import {
    GoogleSignInRequestType,
    GoogleSignUpRequestType,
    SignInPayloadType,
    SignInRequestType,
    SignUpPayloadType,
    SignUpRequestType
} from "./type";

export class UserService {

    static async signUpGoogle(
        token: string | undefined,
        request: GoogleSignUpRequestType,
        extraHeaders?: AxiosRequestHeaders | undefined | {}
    ): Promise<GenericResponseType<SignUpPayloadType>> {
        return await postCall(USER_SIGN_UP_URL, token, extraHeaders, request);
    }

    static async signInGoogle(
        token: string | undefined,
        request: GoogleSignInRequestType,
        extraHeaders?: AxiosRequestHeaders | undefined | {}
    ): Promise<GenericResponseType<SignInPayloadType>> {
        return await postCall(USER_SIGN_IN_URL, token, extraHeaders, request);
    }

    static async signUp(
        token: string | undefined,
        request: SignUpRequestType,
        extraHeaders?: AxiosRequestHeaders | undefined | {}
    ): Promise<GenericResponseType<SignUpPayloadType>> {
        return await postCall(USER_SIGN_UP_URL, token, extraHeaders, request);
    }

    static async signIn(
        token: string | undefined,
        request: SignInRequestType,
        extraHeaders?: AxiosRequestHeaders | undefined | {}
    ): Promise<GenericResponseType<SignInPayloadType>> {
        return await postCall(USER_SIGN_IN_URL, token, extraHeaders, request);
    }
}