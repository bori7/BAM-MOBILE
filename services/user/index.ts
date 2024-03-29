import {AxiosRequestHeaders} from "axios";
import {GenericResponseType} from "../type";
import {postCall, putCall} from "../index";
import {
    GOOGLE_SIGN_IN_URL,
    GOOGLE_SIGN_UP_URL,
    USER_DELETE_URL,
    USER_GENERATE_VERIFICATION_CODE_URL,
    USER_IMAGE_UPDATE_URL,
    USER_PASSWORD_RESET_URL,
    USER_PASSWORD_UPDATE_URL,
    USER_SIGN_IN_URL,
    USER_SIGN_UP_URL,
    USER_UPDATE_URL,
    USER_VERIFY_VERIFICATION_CODE_URL
} from "../../constants/url";
import {
    GenerateVerificationCodePayloadType,
    GenerateVerificationCodeRequestType,
    GoogleSignInRequestType,
    GoogleSignUpRequestType, ResetUserPasswordPayloadType, ResetUserPasswordRequestType,
    SignInPayloadType,
    SignInRequestType,
    SignUpPayloadType,
    SignUpRequestType,
    UpdateUserImagePayloadType,
    UpdateUserImageRequestType,
    UpdateUserPasswordPayloadType,
    UpdateUserPasswordRequestType, VerifyVerificationCodePayloadType, VerifyVerificationCodeRequestType
} from "./type";

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

    static updateUserImage = async (
        token: string | undefined,
        request: UpdateUserImageRequestType,
        extraHeaders?: AxiosRequestHeaders | undefined | {}
    ): Promise<GenericResponseType<UpdateUserImagePayloadType>> => {
        return await putCall(USER_IMAGE_UPDATE_URL, token, extraHeaders, request);
    };

    static updateUserPassword = async (
        token: string | undefined,
        request: UpdateUserPasswordRequestType,
        extraHeaders?: AxiosRequestHeaders | undefined | {}
    ): Promise<GenericResponseType<UpdateUserPasswordPayloadType>> => {
        return await putCall(USER_PASSWORD_UPDATE_URL, token, extraHeaders, request);
    };

    static resetUserPassword = async (
        token: string | undefined,
        request: ResetUserPasswordRequestType,
        extraHeaders?: AxiosRequestHeaders | undefined | {}
    ): Promise<GenericResponseType<ResetUserPasswordPayloadType>> => {
        return await putCall(USER_PASSWORD_RESET_URL, token, extraHeaders, request);
    };

    static async generateVerificationCode(
        token: string | undefined,
        request: GenerateVerificationCodeRequestType,
        extraHeaders?: AxiosRequestHeaders | undefined | {}
    ): Promise<GenericResponseType<GenerateVerificationCodePayloadType>> {
        return await postCall(USER_GENERATE_VERIFICATION_CODE_URL, token, extraHeaders, request);
    }

    static async verificationVerificationCode(
        token: string | undefined,
        request: VerifyVerificationCodeRequestType,
        extraHeaders?: AxiosRequestHeaders | undefined | {}
    ): Promise<GenericResponseType<VerifyVerificationCodePayloadType>> {
        return await postCall(USER_VERIFY_VERIFICATION_CODE_URL, token, extraHeaders, request);
    }
}