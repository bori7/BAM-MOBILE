import { RoleType } from "../type";

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

export interface GoogleSignUpRequestType {
  deviceId: string;
  idToken: string;
}

export interface GoogleSignInRequestType {
  idToken: string;
}
