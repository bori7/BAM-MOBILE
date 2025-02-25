import {RoleType} from "../type";

export interface SignUpRequestType {
    password: string;
    bio: string;
    location: string;
    fullName: string;
    lastName: string;
    firstName: string;
    deviceId: string;
    emailAddress: string;
    dateOfBirth: string;
    phoneNumber: string;
    username: string;

    verified?: boolean;
    deleted?: boolean;
}

export interface SignUpPayloadType {
    userId: string;
}

export interface SignInRequestType {
    user: string;
    password: string;
}

export interface SignInPayloadType {
    token: string;

    id: string;
    emailAddress: string;
    firstName: string;
    lastName: string;
    username: string;
    fullName: string;
    bio: string;
    location: string;
    hasSubscribed: boolean;
    phoneNumber: string;

    verified: boolean;
    deleted: boolean;
    image?: string;
    roles: RoleType[];
}

export interface GenerateVerificationCodeRequestType {
    deviceId?: string;
    emailAddress: string;
}

export interface GenerateVerificationCodePayloadType {
    userId: string;
}

export interface VerifyVerificationCodeRequestType {
    deviceId?: string;
    emailAddress?: string;
    code:string;
}

export interface VerifyVerificationCodePayloadType {
    token: string;
}

export interface GoogleSignUpRequestType {
    deviceId: string;
    idToken: string;
}

export interface GoogleSignInRequestType {
    idToken: string;
}

export interface UpdateUserImageRequestType {
    userId?: string;
    imageBase64: string;
}

export interface UpdateUserImagePayloadType {
    userId: string;
    image: string;
}


export interface UpdateUserPasswordRequestType {
    userId?: string;
    newPassword: string;
    oldPassword: string;
}


export interface UpdateUserPasswordPayloadType {
    userId: string;
}

export interface ResetUserPasswordRequestType {
    userId?: string;
    newPassword: string;
}

export interface ResetUserPasswordPayloadType {
    userId: string;
}