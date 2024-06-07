import {AddRolesToUserRequestType} from "./type";
import {AxiosRequestHeaders} from "axios";
import {GenericResponseType} from "../type";
import {SignInPayloadType} from "../user/type";
import {postCall} from "../index";
import {ADMIN_ADD_ROLES_URL} from "@constants/url";


export class AdminService {
    static async addRoles(
        token: string | undefined,
        request: AddRolesToUserRequestType,
        extraHeaders?: AxiosRequestHeaders | undefined | {}
    ): Promise<GenericResponseType<SignInPayloadType>> {
        return await postCall(ADMIN_ADD_ROLES_URL, token, extraHeaders, request);
    }
}