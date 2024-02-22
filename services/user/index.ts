import {RegisterDeviceTokenPayloadType, RegisterDeviceTokenRequestType} from "../firenotification/type";
import {AxiosRequestHeaders} from "axios";
import {GenericResponseType} from "../type";
import {postCall, putCall} from "../index";
import {
    GOOGLE_SIGN_IN_URL,
    GOOGLE_SIGN_UP_URL,
    REGISTER_FIRE_NOTIFICATION_URL,
    UPDATE_NOTE_URL, USER_DELETE_URL,
    USER_SIGN_IN_URL,
    USER_SIGN_UP_URL, USER_UPDATE_URL
} from "../../constants/url";
import {
    GoogleSignInRequestType,
    GoogleSignUpRequestType,
    SignInPayloadType,
    SignInRequestType,
    SignUpPayloadType,
    SignUpRequestType
} from "./type";
import {CreateNotePayloadType, CreateNoteRequestType} from "../note/type";

export class UserService {

    static async signUpGoogle(
        token: string | undefined,
        request: GoogleSignUpRequestType,
        extraHeaders?: AxiosRequestHeaders | undefined | {}
    ): Promise<GenericResponseType<SignUpPayloadType>> {
        return await postCall(GOOGLE_SIGN_UP_URL, token, extraHeaders, request);
    }

    static async signInGoogle(
        token: string | undefined,
        request: GoogleSignInRequestType,
        extraHeaders?: AxiosRequestHeaders | undefined | {}
    ): Promise<GenericResponseType<SignInPayloadType>> {
        return await postCall(GOOGLE_SIGN_IN_URL, token, extraHeaders, request);
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

    static deleteUser = async (
        token: string | undefined,
        request: SignInRequestType,
        extraHeaders?: AxiosRequestHeaders | undefined | {}
    ): Promise<GenericResponseType<SignInPayloadType>> => {
        return await putCall(USER_DELETE_URL, token, extraHeaders, request);
    };

    static updateUser = async (
        token: string | undefined,
        request: SignUpRequestType,
        extraHeaders?: AxiosRequestHeaders | undefined | {}
    ): Promise<GenericResponseType<SignInPayloadType>> => {
        return await putCall(USER_UPDATE_URL, token, extraHeaders, request);
    };
}