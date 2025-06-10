import {AxiosRequestHeaders} from "axios";
import {GenericResponseType} from "../type";
import {getFor, postCall, putCall} from "../index";
import {
    CREATE_PD_URL,
    CREATE_VOD_URL, DELETE_PD_URL,
    DELETE_VOD_URL, FETCH_PD_URL, FETCH_VOD_URL, UPDATE_PD_URL,
    UPDATE_VOD_URL
} from "@constants/url";
import {
    CreatePropheticDeclarationPayloadType,
    CreatePropheticDeclarationRequestType,
    CreateVODPayloadType,
    CreateVODRequestType
} from "./type";

export class VODService {

    static async createVOD(
        token: string | undefined,
        request: CreateVODRequestType,
        extraHeaders?: AxiosRequestHeaders | undefined | {}
    ): Promise<GenericResponseType<CreateVODPayloadType>> {
        return await postCall(CREATE_VOD_URL, token, extraHeaders, request);
    }

    static async fetchAllVOD(
        token: string | undefined,
        extraHeaders?: AxiosRequestHeaders | undefined | {}
    ): Promise<GenericResponseType<CreateVODRequestType[]>> {
        return await getFor(FETCH_VOD_URL, token);
    }

    static updateVOD = async (
        token: string | undefined,
        request: CreateVODRequestType,
        extraHeaders?: AxiosRequestHeaders | undefined | {}
    ): Promise<GenericResponseType<CreateVODPayloadType>> => {
        return await putCall(UPDATE_VOD_URL, token, extraHeaders, request);
    };

    static deleteVOD = async (
        token: string | undefined,
        request: CreateVODRequestType,
        extraHeaders?: AxiosRequestHeaders | undefined | {}
    ): Promise<GenericResponseType<CreateVODPayloadType>> => {
        return await putCall(DELETE_VOD_URL, token, extraHeaders, request);
    };

    // _________-------______------______#######_________-------______------______#######

    static async createPropheticDeclaration(
        token: string | undefined,
        request: CreatePropheticDeclarationRequestType,
        extraHeaders?: AxiosRequestHeaders | undefined | {}
    ): Promise<GenericResponseType<CreatePropheticDeclarationPayloadType>> {
        return await postCall(CREATE_PD_URL, token, extraHeaders, request);
    }

    static async fetchAllPropheticDeclaration(
        token: string | undefined,
        extraHeaders?: AxiosRequestHeaders | undefined | {}
    ): Promise<GenericResponseType<CreatePropheticDeclarationRequestType[]>> {
        return await getFor(FETCH_PD_URL, token);
    }

    static updatePropheticDeclaration = async (
        token: string | undefined,
        request: CreatePropheticDeclarationRequestType,
        extraHeaders?: AxiosRequestHeaders | undefined | {}
    ): Promise<GenericResponseType<CreatePropheticDeclarationPayloadType>> => {
        return await putCall(UPDATE_PD_URL, token, extraHeaders, request);
    };

    static deletePropheticDeclaration = async (
        token: string | undefined,
        request: CreatePropheticDeclarationRequestType,
        extraHeaders?: AxiosRequestHeaders | undefined | {}
    ): Promise<GenericResponseType<CreatePropheticDeclarationPayloadType>> => {
        return await putCall(DELETE_PD_URL, token, extraHeaders, request);
    };
}